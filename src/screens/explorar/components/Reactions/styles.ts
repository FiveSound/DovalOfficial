import { StyleSheet } from "react-native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        width: responsiveFontSize(44 ),
        height: responsiveFontSize(44),
        alignItems: 'center'
    }, 
    label: {
        ...FONTS.semi14,
        color: COLORS.TranspLight
    },
    colorIcons: {
        color: COLORS.TranspLight
    },
    containerHint: {
        backgroundColor: COLORS.TranspDark,
        position: 'absolute',
        top: responsiveFontSize(100),
        width: SIZES.width / 1.2,
        paddingHorizontal: SIZES.gapLarge * 2,
        left: SIZES.width / 12,
        height: SIZES.BtnHeight
      },
      bordertriangue: {
        borderBottomColor: 'transparent'
      },
      labelHint: {
        width: SIZES.width / 1.2
      },
      containerButtons: {
        width: SIZES.width / 1.4,
      }
})

export default styles