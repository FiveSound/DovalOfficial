import React, { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Container } from '../../../components/custom';
import { SIZES } from '../../../constants/theme';
import { useNavigation } from '../../../components/native';
import LottieView from 'lottie-react-native';
import { successLoader } from '@/src/constants/Animations';

interface Props {
  route: {
    params: { orderID: number };
  };
}

const ConfirmOrder = ({ route }: Props) => {
  const orderID = route.params.orderID;
  const animation = useRef<LottieView>(null);
  const navigation = useNavigation();

  const triggerSuccessAnimation = () => {
      setTimeout(() => {
        navigation.reset ({
          index: 0,
          routes: [{name: 'Tracking', params: {orderID: orderID}}]
        }
        );
      }, 2000);
  };

  useEffect(() => {
    triggerSuccessAnimation();
  }, []);

  return (
    <Container style={styles.container}>
      <LottieView
        autoPlay
        loop={false}
        ref={animation}
        style={styles.lottie}
        source={successLoader}
      />
    </Container>
  );
};

export default ConfirmOrder;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  wave: {
    position: 'absolute',
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'rgba(76, 175, 80, 0.7)',
  },
  lottie: {
    width: SIZES.width / 2.5,
    height: SIZES.width / 2.5,
  },
});