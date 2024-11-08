import React, { useEffect } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
  Easing,
} from "react-native-reanimated";
import Card from "./Card";

interface MasonryItemProps {
  pin: any;
  showInf: boolean;
  delay: number;
  isFocused: boolean;
}

const MasonryItem: React.FC<MasonryItemProps> = ({ pin, showInf, delay, isFocused }) => {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);
  const scale = useSharedValue(0.8);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(opacity.value, {
      duration: 50,
      easing: Easing.out(Easing.ease),
    }),
    transform: [
      {
        translateY: withTiming(translateY.value, {
          duration: 50,
          easing: Easing.out(Easing.ease),
        }),
      },
      {
        scale: withTiming(scale.value, {
          duration: 50,
          easing: Easing.out(Easing.ease),
        }),
      },
    ],
  }));

  useEffect(() => {
    opacity.value = withDelay(delay, withTiming(1, { duration: 50 }));
    translateY.value = withDelay(delay, withTiming(0, { duration: 50 }));
    scale.value = withDelay(delay, withTiming(1, { duration: 50 }));
  }, [delay]);

  return (
    <Animated.View style={animatedStyle}>
        <Card pin={pin} key={pin.id} showInf={showInf} isFocused={isFocused} />
    </Animated.View>
  );
};

export default React.memo(MasonryItem);
