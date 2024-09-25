import { StyleSheet } from "react-native";
import { FONTS, responsiveFontSize, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: SIZES.width,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerOptions: {
        flexDirection: 'row',
        marginTop: SIZES.gapLarge,
        width: SIZES.width,
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    containerIcons: {
        width: responsiveFontSize(58),
        height: responsiveFontSize(58),
        borderRadius: SIZES.radiusExtra * 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    containerOptionsIcons: {
        gap: SIZES.gapLarge,
        alignItems: 'center',
        marginLeft: SIZES.gapMedium,

    },
    containerOptionsIconsSocial: {
        alignItems: 'center'

    },
    title: {
        marginBottom: SIZES.gapLarge,
        textAlign: 'center',
        ...FONTS.semi16,
    
    },
    line: {
        marginVertical: SIZES.gapMedium
    },
    image: {
        width: responsiveFontSize(50),
        height: responsiveFontSize(50),
    }
})

export default styles;