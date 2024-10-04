import { StyleSheet, Pressable, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Front from "./Front";
import Back from "./Back";

type Props = {
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  validCVC: string;
};

const Card = (props: Props) => {
  const flipValue = useSharedValue(0);

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipValue.value,
      [0, 1],
      [0, 180],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity: interpolate(
        flipValue.value,
        [0, 0.5, 1],
        [1, 0, 0],
        Extrapolation.CLAMP
      ),
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(
      flipValue.value,
      [0, 1],
      [180, 360],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ perspective: 1000 }, { rotateY: `${rotateY}deg` }],
      opacity: interpolate(
        flipValue.value,
        [0, 0.5, 1],
        [0, 0, 1],
        Extrapolation.CLAMP
      ),
    };
  });

  const handleFlip = () => {
    flipValue.value = withTiming(flipValue.value === 0 ? 1 : 0, {
      duration: 800,
    });
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={handleFlip}>
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <LinearGradient
            style={styles.background}
            start={{ x: 0.1, y: -0.3 }}
            colors={["#000", "#000", "#1C1C1E"]}
          >
            <Front
              brand={props.brand}
              last4={props.last4}
              expiryMonth={props.expiryMonth}
              expiryYear={props.expiryYear}
            />
          </LinearGradient>
        </Animated.View>
        <Animated.View style={[backAnimatedStyle]}>
          <LinearGradient
            style={styles.background}
            start={{ x: 0.1, y: -0.3 }}
            colors={["#000", "#000", "#1C1C1E"]}
          >
            <Back validCVC={props.validCVC} />
          </LinearGradient>
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 30,
    width: "100%",
  },
  card: {
    position: "absolute",
    backfaceVisibility: "hidden",
  },
  background: {
    padding: 10,
    borderRadius: 15,
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});

export default Card;