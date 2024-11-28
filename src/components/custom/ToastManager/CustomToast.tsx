import { COLORS, responsiveFontSize, SIZES } from '@/src/constants/theme';
import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Dimensions, PanResponder, Easing } from 'react-native';
import { TouchableOpacity, Text } from '../../native';
import Typography from '../Typography';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

type ToastType = 'success' | 'error' | 'info';

type ToastMessage = {
  id: number;
  type: ToastType;
  message: string;
  duration: number;
};

type ToastProps = {
  toast: ToastMessage;
  onHide: () => void;
};

const CustomToast: React.FC<ToastProps> = ({ toast, onHide }) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease),
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Barra de progreso
    Animated.timing(progress, {
      toValue: 1,
      duration: toast.duration,
      useNativeDriver: false,
    }).start();

    // Timer para ocultar el toast
    const timer = setTimeout(() => {
      hideToast();
    }, toast.duration);

    return () => clearTimeout(timer);
  }, [translateY, opacity, progress, toast.duration]);

  const hideToast = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 100,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(onHide);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy < -5) { 
          translateY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -30) { 
          hideToast();
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
            friction: 5,
          }).start();
        }
      },
    })
  ).current;

  return (
    <Animated.View
      style={[
        styles.toast,
        styles[toast.type],
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
      {...panResponder.panHandlers}
      accessible={true}
      accessibilityLabel={`${toast.type} toast: ${toast.message}`}
      accessibilityRole="alert"
    >
      <TouchableOpacity
        onPress={hideToast}
        activeOpacity={0.9}
        style={styles.touchable}
        accessibilityLabel="Cerrar notificación"
        accessibilityRole="button"
      >
        <Typography newStyle={styles.message} variant='H4title'>{toast.message}</Typography>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={hideToast}
        style={styles.closeButton}
        accessibilityLabel="Cerrar notificación"
        accessibilityRole="button"
      >
        <Ionicons name="close" size={20} color={COLORS.dark} />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: responsiveFontSize(50),
    alignSelf: 'center',
    minWidth: width * 0.8,
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    marginVertical: SIZES.gapSmall,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    zIndex: 1000,
  },
  success: {
    backgroundColor: '#4ADE80',
  },
  error: {
    backgroundColor: '#F41F52',
  },
  info: {
    backgroundColor: COLORS.support4,
  },
  message: {
    color: COLORS.dark,
  },
  progressBar: {
    height: SIZES.gapSmall,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: SIZES.radius,
    marginTop: SIZES.gapSmall,
  },
  touchable: {
    flex: 1,
  },
  closeButton: {
    position: 'absolute',
    top: responsiveFontSize(10),
    right: responsiveFontSize(10),
    padding: SIZES.gapSmall,
  },
});

export default CustomToast;