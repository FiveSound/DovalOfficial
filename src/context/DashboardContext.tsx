import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { Alert, Vibration } from "react-native";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { SOCKET_URL } from "../services";
import { SOCKET_ORDER_BUSINESS_RECEPT } from "../constants/sockets";
import { useNavigation } from "../components/native";
import { useAppSelector } from "../redux";
import { RootState } from "../redux/store";
import { Audio } from 'expo-av';
import i18next from "../Translate";

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
  const { token, user } = useAppSelector((state: RootState) => state.auth);
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
  const soundRef = useRef<Audio.Sound | null>(null);

  const setupAudioMode = async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        staysActiveInBackground: true,
        playsInSilentModeIOS: true, 
        shouldDuckAndroid: false,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error("Error setting audio mode:", error);
    }
  };

  useEffect(() => {
    setupAudioMode();
  }, []);

  const handleSetPortalTab = async () => {
    if (soundRef.current) {
      await soundRef.current.stopAsync();
      await soundRef.current.unloadAsync();
      soundRef.current = null;
    }

    Vibration.cancel();
    navigation.navigate('MyTabs', { screen: 'Portal' });
  };

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, { auth: { token: token } });

    socketInstance.connect();

    setSocket(socketInstance);

    socketInstance.on(SOCKET_ORDER_BUSINESS_RECEPT, async (data) => {

      // Invalidate Dashboard
      queryClient.invalidateQueries({ queryKey: ["dashboard-orders-screen"] });
      queryClient.invalidateQueries({ queryKey: ["tab-orders-component"] });
      queryClient.invalidateQueries({ queryKey: ["all-orders-dashboard-screen"] });


      Vibration.vibrate([500, 500], true);

      try {
        const { sound } = await Audio.Sound.createAsync(
          require('../../assets/audios/simple-notification-152054.mp3'),
          { shouldPlay: true, isLooping: true }
        );
        soundRef.current = sound;
      } catch (error) {
        console.error("Error playing sound:", error);
      }

      Alert.alert(i18next.t("You have an order pending to accept!"), "", [
        { text: i18next.t("Go to Dashboard"), onPress: handleSetPortalTab },
      ]);
    });

    socketInstance.on('connect', () => {
      console.log('Socket connected:', socketInstance.id);
    });

    socketInstance.on('disconnect', (reason) => {
    });

    return () => {
      socketInstance.disconnect();
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
      Vibration.cancel();
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