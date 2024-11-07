import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { SOCKET_URL } from "../services";
import { SOCKET_ORDER_BUSINESS_RECEPT } from "../constants/sockets";
import { useNavigation } from "../components/native";
import { useAppSelector } from "../redux";
import { RootState } from "../redux/store";
import { ActiveTabContext } from '../context/ActiveTabContext';

type DashboardProviderProps = {
  children: ReactNode;
};

type ContextType = {
  socket: Socket | null;
  acceptAlert: boolean;
  setAcceptAlert: Dispatch<SetStateAction<boolean>>;
  rejectAlert: boolean;
  setRejectAlert: Dispatch<SetStateAction<boolean>>;
  deliveryAlert: boolean;
  setDeliveryAlert: Dispatch<SetStateAction<boolean>>;
  myRiderAlert: boolean;
  setMyRiderAlert: Dispatch<SetStateAction<boolean>>;
  verifiedAlert: boolean;
  setVerifiedAlert: Dispatch<SetStateAction<boolean>>;
  delayAlert: boolean;
  setDelayAlert: Dispatch<SetStateAction<boolean>>;
  currentOrderID: number | null;
  setCurrentOrderID: Dispatch<SetStateAction<number | null>>;
};

export const DashboardContext = createContext<ContextType>({} as ContextType);

export const DashboardProvider: FC<DashboardProviderProps> = ({ children }) => {
  const { token , user} = useAppSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentOrderID, setCurrentOrderID] = useState<number | null>(null);
  const [acceptAlert, setAcceptAlert] = useState(false);
  const [rejectAlert, setRejectAlert] = useState(false);
  const [deliveryAlert, setDeliveryAlert] = useState(false);
  const [myRiderAlert, setMyRiderAlert] = useState(false);
  const [verifiedAlert, setVerifiedAlert] = useState(false);
  const [delayAlert, setDelayAlert] = useState(false);
  const { setActiveTab, activeTab } = useContext(ActiveTabContext);
  
   const handleSetPortalTab = () => {
    setActiveTab('Portal');
    navigation.navigate('HomeStack');
  };

  

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, { auth: { token: token } }); 
    
    socketInstance.connect();

    setSocket(socketInstance);

    socketInstance.on(SOCKET_ORDER_BUSINESS_RECEPT, () => {
      
      // Invalidate Dashboard
      queryClient.invalidateQueries({ queryKey: ["dashboard-orders-screen"] });
      queryClient.invalidateQueries({ queryKey: ["tab-orders-component"] });
      queryClient.invalidateQueries({ queryKey: ["all-orders-dashboard-screen"] });

      // queryClient.resetQueries()
      Alert.alert("Tienes una orden pendiente por aceptar!", "", [
        { text: "Ir a Dashboard", onPress: handleSetPortalTab },
      ]);
      console.log('Tienes una orden pendiente por aceptar!');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [user]);

  return (
    <DashboardContext.Provider
      value={{
        socket,
        acceptAlert,
        setAcceptAlert,
        rejectAlert,
        setRejectAlert,
        deliveryAlert,
        setDeliveryAlert,
        myRiderAlert,
        setMyRiderAlert,
        verifiedAlert,
        setVerifiedAlert,
        delayAlert,
        setDelayAlert,
        currentOrderID,
        setCurrentOrderID,
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