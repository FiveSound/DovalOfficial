import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";

const styles = StyleSheet.create({
    labelThank: {
        ...FONTS.heading32,
        color: COLORS.success
    },
    label: {
        ...FONTS.heading32,
    },
    description: {
        ...FONTS.text16,
    },
})

export default styles