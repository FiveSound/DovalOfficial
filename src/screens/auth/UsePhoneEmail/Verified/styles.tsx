import { COLORS, SIZES } from "../../../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      gap: SIZES.gapLarge,
    },
    IsLoading: {
      borderColor: COLORS.primary,
      marginTop: SIZES.gapLarge,
    },
    resendButton: {
      color: COLORS.primary,
      textDecorationLine: "underline",
    },
    text: {
      color: COLORS.primary,
    },
    buttons: {
      alignItems: "center",
      gap: SIZES.gapLarge,
    },
  });

export default styles