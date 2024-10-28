import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '../../../native';

type Props = {
  showAlert: boolean;
  onDismiss: () => void;
};

const LoginAlert = ({ showAlert, onDismiss }: Props) => {
  const navigation = useNavigation();
  useEffect(() => {
    if (showAlert) {
      Alert.alert(
        'Inicio de sesión',
        'Por favor, inicie sesión para continuar.',
        [
          {
            text: 'Iniciar seccion',
            onPress: () => {
              navigation.navigate('Signup');
              onDismiss();
            },
          },
          {
            text: 'Cancelar',
            onPress: () => {
              console.log('Cancel Pressed');
              onDismiss();
            },
            style: 'cancel',
          },
        ],
      );
    }
  }, [showAlert, onDismiss]);

  return null;
};

export default LoginAlert;
