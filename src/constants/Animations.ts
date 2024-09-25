import Animated, { Easing, withTiming, SharedValue } from 'react-native-reanimated' 

export const fadeIn = (fadeAnim: SharedValue<number>, duration: number = 500) => {
    fadeAnim.value = withTiming(1, {
        duration,
        easing: Easing.inOut(Easing.ease),
    });
};

export const slideInFromBottom = (slideAnim: SharedValue<number>, duration: number = 500) => {
    slideAnim.value = withTiming(0, {
        duration,
        easing: Easing.inOut(Easing.ease),
    });
};