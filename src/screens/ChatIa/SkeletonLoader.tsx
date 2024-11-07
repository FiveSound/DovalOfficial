import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import useTheme from '../../hooks/useTheme';
import { SIZES, responsiveFontSize } from '../../constants/theme';
import { scale } from 'react-native-size-matters';

const SkeletonLoader = () => {
  const animatedWidth = useRef(new Animated.Value(0)).current;
  const { color, bgInput } = useTheme();
  const [displayText, setDisplayText] = useState('');

  const textToDisplay = 'Escribiendo...'; 

  useEffect(() => {
    let animation = Animated.loop(
      Animated.sequence([
        Animated.timing(animatedWidth, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: false,
        }),
        Animated.timing(animatedWidth, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: false,
        }),
      ])
    );

    animation.start();

    let index = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prev) => textToDisplay.slice(0, index));
      index++;
      if (index > textToDisplay.length) {
        index = 0;
      }
    }, 200);

    return () => {
      animation.stop();
      clearInterval(intervalId);
    };
  }, [animatedWidth, textToDisplay]);

  const width = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['20%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.skeleton,
          { width, backgroundColor: bgInput },
        ]}
      >
        <Text style={{
          color: color
        }}>{displayText}</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: responsiveFontSize(scale(10)),
  },
  skeleton: {
    height: responsiveFontSize(scale(14)),
    borderRadius: SIZES.radius,
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
});

export default SkeletonLoader;