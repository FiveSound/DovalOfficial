import { useState, useCallback } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Alert,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
import { useDashboard } from "../../../context/DashboardContext";
import { getDashboardOrderService, getTabsDashboardService } from "../../../services/business";
import ORDER_STATUS from "../../../constants/ORDER_STATUS";
import Order from "../components/Order";
// import Popup from "../../../components/Popup";
// import OTPInput from "../../../components/OTPInput";
// import Select from "../../../components/Select";

import {
  SOCKET_ORDER_BUSINESS_ACCEPT,
  SOCKET_ORDER_BUSINESS_DELIVERED,
  SOCKET_ORDER_BUSINESS_REJECT,
  SOCKET_ORDER_BUSINESS_VERIFY,
  SOCKET_ORDER_BUSINESS_COMPLETE,
  SOCKET_ORDER_BUSINESS_DELAY,
} from "../../../constants/sockets";
import { Container, IsLoading, LoadingScreen, Pagination, PaginationHeader , ScreenEmpty, TabList} from "../../../components/custom";
import { Platform } from "../../../components/native";
import { SIZES } from "../../../constants/theme";
import { Ilustrations } from "../../../constants";

type DataQueryType = {
  status: string;
  list: any[];
  page: number;
  pageSize: number | null;
  totalPages: number | null;
  pagination: number[] | null;
};

const QUERY_KEY = "dashboard-orders-screen";
const QUERY_KEY_TABS = "dashboard-tabs-orders-component";
const DEFAULT_STATUS = ORDER_STATUS.PENDING;
const DEFAULT_PAGE = 1;

const initialData = {
  status: DEFAULT_STATUS,
  list: [],
  page: DEFAULT_PAGE,
  pageSize: null,
  totalPages: null,
  pagination: [],
};

const onToast = (msg: string) => ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);

const Home = () => {
  const { socket } = useDashboard();
  const navigation = useNavigation<NavigationProp<any>>();

  // States
  const [lastStatus, setLastStatus] = useState(DEFAULT_STATUS);
  const [lastPage, setLastPage] = useState(DEFAULT_PAGE);
  const [openVerify, setOpenVerify] = useState(false);
  const [openDelay, setOpenDelay] = useState(false);
  const [delayTime, setDelayTime] = useState<number | string>(10);
  const [currentOrderID, setCurrentOrderID] = useState<number | null>(null);

  // Fetch Data
  const orders = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getDashboardOrderService({ queryKey: [QUERY_KEY, DEFAULT_STATUS, DEFAULT_PAGE] }),
    initialData,
  });

  const tabs = useQuery({ queryKey: [QUERY_KEY_TABS], queryFn: getTabsDashboardService, initialData: { list: [] } });

  // Mutations
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (params: { status: string; page: number }) => {
      return await getDashboardOrderService({ queryKey: [QUERY_KEY, params.status, params.page] });
    },
    onSuccess: (response) => queryClient.setQueryData([QUERY_KEY], response),
  });

  const mutationTabs = useMutation({
    mutationKey: [QUERY_KEY_TABS],
    mutationFn: getTabsDashboardService,
    onSuccess: (response) => queryClient.setQueryData([QUERY_KEY_TABS], response),
  });

  const onDeleteOrderFromPage = (orderID: number) => {
    queryClient.setQueryData([QUERY_KEY], (oldData: DataQueryType) => {
      const updatedList = oldData.list.filter((row) => row.orderID !== orderID);

      if (updatedList.length > 0) {
        return { ...oldData, list: updatedList };
      }

      const isFirstPage = oldData.page === 1;
      const newPage = isFirstPage ? 1 : oldData.page - 1;

      mutation.mutate({ status: lastStatus, page: newPage });

      return oldData;
    });
  };

  const handleUpdate = async (socketName: string, orderID: number, successMessage: string) => {
    // Indicate loading...
    onToast("Procesando orden...");

    const response = await socket?.timeout(1000).emitWithAck(socketName, { orderID });

    if (!response.success) {
      onToast(`Ha ocurrido un error!`);
      return;
    }

    // Success
    onToast(successMessage);

    // Mutate data
    onDeleteOrderFromPage(orderID);

    // Update Tabs...
    mutationTabs.mutate();
  };

  // Methods
  const onRefetch = () => {
    tabs.refetch();
    mutation.mutate({ status: lastStatus, page: lastPage });
  };

  const onAccept = useCallback((orderID: number) => {
    Alert.alert("Aceptar esta orden", "Order ID: " + orderID, [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => handleUpdate(SOCKET_ORDER_BUSINESS_ACCEPT, orderID, `Orden ${orderID} acceptada con exito!`),
      },
    ]);
  }, []);

  const onReject = useCallback((orderID: number) => {
    Alert.alert("Rechazar esta orden", "Order ID: " + orderID, [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => handleUpdate(SOCKET_ORDER_BUSINESS_REJECT, orderID, `Orden #${orderID} rechazada con exito!`),
      },
    ]);
  }, []);

  const onSend = useCallback((orderID: number) => {
    Alert.alert("Enviar esta orden", "Order ID: " + orderID, [
      { text: "Cancelar" },
      {
        text: "Confirmar",
        onPress: () => handleUpdate(SOCKET_ORDER_BUSINESS_DELIVERED, orderID, `Orden #${orderID} enviada con exito!`),
      },
    ]);
  }, []);

  const onComplete = useCallback(async (orderID: number) => {
    const response = await socket?.timeout(1000).emitWithAck(SOCKET_ORDER_BUSINESS_COMPLETE, { orderID });
    if (response.success) {
      setCurrentOrderID(orderID);
      setOpenVerify(true);
    } else {
      onToast(`Ha ocurrido un error!`);
    }
  }, []);

  const onAddTime = useCallback((orderID: number) => {
    setCurrentOrderID(orderID);
    setOpenDelay(true);
  }, []);

  const onVerify = useCallback(
    async (code: string) => {
      const params = { orderID: currentOrderID, code };
      const response = await socket?.timeout(1000).emitWithAck(SOCKET_ORDER_BUSINESS_VERIFY, params);

      if (response.success && currentOrderID) {
        onToast(`Order ${currentOrderID} completada con exito!`);

        // Mutate
        onDeleteOrderFromPage(currentOrderID);

        setOpenVerify(false);
        setCurrentOrderID(null);
      } else {
        onToast("Código incorrecto!");
      }
    },
    [currentOrderID]
  );

  const onDelay = useCallback(async () => {
    const params = { orderID: currentOrderID, time: delayTime };
    const response = await socket?.timeout(1000).emitWithAck(SOCKET_ORDER_BUSINESS_DELAY, params);

    if (response.success) {
      onToast(`Tiempo agregado a la orden #${currentOrderID}!`);
      setOpenDelay(false);
    } else {
      onToast(`Ha ocurrido un error!`);
    }
  }, [currentOrderID, delayTime]);

  if (orders.isLoading || orders.isFetching) return <LoadingScreen/>;
  if (orders.isError) return 
  <ScreenEmpty 
  labelPart1="An ocurred error!" 
  labelPart2="Please try again later." 
  source={Ilustrations.CharcoPet}
  ImgWidth={SIZES.width}
  ImgHeigth={SIZES.height / 3}
  onPress={onRefetch}/>;

  return (
    <Container 
    useSafeArea={true}
    style={styles.container}>
      {/* Tabs */}
      <TabList
        isLoading={tabs.isLoading || tabs.isFetching}
        list={tabs.data.list}
        onChange={(status) => {
          // When change status reset laststatus to default
          setLastStatus(status);
          setLastPage(DEFAULT_PAGE);
          mutation.mutate({ status, page: DEFAULT_PAGE });
        }}
        status={lastStatus}
      />

      {/* Header */}
      <PaginationHeader refetch={onRefetch} />

      {/* Body */}
      {mutation.isPending && <IsLoading  size={Platform.OS === 'android' ? 'small' : 'medium'}/>}

      <FlatList
        data={orders.data.list}
        renderItem={({ item }) => (
          <Order
            onAccept={onAccept}
            onReject={onReject}
            onSend={onSend}
            onAddTime={onAddTime}
            onComplete={onComplete}
            onNavigateTo={(orderID) => navigation.navigate("Dashboard/Business/OrderID", { orderID })}
            // waiting={mutation.isPending}
            {...item}
          />
        )}
        keyExtractor={(item) => item.orderID.toString()}
        initialNumToRender={4}
        maxToRenderPerBatch={4}
        onRefresh={onRefetch}
        refreshing={orders.isFetching}
      />

      {/* Footer */}
      <Pagination
        currentPage={orders.data.page}
        onChange={(page) => {
          setLastPage(page);
          mutation.mutate({ status: lastStatus, page });
        }}
        pagination={orders.data.pagination}
      />

      {/* Verify Popup */}
      {/* <Popup id="popup-verify-order" title="Escribe el codigo de la orden" open={openVerify}>
        <View style={{ marginVertical: 15 }}>
          <OTPInput onChange={onVerify} />
        </View>

        <TouchableOpacity onPress={() => setOpenVerify(false)} style={[styles.btn, styles.btnError]}>
          <Text style={{ color: "#F41F52", fontWeight: "bold" }}>Cancelar</Text>
        </TouchableOpacity>
      </Popup> */}

      {/* Add time Popup */}
      {/* <Popup id="popup-delay-order" title="Que tiempo necesitas?" open={openDelay}>
        <Select
          onChange={(value) => setDelayTime(value)}
          value={delayTime}
          list={[
            { title: "10 Min", value: 10 },
            { title: "20 Min", value: 20 },
            { title: "30 Min", value: 30 },
          ]}
          defaultValue={5}
        />

        <View style={{ marginTop: 10, flexDirection: "row", gap: 10 }}>
          <TouchableOpacity onPress={() => setOpenDelay(false)} style={[styles.btn, styles.btnError]}>
            <Text style={{ color: "#F41F52", fontWeight: "bold" }}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelay} style={[styles.btn, styles.btnSuccess]}>
            <Text style={{ color: "#4ADE80", fontWeight: "bold" }}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </Popup> */}
    </Container>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  textError: {
    color: "red",
  },
  btn: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  btnSuccess: {
    backgroundColor: "rgba(74, 222, 128, 0.38)",
  },
  btnError: {
    backgroundColor: "rgba(244, 31, 82, 0.38)",
  },
});