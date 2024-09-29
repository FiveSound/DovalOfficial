import { StyleSheet } from "react-native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";

const styles = StyleSheet.create({
    flexContainer: {
        paddingHorizontal: SIZES.gapLarge,
        width: SIZES.width,
        paddingVertical: SIZES.gapMedium,
    },
    touchableOpacity: {
        alignItems: 'flex-start',
        height: "auto",
        flexDirection: 'row',
        alignSelf: 'flex-start',
        gap: SIZES.gapLarge,
        width: SIZES.width,
    },
    typographyName: {
        width: SIZES.width / 1.2,
        ...FONTS.semi16
    },
    typographyDescription: {
        width: SIZES.width / 1.2,
        marginRight: SIZES.padding,
        ...FONTS.text14
    },
    priceContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: SIZES.width / 1.4,
    },
    addButton: {
        backgroundColor: 'transparent',
        paddingHorizontal: SIZES.gapLarge,
        paddingVertical: SIZES.gapSmall / 2,
        flexDirection: "row",
        alignItems: "center",
        gap: SIZES.gapSmall,
        borderWidth: SIZES.borderWidth,
        borderColor: COLORS.primaryDark700,
    },
    lineDivider: {
        height: SIZES.gapSmall,
        marginTop: SIZES.gapMedium,
        width: SIZES.width,
        alignSelf: 'center'
    },
    textContainer: {
        gap: SIZES.gapSmall,
    },
    flexContainers: {
        justifyContent: "space-between",
        alignItems: 'flex-start'
    },
    typographyAdd: {
        ...FONTS.semi14,
        color: COLORS.primary
    }
});

export default styles;