import React, { useEffect, useState, useCallback } from "react";
import { ButtonAcces, FlexContainer, LoadingScreen, OrderProgress } from "../../../../../../components/custom";
import { useDashboard } from "../../../../../../context/DashboardContext";
import { FlatList, useNavigation } from "../../../../../../components/native";
import { LocationObjectCoords } from "expo-location";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getOrdersService } from "../../../../../../services/orders";
import { statusToStep, steps } from "../../../../../Order/ConfirmOrder/data";

type OrderStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELED";

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

type Order = {
  description: string;
  message: string;
  orderID: number;
  status: OrderStatus;
  step: number;
  title: string;
};

const OrderList = () => {
  const { socket } = useDashboard();
  const navigation = useNavigation();
  const [success, setSuccess] = useState(false);
  const [riderLocation, setRiderLocation] =
    useState<LocationObjectCoords | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ["getOrdersService"],
    queryFn: getOrdersService,
  });

  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (data) {
      // Asumiendo que solo hay una orden para simplificar
      const order = data.list[0] as { status: OrderStatus };
      setCurrentStep(statusToStep[order.status] ?? 0);
      setTimeout(() => {
        setSuccess(true);
      }, 500);
    }
  }, [data]);

  useEffect(() => {
    if (socket) {
      const handleOrderUpdate = (newState: Partial<TypeLiveOrder>) => {
        console.log(`Received event-realtime-order-}:`, newState);
        queryClient.setQueryData(["getOrdersService"], (oldData: any) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            list: oldData.list.map((order: Order) =>
              order.orderID === newState.riderID ? { ...order, ...newState } : order
            ),
          };
        });
      };

      const handleRouteUpdate = (route: LocationObjectCoords) => {
        console.log(`Received event-realtime-route-}:`, route);
        setRiderLocation(route);
      };

      socket.on(`event-realtime-order-}`, handleOrderUpdate);
      socket.on(`event-realtime-route-}`, handleRouteUpdate);

      return () => {
        console.log(`Cleaning up socket events for order }`);
        socket.off(`event-realtime-order-}`, handleOrderUpdate);
        socket.off(`event-realtime-route-}`, handleRouteUpdate);
      };
    }
  }, [socket, queryClient]);

  useEffect(() => {
    socket?.on("connect", () => {
      refetch();
    });

    return () => {
      socket?.off("connect");
    };
  }, [socket, refetch]);

  console.log('data:', data);

  const renderOrderItem = useCallback(({ item }: { item: Order }) => (
    <OrderProgress
    steps={steps}
    currentStep={currentStep}
    // latestArrivalMessage={latestArrivalMessage}
    showHero={false}
  />
  ), []);

  if (isLoading) {
    return (
      <LoadingScreen />
    );
  }


  return (
    <FlexContainer>
      <FlatList
        data={data?.list}
        keyExtractor={(item) => item.orderID.toString()}
        renderItem={renderOrderItem}
        refreshing={isFetching}
        onRefresh={refetch}
      />
    </FlexContainer>
  );
};

export default React.memo(OrderList);