import { StyleSheet } from "react-native";
import { responsiveFontSize, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: SIZES.gapLarge * 2,
      alignItems: 'center'
    },
    scrollViewContent: {
      flexGrow: 1,
      alignItems: 'center'
    },
    optionContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: responsiveFontSize(10),
      paddingHorizontal: SIZES.gapLarge * 1.4,
      width: SIZES.width
    },
    label: {
      width: SIZES.width / 1.2
    },
    footer: {
      height: responsiveFontSize(94),
      alignItems: 'center',
      justifyContent: 'center'
    }
  });

export default styles