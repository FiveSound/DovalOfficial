import { useState, useCallback, Suspense, lazy } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import { useDashboard } from '../../../context/DashboardContext';
import {
  getDashboardOrderService,
  getTabsDashboardService,
} from '../../../services/business';
import ORDER_STATUS from '../../../constants/ORDER_STATUS';
const LazyOrder = lazy(() => import('../components/Order'));
import Popup from "../components/Popup";
import Select from "../components/Select";
import {
  SOCKET_ORDER_BUSINESS_ACCEPT,
  SOCKET_ORDER_BUSINESS_DELIVERED,
  SOCKET_ORDER_BUSINESS_REJECT,
  SOCKET_ORDER_BUSINESS_VERIFY,
  SOCKET_ORDER_BUSINESS_COMPLETE,
  SOCKET_ORDER_BUSINESS_DELAY,
} from '../../../constants/sockets';
import {
  Container,
  FlexContainer,
  IsLoading,
  LoadingScreen,
  Pagination,
  PaginationHeader,
  ScreenEmpty,
  TabList,
  Typography,
} from '../../../components/custom';
import { FlashList, Platform, TouchableOpacity , View} from '../../../components/native';
import { COLORS, SIZES } from '../../../constants/theme';
import { Ilustrations } from '../../../constants';
import i18next from '../../../Translate';
import OTPInput from '../components/OTPInput';

type DataQueryType = {
  status: string;
  list: any[];
  page: number;
  pageSize: number | null;
  totalPages: number | null;
  pagination: number[] | null;
};

const QUERY_KEY = 'dashboard-orders-screen';
const QUERY_KEY_TABS = 'dashboard-tabs-orders-component';
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

const onToast = (msg: string) =>
  ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);

const DashboardHome = () => {
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
    queryFn: async () =>
      await getDashboardOrderService({
        queryKey: [QUERY_KEY, DEFAULT_STATUS, DEFAULT_PAGE],
      }),
    initialData,
  });

  const tabs = useQuery({
    queryKey: [QUERY_KEY_TABS],
    queryFn: getTabsDashboardService,
    initialData: { list: [] },
  });

  // Mutations
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (params: { status: string; page: number }) => {
      return await getDashboardOrderService({
        queryKey: [QUERY_KEY, params.status, params.page],
      });
    },
    onSuccess: response => queryClient.setQueryData([QUERY_KEY], response),
  });

  const mutationTabs = useMutation({
    mutationKey: [QUERY_KEY_TABS],
    mutationFn: getTabsDashboardService,
    onSuccess: response => queryClient.setQueryData([QUERY_KEY_TABS], response),
  });

  const onDeleteOrderFromPage = (orderID: number) => {
    queryClient.setQueryData([QUERY_KEY], (oldData: DataQueryType) => {
      const updatedList = oldData.list.filter(row => row.orderID !== orderID);

      if (updatedList.length > 0) {
        return { ...oldData, list: updatedList };
      }

      const isFirstPage = oldData.page === 1;
      const newPage = isFirstPage ? 1 : oldData.page - 1;

      mutation.mutate({ status: lastStatus, page: newPage });

      return oldData;
    });
  };

  const handleUpdate = async (
    socketName: string,
    orderID: number,
    successMessage: string,
  ) => {
    // Indicate loading...
    onToast(i18next.t('Processing order...'));

    const response = await socket
      ?.timeout(1000)
      .emitWithAck(socketName, { orderID });

    if (!response.success) {
      onToast(i18next.t('An error occurred!'));
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
    Alert.alert('Aceptar esta orden', 'Order ID: ' + orderID, [
      { text: 'Cancelar' },
      {
        text: 'Confirmar',
        onPress: () =>
          handleUpdate(
            SOCKET_ORDER_BUSINESS_ACCEPT,
            orderID,
            `Orden ${orderID} acceptada con exito!`,
          ),
      },
    ]);
  }, []);

  const onReject = useCallback((orderID: number) => {
    Alert.alert(i18next.t('Reject this order'), 'Order ID: ' + orderID, [
      { text: 'Cancelar' },
      {
        text: 'Confirmar',
        onPress: () =>
          handleUpdate(
            SOCKET_ORDER_BUSINESS_REJECT,
            orderID,
            `${i18next.t('Order')} #${orderID} ${i18next.t('rejected successfully!')}`,
          ),
      },
    ]);
  }, []);

  const onSend = useCallback((orderID: number) => {
    Alert.alert(i18next.t('Send this order'), 'Order ID: ' + orderID, [
      { text: i18next.t('Cancel') },
      {
        text: i18next.t('Confirm'),
        onPress: () =>
          handleUpdate(
            SOCKET_ORDER_BUSINESS_DELIVERED,
            orderID,
            `${i18next.t('Order')} #${orderID} ${i18next.t('sent successfully!')}`,
          ),
      },
    ]);
  }, []);

  const onComplete = useCallback(async (orderID: number) => {
    const response = await socket
      ?.timeout(1000)
      .emitWithAck(SOCKET_ORDER_BUSINESS_COMPLETE, { orderID });
    if (response.success) {
      setCurrentOrderID(orderID);
      setOpenVerify(true);
    } else {
      onToast(i18next.t('An error occurred!'));
    }
  }, []);

  const onAddTime = useCallback((orderID: number) => {
    setCurrentOrderID(orderID);
    setOpenDelay(true);
  }, []);

  const onVerify = useCallback(
    async (code: string) => {
      const params = { orderID: currentOrderID, code };
      const response = await socket
        ?.timeout(1000)
        .emitWithAck(SOCKET_ORDER_BUSINESS_VERIFY, params);
        console.log('response verify', response);

      if (response.success && currentOrderID) {
        onToast(`${i18next.t('Order')} ${currentOrderID} ${i18next.t('completed successfully!')}!`);
        // Mutate
        onDeleteOrderFromPage(currentOrderID);

        setOpenVerify(false);
        setCurrentOrderID(null);
      } else {
        onToast(i18next.t('Incorrect code!'));
      }
    },
    [currentOrderID],
  );

  const onDelay = useCallback(async () => {
    const params = { orderID: currentOrderID, time: delayTime };
    const response = await socket
      ?.timeout(1000)
      .emitWithAck(SOCKET_ORDER_BUSINESS_DELAY, params);
      console.log('response delay', response);
    if (response.success) {
      onToast(`${i18next.t('Time')} ${i18next.t('added to the order')} #${currentOrderID}!`);

      setOpenDelay(false);
    } else {
      onToast(i18next.t('An error occurred!'));
    }
  }, [currentOrderID, delayTime]);

  const isEmpty = orders.data.list.length === 0;

  if (orders.isLoading || orders.isFetching) return <LoadingScreen />;
  if (orders.isError) return;
  <ScreenEmpty
    labelPart1={i18next.t('An ocurred error!')}
    labelPart2={i18next.t('Please try again later.')}
    source={Ilustrations.CharcoPet}
    ImgWidth={SIZES.width}
    ImgHeigth={SIZES.height / 3}
    onPress={onRefetch}
    labelButton={i18next.t('Try again')}
    labelStylePart1={styles.textError}
  />;

  return (
    <Container useSafeArea={true} style={styles.container}>
      <TabList
        isLoading={tabs.isLoading || tabs.isFetching}
        list={tabs.data.list}
        onChange={status => {
          setLastStatus(status);
          setLastPage(DEFAULT_PAGE);
          mutation.mutate({ status, page: DEFAULT_PAGE });
        }}
        status={lastStatus}
      />

      {/* Header */}
      {/* <PaginationHeader refetch={onRefetch} placeholder={i18next.t('Pending')} /> */}

      {/* Body */}
      {mutation.isPending && (
        <IsLoading size={Platform.OS === 'android' ? 'small' : 'medium'} />
      )}

{isEmpty ? (
        <ScreenEmpty
          labelPart1={i18next.t('No orders available')}
          labelPart2={i18next.t('We have not found orders in this state.')}
          source={Ilustrations.CharcoPet}
          ImgWidth={SIZES.width}
          ImgHeigth={SIZES.height / 3}
          onPress={onRefetch}
          labelButton={i18next.t('Try again')}
        />
      ) : (
        <FlexContainer newStyle={{ flex: 1 }}>
          <FlashList
          data={orders.data.list}
          renderItem={({ item }) => (
            <Suspense fallback={<IsLoading />}>
              <LazyOrder
                onAccept={onAccept}
                onReject={onReject}
                onSend={onSend}
                onAddTime={onAddTime}
                onComplete={onComplete}
                onNavigateTo={orderID => navigation.navigate('Dashboard/Business/OrderID', { orderID })
                }
                {...item}
              />
            </Suspense>
          )}
          keyExtractor={(item: any) => item.orderID.toString()}
          estimatedItemSize={100}
          onRefresh={onRefetch}
          refreshing={orders.isFetching}
          ListFooterComponent={orders.isFetching ? <IsLoading /> : null}
          contentContainerStyle={styles.contentContainer}
        />
        </FlexContainer>
      )}

      {/* Footer */}
      <Pagination
        currentPage={orders.data.page}
        onChange={page => {
          setLastPage(page);
          mutation.mutate({ status: lastStatus, page });
        }}
        pagination={orders.data.pagination}
      />

      {/* Verify Popup */}
      <Popup id="popup-verify-order" title="Escribe el codigo de la orden" open={openVerify}>
          <OTPInput onChange={onVerify} />
        <TouchableOpacity onPress={() => setOpenVerify(false)} style={[styles.btn, styles.btnError]}>
          <Typography variant='H4title' newStyle={{ color: "#F41F52", fontWeight: "bold" }}>Cancelar</Typography>
        </TouchableOpacity>
      </Popup>

      {/* Add time Popup */}
      <Popup id="popup-delay-order" title="Que tiempo necesitas?" open={openDelay}>
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

        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={() => setOpenDelay(false)} style={[styles.btn, styles.btnError]}>
            <Typography variant='H4title' newStyle={{ color: "#F41F52",}}>Cancelar</Typography >
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelay} style={[styles.btn, styles.btnSuccess]}>
            <Typography variant='H4title' newStyle={{ color: "#4ADE80" }}>Confirmar</Typography>
          </TouchableOpacity>
        </View>
      </Popup>
    </Container>
  );
};

export default DashboardHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
  textError: {
    color: COLORS.error,
  },
  btn: {
    paddingVertical: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
    borderRadius: SIZES.radius,
  },
  btnSuccess: {
    backgroundColor: 'rgba(74, 222, 128, 0.38)',
  },
  btnError: {
    backgroundColor: 'rgba(244, 31, 82, 0.38)',
  },
  contentContainer: {
    paddingBottom: SIZES.height / 10,
  },
  btnContainer: {
    marginTop: SIZES.gapMedium,
    flexDirection: "row",
    gap: SIZES.gapMedium,
  },
});
