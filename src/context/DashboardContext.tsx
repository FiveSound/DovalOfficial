import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Alert } from 'react-native';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';
import useFocusApp from '../hooks/useFocusApp';
import useCustomNavigation from './useCustomNavigation';
import { SOCKET_URL } from '../services';
import { OrderDashboardType, StatusType } from '../types/Dashboard';
import {
  getOrdersBusinessService,
  acceptOrderService,
  rejectOrderService,
  deliverOrderService,
} from '../services/business';

type DashboardProviderProps = {
  children: ReactNode;
};

type TypeStatus = 'accept' | 'delivered' | 'complete' | 'reject';

type TypeAlert = {
  accept: boolean;
  delivered: boolean;
  complete: boolean;
  reject: boolean;
};

type ContextType = {
  socket: Socket | null;
  open: boolean;
  setOpen: (open: boolean) => void;
  status: string;
  setStatus: (status: StatusType) => void;
  getOrdersByStatus: (status: string) => void;
  rejectedOrder: (orderID: number) => void;
  isLoading: boolean;
  isError: boolean;
  orders: OrderDashboardType[][];
  delivery: boolean;
  setDelivery: Dispatch<SetStateAction<boolean>>;
  currentOrderID: number | null;
  setCurrentOrderID: Dispatch<SetStateAction<number | null>>;
  acceptStatusOrder: () => void;
  deliveredStatusOrder: () => void;
  setConfirm: (key: TypeStatus, open: boolean) => void;
  confirmAlert: TypeAlert;
  processing: boolean;
  setProcessing: Dispatch<SetStateAction<boolean>>;
  alertSuccess: boolean;
  setAlertSucces: Dispatch<SetStateAction<boolean>>;
  handleSetConfirm: (orderID: number, status: TypeStatus) => void;
};

export const DashboardContext = createContext<ContextType>({} as ContextType);

export const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const focused = useFocusApp();
  const { navigation } = useCustomNavigation();
  const { user } = useAuth();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<StatusType>('PENDING');
  const [orders, setOrders] = useState<OrderDashboardType[][]>([]);
  const [isError, setIsError] = useState(false);
  const [currentOrderID, setCurrentOrderID] = useState<number | null>(null);
  const [delivery, setDelivery] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);
  const [alertSuccess, setAlertSucces] = useState(false);
  const [confirmAlert, setConfirmAlert] = useState({
    accept: false,
    delivered: false,
    complete: false,
    reject: false,
  });

  const setConfirm = (key: TypeStatus, open: boolean) => {
    setConfirmAlert({
      ...confirmAlert,
      [key]: open,
    });
  };

  const getOrdersByStatus = async (status: string) => {
    try {
      setIsLoading(true);

      const list = await getOrdersBusinessService(status);

      setOrders(list);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptStatusOrder = async () => {
    if (!currentOrderID) throw Error('No existe una orden!');

    setProcessing(true);

    const response = await acceptOrderService(currentOrderID, delivery);
    console.log({ response });

    if (response.success) {
      socket?.emit('event-accept-order', {
        orderID: currentOrderID,
      });

      setAlertSucces(true);
      setDelivery(false);
      setCurrentOrderID(null);

      setTimeout(() => {
        setConfirm('accept', false);
        setAlertSucces(false);
      }, 1500);

      setStatus('IN_PROGRESS');

      if (!open) {
        setOpen(true);
      }
    }

    if (response.riders === 0) {
      Alert.alert(
        'No hay repartidores disponibles!',
        'No hemos encontrado repartidores cerca a tu restaurante',
      );
    }

    setProcessing(false);
  };

  const deliveredStatusOrder = async () => {
    try {
      if (!currentOrderID) throw Error('OrderID es requerido!');
      setProcessing(true);
      const response = await deliverOrderService(currentOrderID);

      if (response.success) {
        socket?.emit('event-deliver-order', {
          orderID: currentOrderID,
        });
      }

      setProcessing(false);
      setConfirm('delivered', false);
      setStatus('DELIVERED');
    } catch (error) {
      console.log({ error });
    }
  };

  const rejectedOrder = async (orderID: number) => {
    try {
      const response = await rejectOrderService(orderID);

      if (response) {
        socket?.emit('event-reject-order', {
          orderID,
        });
      }

      setStatus('CANCELED');
    } catch (error) {
      console.log({ error });
    }
  };

  const handleSetConfirm = (orderID: number, status: TypeStatus) => {
    setCurrentOrderID(orderID);
    setConfirm(status, true);
  };

  useEffect(() => {
    if (!user) return;

    if (focused) {
      try {
        const socket = io(SOCKET_URL, {
          auth: {
            token: user.token,
          },
        });
        setSocket(socket);

        socket.on('connect', () => {
          console.log('Connected!', user.userID);
          socket.on('event-received-order', () => {
            try {
              getOrdersByStatus('PENDING');

              Alert.alert(
                `Has recibido una nueva orden!`,
                'Tienes una orden pendiente por aceptar',
                [
                  {
                    text: 'Ir a Dashboard',
                    onPress: () => navigation.navigate('Drawer'),
                  },
                ],
              );
            } catch (error) {
              setIsError(true);
            }
          });
        });

        return () => {
          socket.off('event-received-order');
          socket.disconnect();
          console.log('Disconnected!');
        };
      } catch (error) {
        console.error('Socket connection error:', error);
      }
    }
  }, [focused, user]);

  return (
    <DashboardContext.Provider
      value={{
        socket,
        open,
        setOpen,
        status,
        setStatus,
        getOrdersByStatus,
        rejectedOrder,
        isLoading,
        isError,
        orders,
        delivery,
        setDelivery,
        currentOrderID,
        setCurrentOrderID,
        acceptStatusOrder,
        deliveredStatusOrder,
        setConfirm,
        confirmAlert,
        processing,
        setProcessing,
        alertSuccess,
        setAlertSucces,
        handleSetConfirm,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  return context;
};
