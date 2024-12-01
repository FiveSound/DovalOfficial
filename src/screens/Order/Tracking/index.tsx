import { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import { IsLoading, LoadingScreen, OrderProgress } from "../../../components/custom";
import { SafeAreaView, useNavigation, View } from "../../../components/native";
import { useDashboard } from "../../../context/DashboardContext";
import { useTheme } from "../../../hooks";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrderIDService } from "../../../services/orders";
// import MapOrdenStatus from "./MapOrdenStatus";
import { Footer } from "./components";
import ThreeIcons from "../../../components/custom/Bar/ThreeIcons";
import { closeModalPin, openModalPin } from "../../../redux/slides/modalSlice";
import i18next from "i18next";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { RootState } from "../../../redux/store";
import { reloadApp } from "../../../redux/slides/appSlice";
import { SOCKET_RIDER_SHARE_COORDS } from "@/src/constants/sockets";
import Map from "./Map";

interface Props {
  route: {
    params: { orderID: number };
  };
}

type OrderStatus = "PENDING" | "IN_PROGRESS" | "DELIVERED" | "COMPLETED" | "CANCELED";

type TypeLiveOrder = {
  latitude: number;
  longitude: number;
  businessLatitude: string;
  businessLongitude: string;
  riderID: string;
  status: OrderStatus;
  estimated_time: string;
  locationDetails: string;
  tag: string;
};

type TypeRiderLocation = {
  orderID: number | null;
  riderID: string | null;
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
};

const queryKey = "screen-order-id-tracking";

const Tracking = ({ route }: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { orderID } = useAppSelector((state: RootState) => state.navigation);
  const { socket } = useDashboard();
  const { BackgroundMain } = useTheme();
  const [sucess, setSucess] = useState(false);
  const [riderLocation, setRiderLocation] = useState<TypeRiderLocation | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [queryKey, orderID],
    queryFn: getOrderIDService,
  });

  const openModal = () => {
    if (data && !isLoading) {
      dispatch(openModalPin({ data }));
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      openModal();
      setSucess(true);
    }
  }, [data]);

  const handlePress = () => {
    dispatch(closeModalPin());
    dispatch(reloadApp());
  };

  useEffect(() => {
    if (socket) {
      const orderEvent = `event-realtime-order-${orderID}`;
      const routeEvent = SOCKET_RIDER_SHARE_COORDS;

      socket.on(orderEvent, (newState: Partial<TypeLiveOrder>) => {
        queryClient.setQueryData([queryKey, orderID], (old: TypeLiveOrder | undefined) => {
          return old ? { ...old, ...newState } : undefined;
        });
      });

      socket.on(routeEvent, (route) => {
        console.log(`${routeEvent} received:`, route);
        setRiderLocation(route);
      });

      return () => {
        console.log(`Cleaning up socket events for order ${orderID}`);
        socket.off(orderEvent);
        socket.off(routeEvent);
      };
    }
  }, [socket, orderID, queryClient]);

  useEffect(() => {
    socket?.on("connect", () => {
      refetch();
    });
  }, [socket, refetch]);

  useEffect(() => {
    if (data?.status === "COMPLETED" && data?.verified) {
      dispatch(closeModalPin());
      navigation.reset({
        index: 0,
        routes: [{ name: "Complete" }],
      });
    }

    if (data?.status === "CANCELED") {
      dispatch(closeModalPin());
      navigation.reset({
        index: 0,
        routes: [{ name: "Cancel" }],
      });
    }
  }, [data, navigation, dispatch]);

  if (isLoading || isFetching) return <LoadingScreen label={i18next.t("Loading")} />;

  if (data) {
    const {
      latitude,
      longitude,
      businessLatitude,
      businessLongitude,
      steps,
      currentStep,
      rider_waiting,
      status,
      creation_time,
      estimated_time,
    } = data;

    if (latitude && longitude && businessLatitude && businessLongitude && isAuthenticated) {
      return (
        <SafeAreaView
          style={[
            styles.container,
            {
              backgroundColor: BackgroundMain,
            },
          ]}
        >
          <ThreeIcons showBack={false} label={i18next.t("Tracking order")} onPress={handlePress} />
          <OrderProgress
            steps={steps}
            currentStep={currentStep}
            showHero={true}
            creation_time={creation_time}
            estimated_time={estimated_time}
            messageOptional={rider_waiting && i18next.t("🏍️ Rider is waiting for the order in the restaurant")}
            rider_waiting={rider_waiting && status !== "DELIVERED"}
            status={status}
          />
          {!sucess ? <IsLoading label={i18next.t("Loading...")} /> : <></>}

          <Map
            user={{ latitude, longitude, longitudeDelta: 0.01, latitudeDelta: 0.01 }}
            business={[
              {
                latitude: businessLatitude,
                longitude: businessLongitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              },
            ]}
            rider={riderLocation ? riderLocation : null}
            coords={[]}
          />
          {sucess && <Footer data={data} />}
        </SafeAreaView>
      );
    } else {
      return <LoadingScreen />;
    }
  }

  return null;
};

const styles = StyleSheet.create({
  containerMain: {
    flex: 1,
    alignItems: "center",
  },
  container: {
    alignItems: "center",
    flex: 1,
  },
  progressContainer: {
    width: "100%",
  },
});

export default Tracking;
