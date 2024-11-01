import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  IsLoading,
  LoadingScreen,
  OrderProgress,
} from '../../../components/custom';
import { useNavigation, View } from '../../../components/native';
import { useDashboard } from '../../../context/DashboardContext';
import {  useTheme } from '../../../hooks';
import { LocationObjectCoords } from 'expo-location';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getOrderIDService } from '../../../services/orders';
import MapOrdenStatus from './MapOrdenStatus';
import { Footer } from './components';
import ThreeIcons from '../../../components/custom/Bar/ThreeIcons';
import { useDispatch } from 'react-redux';
import { closeModalPin, openModalPin } from '../../../redux/slides/modalSlice';
import { useAuth } from '../../../context/AuthContext';
import i18next from 'i18next';
import { useAppDispatch, useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';

interface Props {
  route: {
    params: { orderID: number };
  };
}

type OrderStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELED';

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

const Tracking = ({ route }: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { orderID } = route.params;
  const { socket } = useDashboard();
  const { BackgroundMain } = useTheme();
  const [sucess, setSucess] = useState(false);
  const [riderLocation, setRiderLocation] =
    useState<LocationObjectCoords | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['screen-order-id', orderID],
    queryFn: getOrderIDService,
  });

  const openModal = () => {
    if (data && !isLoading) {
      dispatch(openModalPin({ data }));
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      setTimeout(() => {
        openModal();
        setSucess(true);
      }, 500);
    }
  }, [data]);

  const handlePress = () => {
    dispatch(closeModalPin());
    navigation.navigate('TabsNavigation');
  };

  useEffect(() => {
    if (socket) {
      const orderEvent = `event-realtime-order-${orderID}`;
      const routeEvent = `event-realtime-route-${orderID}`;

      socket.on(orderEvent, (newState: Partial<TypeLiveOrder>) => {
        console.log(`${orderEvent} received:`, newState);
        queryClient.setQueryData(
          ['screen-order-id', orderID],
          (old: TypeLiveOrder | undefined) => {
            return old ? { ...old, ...newState } : undefined;
          },
        );
      });

      socket.on(routeEvent, (route: LocationObjectCoords) => {
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
    socket?.on('connect', () => {
      refetch();
    });
  }, [socket, refetch]);

  useEffect(() => {
    if (data?.status === 'COMPLETED') {
      setTimeout(() => {
        navigation.navigate('Complete');
        dispatch(closeModalPin());
      }, 500);
    }

    if (data?.canceled) {
      navigation.navigate('Cancel');
      dispatch(closeModalPin());
    }
  }, [data, navigation, dispatch]);

  if (isLoading || isFetching) return <LoadingScreen />;

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
    } = data;

    if (
      latitude &&
      longitude &&
      businessLatitude &&
      businessLongitude &&
      isAuthenticated
    ) {
      return (
        <View
          style={[
            styles.container,
            {
              backgroundColor: BackgroundMain,
            },
          ]}
        >
          <ThreeIcons
            showBack={false}
            label={i18next.t('Tracking order')}
            onPress={handlePress}
          />
          <OrderProgress
            steps={steps}
            currentStep={currentStep}
            showHero={true}
            messageOptional={
              rider_waiting &&
              i18next.t('🏍️ Rider is waiting for the order in the restaurant')
            }
            rider_waiting={rider_waiting && status !== 'DELIVERED'}
            status={status}
          />
          {!sucess ? <IsLoading label={i18next.t('Loading...')} /> : <></>}
          <MapOrdenStatus
            user={{
              latitude,
              longitude,
            }}
            business={{
              latitude: businessLatitude,
              longitude: businessLongitude,
            }}
            rider={riderLocation}
            coords={[]}
          />
          {sucess && <Footer data={data} />}
        </View>
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
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
    flex: 1,
  },
  progressContainer: {
    width: '100%',
  },
});

export default Tracking;
