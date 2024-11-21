import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StyleSheet, Alert } from 'react-native';
import { Container, LineDivider, LoadingScreen } from '../../../../components/custom';
import { getDashboardOrderService, getOrderIDService, getTabsDashboardService } from '../../../../services/business';
import { OrderCustomerInfo, OrderHeader, OrderItems, OrderPaymentInfo, OrderRiderInfo } from './components';
import OrderActions from './components/OrderActions';
import { ScrollView, useNavigation, View } from '../../../../components/native';
import { SIZES } from '../../../../constants/theme';
import { TabBarVisibilityContext } from '../../../../context/TabBarVisibilityContext';
import { SOCKET_ORDER_BUSINESS_ACCEPT, SOCKET_ORDER_BUSINESS_REJECT } from '../../../../constants/sockets';
import ORDER_STATUS from '../../../../constants/ORDER_STATUS';
import { useDashboard } from '../../../../context/DashboardContext';


type Props = {
  route: any;
};

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
const QUERY_KEY_ORDER_ID = 'business-order-id';

const OrderID: React.FC<Props> = (props: Props) => {
  const { socket } = useDashboard();
  const queryClient = useQueryClient();
  const navigate  = useNavigation();
  const [lastStatus, setLastStatus] = useState(DEFAULT_STATUS);
  const order = useQuery({
    queryKey: [QUERY_KEY_ORDER_ID],
    queryFn: async () => getOrderIDService(props.route.params.orderID),
  });
 
  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);
  
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
    // onToast('Procesando orden...');

    const response = await socket
      ?.timeout(1000)
      .emitWithAck(socketName, { orderID });

    if (!response.success) {
      // onToast(`Ha ocurrido un error!`);
      return;
    }

    // Success
    // onToast(successMessage);

    // Mutate data
    onDeleteOrderFromPage(orderID);

    // Update Tabs...
    mutationTabs.mutate();
  };

  const onAccept = useCallback((orderID: number) => {
    Alert.alert('Aceptar esta orden', 'Order ID: ' + orderID, [
      { text: 'Cancelar' },
      {
        text: 'Confirmar',
        onPress: () =>
        {
          handleUpdate(
            SOCKET_ORDER_BUSINESS_ACCEPT,
            orderID,
            `Orden ${orderID} acceptada con exito!`,
          );
          navigate.goBack();
        }
      },
    ]);
  }, []);

  const onReject = useCallback((orderID: number) => {
    Alert.alert('Rechazar esta orden', 'Order ID: ' + orderID, [
      { text: 'Cancelar' },
      {
        text: 'Confirmar',
        onPress: () =>
        {
          handleUpdate(
            SOCKET_ORDER_BUSINESS_REJECT,
            orderID,
            `Orden #${orderID} rechazada con exito!`,
          );
          navigate.goBack();
        }
      },
    ]);
  }, []);

  if (order.isLoading || order.isFetching) return <LoadingScreen />;

  if (order.data) {
    const {
      id,
      status,
      items,
      client,
      clientEmail,
      clientPhone,
      clientDetailsLocation,
      rider,
      riderOrders,
      riderPhone,
      resume,
    } = order.data;

    return (
      <Container
        label='Orden'
        style={styles.container}
        showHeader={true}

        >
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.container}>
            <OrderItems items={items} />
            <OrderHeader orderId={id} status={status} />
            <OrderActions onAccept={() => onAccept(id)} onReject={() => onReject(id)} status={status}/>
            <LineDivider lineStyle={styles.lineDivider} variant='secondary' />
            <OrderPaymentInfo resume={resume} />
            <LineDivider lineStyle={styles.lineDivider} variant='secondary' />

            <OrderCustomerInfo
              client={client}
              clientEmail={clientEmail}
              clientPhone={clientPhone}
              clientDetailsLocation={clientDetailsLocation}
            />
            <LineDivider lineStyle={styles.lineDivider} variant='secondary' />

            <OrderRiderInfo
              rider={rider}
              riderOrders={riderOrders}
              riderPhone={riderPhone}
            // riderScore={order.data.riderScore} // Descomentar si existe
            />

            {/* <Text selectable>{JSON.stringify(order.data, null, 2)}</Text> */}
          </View>
        </ScrollView>
      </Container>
    );
  }

  return null;
};

export default OrderID;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
  },
  lineDivider: {
    width: SIZES.width,
    alignSelf: 'center',
  },
  contentContainer: {
    paddingBottom: SIZES.height / 10,
  }
});
