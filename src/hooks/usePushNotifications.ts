import { useState, useEffect, useRef } from 'react';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export interface PushNotificationState {
  expoPushToken?: Notifications.ExpoPushToken;
  notification?: Notifications.Notification;
}

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: true,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();

  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responderListener = useRef<Notifications.Subscription>();

  const registerForPushNotificationsAsync = async () => {
    try {
      console.log('Registrando para notificaciones push...');
      let token;
      if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        console.log(`Permisos existentes: ${existingStatus}`);
        let finalStatus = existingStatus;
  
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          console.log(`Permisos solicitados: ${status}`);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          console.warn('Falló al obtener el token de push');
          return;
        }
        token = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas.projectid,
        });
        console.log(`Token obtenido: ${JSON.stringify(token)}`);
      } else {
        console.warn('Debes usar un dispositivo físico para notificaciones push');
        return;
      }
  
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
        console.log('Canal de notificación Android configurado');
      }
  
      return token;
    } catch (error) {
      console.error('Error en registerForPushNotificationsAsync:', error);
      return undefined;
    }
  };

  useEffect(() => {
    // alert('usePushNotifications - useEffect iniciado');
    registerForPushNotificationsAsync().then(token => {
      if (token) {
        setExpoPushToken(token);
        // alert(`Push token establecido: ${token}`);
      }
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
        // alert(
        //   `Notificación recibida: ${JSON.stringify(notification)}`
        // );
      });

    responderListener.current =
      Notifications.addNotificationResponseReceivedListener(response => {
        // alert(
        //   `Respuesta a notificación: ${JSON.stringify(response)}`
        // );
      });

    return () => {
      if (notificationListener.current) {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        // alert('Listener de notificación removido');
      }
      if (responderListener.current) {
        Notifications.removeNotificationSubscription(
          responderListener.current
        );
        // alert('Listener de respuesta removido');
      }
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};