import React from 'react';
import { StyleSheet, Animated, ViewStyle, TextStyle } from 'react-native';
import { View, Text } from '../../native';
import { COLORS, FONTS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { Easing } from 'react-native-reanimated';

type Props = {
  label: string;
  showLabel: boolean;
  position: 'left' | 'center' | 'right';
  orientation: 'top' | 'bottom';
  ShowAlert: boolean;
  container?: ViewStyle;
  labelstyle?: TextStyle;
  styleTriangule?: ViewStyle;
};

const Hint = ({ label, showLabel, position, orientation, ShowAlert = false, container, labelstyle, styleTriangule}: Props) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (ShowAlert) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.in(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  }, [ShowAlert]);

  const getPositionStyle = () => {
    switch (position) {
      case 'left':
        return styles.left;
      case 'center':
        return styles.center;
      case 'right':
        return styles.right;
      default:
        return {};
    }
  };

  const getOrientationStyle = () => {
    switch (orientation) {
      case 'top':
        return styles.top;
      case 'bottom':
        return styles.bottom;
      default:
        return {};
    }
  };

  const getTriangleStyle = () => {
    switch (orientation) {
      case 'top':
        return styles.triangleTop;
      case 'bottom':
        return styles.triangleBottom;
      default:
        return {};
    }
  };

  return (
    <Animated.View style={[ ,styles.hintContainer, getPositionStyle(), getOrientationStyle(), { opacity: fadeAnim, ...container }]}>
      <View style={[styles.triangle, getTriangleStyle(), {...styleTriangule}]} />
      {showLabel && <Text style={[styles.label,{...labelstyle}]}>{label}</Text>}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  hintContainer: {
    padding: SIZES.gapMedium,
    borderRadius: SIZES.radius * 2,
    backgroundColor: 'black',
    position: 'absolute',
    zIndex: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  triangle: {
    width: 0,
    height: 0,
    borderStyle: 'solid',
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  triangleTop: {
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderBottomWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    top: -10,
  },
  triangleBottom: {
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderTopWidth: 10,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'black',
    bottom: -10,
  },
  label: {
    color: 'white',
    textAlign: 'center',
    ...FONTS.semi12,
    width: SIZES.width / 3,
  },
  left: {
    left: 0,
  },
  center: {
    left: '50%',
    transform: [{ translateX: '-50%' }],
  },
  right: {
    right: 0,
  },
  top: {
    top: 0,
  },
  bottom: {
    bottom: -responsiveFontSize(24),
  },
});

export default Hint;