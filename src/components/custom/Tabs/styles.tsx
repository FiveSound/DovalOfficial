import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    tabHeaders: {
      flexDirection: 'row',
      // borderBottomWidth: 1,
      position: 'relative',
      borderColor: COLORS.Description
    },
    tabHeader: {
      padding: SIZES.gapMedium,
      flex: 1,
      alignItems: 'center',
    },
    activeTabIndicator: {
      position: 'absolute',
      bottom: 0,
      height: SIZES.borderWidth * 2,
      backgroundColor: COLORS.primary,
    },
    tabTitle: {
     ...FONTS.medium16,
     color: COLORS.Description
    },
    activeTabTitle: {
      color: COLORS.primary,
    },
    tabContent: {
      flex: 1,
    },
  });

export default styles