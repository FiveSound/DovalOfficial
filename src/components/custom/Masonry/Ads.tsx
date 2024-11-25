import { View, StyleSheet } from "react-native";
import { COLORS, responsiveFontSize, SIZES } from "../../../constants/theme";
import Typography from "../Typography";
import { ArrowUpRight03Icon, Store01IconStroke } from "../../../constants/IconsPro";
import { TouchableOpacity, useNavigation } from "../../native";
import { useCallback } from "react";

type Props = {
    background: string;
    label: string;
}

const Ads = (props: Props) => {
    const { background, label } = props;
    const navigation = useNavigation();

    const handlePress = useCallback(() => {
            navigation.navigate('SearchBusiness');
    }, [navigation]);

    return (
        <TouchableOpacity onPress={handlePress} style={[styles.container, { backgroundColor: background }]}>
            <View style={styles.iconContainer}>
                <ArrowUpRight03Icon 
                color={COLORS.dark} 
                width={SIZES.icons}
                height={SIZES.icons}
                />
            </View>
            <View style={styles.textContainer}>
                <Typography variant='subtitle' newStyle={styles.text}>{label}</Typography>
            </View>
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    container: {
        width: "98%",
        height: responsiveFontSize(110),
        borderRadius: SIZES.radius * 2,
        padding: SIZES.gapSmall,
        justifyContent: 'space-between',
    },
    iconContainer: {
        alignItems: 'flex-end',
    },
    textContainer: {
        alignItems: 'center',
    },
    text: {
        color: COLORS.dark,
    }
});

export default Ads;
