import React, { useEffect } from "react";
import { StyleSheet, View, useColorScheme, useWindowDimensions } from "react-native";
import { Skeleton } from "moti/skeleton";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  runOnJS,
  SlideInDown,
} from "react-native-reanimated";
import { useTheme } from "./src/hooks";
import { iconsNative } from "./src/constants";
import { useSplashLoading } from "./src/context/SplashLoadingContext";

export default function Splash() {
  const { BackgroundMain } = useTheme();
  const theme = useColorScheme();
  const logoScale = useSharedValue(1);
  const logoPositionY = useSharedValue(0);
  const contentDisplay = useSharedValue(0);

  const dimensions = useWindowDimensions();
  const { setSplashLoading } = useSplashLoading(); 

  const logoAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      { scale: logoScale.value },
      { translateY: logoPositionY.value },
    ],
  }));

  const contentAnimatedStyles = useAnimatedStyle(() => ({
    display: contentDisplay.value === 1 ? "flex" : "none",
  }));

  function logoAnimation() {
    try {
      logoScale.value = withSequence(
        withTiming(0.7, { duration: 300 }),
        withTiming(1.3, { duration: 300 }),
        withTiming(1, { duration: 300 }, (finished) => {
          if (finished) {
            logoPositionY.value = withSequence(
              withTiming(50, { duration: 300 }),
              withTiming(-dimensions.height, { duration: 400 }, () => {
                contentDisplay.value = withTiming(1, { duration: 300 }, (finishedContent) => {
                  if (finishedContent) {
                    runOnJS(handleSplashEnd)();
                  }
                });
              })
            );
          }
        })
      );
    } catch (error) {
      console.error("Splash: Error durante la animación del logo:", error);
      runOnJS(handleSplashEnd)();
    }
  }

  function handleSplashEnd() {
    setSplashLoading(false);
  }

  function filters() {
    return Array.from({ length: 10 }).map((_, index) => (
      <Skeleton
        key={index}
        width={60}
        height={26}
        radius={6}
        colors={["#222", "#333", "#222"]}
      />
    ));
  }

  function boxes(column: "right" | "left") {
    const rest = column === "left" ? 0 : 1;

    return Array.from({ length: 20 })
      .filter((_, index) => index % 2 === rest)
      .map((_, index) => {
        const height = index % 2 === (column === "left" ? 0 : 1) ? 200 : 300;

        return (
          <Animated.View key={index} style={[styles.box, { height }]}>
            <Skeleton colors={["#222", "#333", "#222"]} width="100%" height={height} />
          </Animated.View>
        );
      });
  }

  useEffect(() => {
    logoAnimation();

    // Timeout de respaldo para asegurar que la splash screen se oculte después de 5 segundos
    const fallbackTimeout = setTimeout(() => {
      console.warn("Splash: Timeout de animación alcanzado. Ocultando splash.");
      handleSplashEnd();
    }, 5000); // 5 segundos de respaldo

    return () => {
      clearTimeout(fallbackTimeout);
    };
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: BackgroundMain }]}>
      <Animated.Image
        source={iconsNative.logo}
        style={[styles.logo, logoAnimatedStyles]}
      />

      <Animated.View
        style={[styles.content, contentAnimatedStyles]}
        entering={SlideInDown.duration(700)}
      >
        <View style={styles.header}>{filters()}</View>

        <View style={styles.boxes}>
          <View style={styles.column}>{boxes("left")}</View>
          <View style={styles.column}>{boxes("right")}</View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  logo: {
    width: 64,
    height: 64,
  },
  header: {
    width: "100%",
    flexDirection: "row",
    gap: 16,
    paddingBottom: 12,
  },
  boxes: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    gap: 12,
  },
  box: {
    width: "100%",
    borderRadius: 16,
    backgroundColor: '#222',
  },
  column: {
    flex: 1,
    gap: 12,
  },
  content: {
    flex: 1,
    width: "100%",
  }, 
});