import { StyleSheet } from "react-native";
import { SIZES } from "../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: SIZES.width,
        paddingHorizontal: SIZES.gapLarge
    },
    flexContainer: {
    },
    scrollContainer: {
        alignItems: 'center',
        flexGrow: 1,
    }
})

export default styles