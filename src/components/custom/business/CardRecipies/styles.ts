import { StyleSheet } from "react-native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    flexContainer: {
        paddingHorizontal: SIZES.gapLarge,
        width: SIZES.width
    },
    touchableOpacity: {
        alignItems: "center",
        justifyContent: "space-between",
        height: "auto",
        paddingVertical: SIZES.padding,
        flexDirection: 'row',
    },
    typographyName: {
        width: SIZES.width / 1.6,
        ...FONTS.semi18
    },
    typographyDescription: {
        width: SIZES.width / 1.6,
        marginRight: SIZES.padding,
        ...FONTS.text16
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: SIZES.radius,
    },
    addButton: {
    },
    lineDivider: {
        height: responsiveFontSize(1),
    },
});

export default styles;