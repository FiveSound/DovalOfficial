import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";
import { Platform } from "../../components/native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: SIZES.width,
        paddingHorizontal: Platform.OS === 'ios' ? SIZES.gapLarge : 0
    },
    flexContainer: {
    },
    scrollContainer: {
        alignItems: 'center',
        flexGrow: 1,
    }
})

export default styles