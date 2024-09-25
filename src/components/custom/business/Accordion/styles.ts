import { StyleSheet } from "react-native";
import { FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: SIZES.width,
      minHeight: responsiveFontSize(40),
      maxHeight: "auto",
      borderRadius: SIZES.margin / 2,
      alignItems: "center",
      justifyContent: "space-between",
      padding: SIZES.margin / 2,
      marginVertical: SIZES.margin / 4,
      paddingHorizontal: SIZES.gapLarge
    },
    header: {
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
      width: SIZES.width,
      paddingHorizontal: SIZES.margin,
      marginVertical: SIZES.margin / 4,
    },
    subheader: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: SIZES.gapMedium,
    },
    business: {
    ...FONTS.heading18
    },
    arrow: {
      transform: "rotate(180deg)",
      width: SIZES.icons,
      height: SIZES.icons,
      tintColor: "#FFF",
    },
    arrowUp: {
      width: SIZES.icons,
      height: SIZES.icons,
      tintColor: "#FFF",
    },
    dropdown: {
      width: "100%",
      paddingTop: 5,
      paddingBottom: 5,
      borderRadius: SIZES.radius,
      marginTop: SIZES.radius,
      backgroundColor: "transparent",
    },
  });

  export default styles