import React, { memo, useEffect, useState } from 'react';
import {
  Carrousel,
  FlexContainer,
  IsLoading,
} from '../../../../../components/custom';
import { getOrdersService } from '../../../../../services/orders';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useDashboard } from '../../../../../context/DashboardContext';
import { LocationObjectCoords } from 'expo-location';
import OrderProgress from '../../../../../components/custom/Progress/OrderProgress';
import i18next from '../../../../../Translate';

type OrderStatus =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'OUT_FOR_DELIVERY'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELED';

type TypeLiveOrder = {
  id: string;
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

const LiveOrders = () => {
  const { socket } = useDashboard();
  const [riderLocation, setRiderLocation] =
    useState<LocationObjectCoords | null>(null);
  const queryClient = useQueryClient();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['getOrdersService'],
    queryFn: getOrdersService,
  });

  console.log('data', data);

  useEffect(() => {
    if (socket) {
      socket.on(`event-realtime-order`, newState => {
        console.log(`Received event-realtime-order:`, newState);
        queryClient.setQueryData(
          ['getOrdersService'],
          (old: TypeLiveOrder[] | undefined) => {
            if (!old) return [];
            return old.map(order =>
              order.id === newState.id ? { ...order, ...newState } : order,
            );
          },
        );
      });

      socket.on(`event-realtime-route`, route => {
        console.log(`Received event-realtime-route:`, route);
        setRiderLocation(route);
      });

      return () => {
        console.log(`Cleaning up socket events`);
        socket.off(`event-realtime-order`);
        socket.off(`event-realtime-route`);
      };
    }
  }, [socket, queryClient]);

  useEffect(() => {
    socket?.on('connect', () => {
      refetch();
    });
  }, [socket, refetch]);

  if (isLoading) {
    return <IsLoading />;
  }

  if (data && data.list.length > 0 && data.success) {
    const { list } = data;
    console.log('list', list);
   
      return (
        <FlexContainer>
          <Carrousel
            row={list}
            label={i18next.t('Review your order!')}
          RenderItem={(item, index: number) => {
            const showStatus = item.status === 'COMPLETED';
            if(!showStatus){ 
              return (
                <OrderProgress
                  key={item.orderID}
                  steps={item.steps}
                  currentStep={item.currentStep}
                  showHero={false}
                  status={item.status}
                />
              )
            }
            return <></>
          }}
          />
        </FlexContainer>
      );
  }
};

export default memo(LiveOrders);
