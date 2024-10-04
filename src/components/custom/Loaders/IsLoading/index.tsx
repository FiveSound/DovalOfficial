import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import { useTheme } from "../../../../hooks";
import { ActivityIndicator, Platform } from "../../../native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import Typography from "../../Typography";

type props = {
  label?: string;
  showLabel?: boolean;
  style?: ViewStyle;
  size?: "small" | "medium" | "large";
  color?: 'primary' | 'dark';
  sizesActivityIndicator?: 'small' | 'large';
};

const IsLoading = (props: props) => {
  const { label, showLabel = false, style, size = "medium", color = "primary", sizesActivityIndicator = 'large'} = props;
  const { Bg } = useTheme();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const getSizeStyle = () => {
    switch (size) {
      case "small":
        return styles.small;
      case "large":
        return styles.large;
      default:
        return styles.medium;
    }
  };

  const getColor = () => {
    switch (color) {
      case 'primary':
        return COLORS.primary;
      case 'dark':
        return COLORS.dark;
      default:
        return COLORS.primary;
    }
  };



  return (
    <View style={[styles.container]}>
      {Platform.OS === "android" ? (
        <ActivityIndicator size={sizesActivityIndicator} color={getColor()}/>
      ) : (
        <Animated.View
          style={[styles.circle, getSizeStyle(), animatedStyle, { ...style, borderColor: getColor() }]}
        />
      )}
      {showLabel && (
        <Typography variant="subtitle" newStyle={styles.label}>
          {label}
        </Typography>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // height: SIZES.BtnHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  circle: {
    borderWidth: responsiveFontSize(3),
    borderRadius: responsiveFontSize(15),
    borderTopColor: "transparent",
  },
  small: {
    width: responsiveFontSize(10),
    height: responsiveFontSize(10),
  },
  medium: {
    width: responsiveFontSize(20),
    height: responsiveFontSize(20),
  },
  large: {
    width: responsiveFontSize(30),
    height: responsiveFontSize(30),
  },
  label: {
    ...FONTS.semi14,
  },
});

export default IsLoading;
