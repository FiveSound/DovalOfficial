import { memo, useState } from "react";
import { useTheme } from "../../../../hooks";
import FlexContainer from "../../FlexContainer";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import Typography from "../../Typography";
import { ShoppingBasketAdd03Icon } from "../../../../constants/IconsPro";
import LineDivider from "../../LineDivider";
import Cover from "../../Avatars/Cover";
import { CLOUDFRONT } from "../../../../services";
import styles from "./styles";
import { TouchableOpacity, useNavigation, View } from "../../../native";
import i18next from "../../../../Translate";

interface Row {
    name: string;
    description: string;
    thumbnail: string;
    price: string;
    id: number;
    businessID: number;
    cover: string;
    ordenable: boolean;
}

type props = {
    row: Row
};

const CardMenu = (props: props) => {
    const { row } = props;
    const navigation = useNavigation()
    const { color } = useTheme();
    const handleProduct = () => { if (row.id) { navigation.navigate("AddProducts", { recipeID: row.id }) } }

    if (row) {
        const { price, name, description, thumbnail, cover, ordenable } = row
        const covers = thumbnail !== "" ? `${CLOUDFRONT}${thumbnail}` : cover[0]

        return (
            <FlexContainer newStyle={styles.flexContainer}>
                <FlexContainer
                    newStyle={styles.touchableOpacity}
                >
                    <Cover source={covers} size='medium' />
                    <View style={styles.textContainer}>
                        <Typography
                            variant='subtitle'
                            numberOfLines={3}
                            newStyle={styles.typographyName}
                        >
                            {name}
                        </Typography>
                        <Typography
                            numberOfLines={3}
                            variant='SubDescription'
                            newStyle={styles.typographyDescription}
                        >
                            {description}
                        </Typography>
                        <FlexContainer newStyle={styles.priceContainer}>
                            <Typography variant='subtitle' newStyle={{ color: color, ...FONTS.heading18 }}>
                                {price}
                            </Typography>
                            {ordenable && <TouchableOpacity
                                style={styles.addButton}
                                onPress={handleProduct}
                            >
                                <Typography variant='H4title' newStyle={styles.typographyAdd}> {i18next.t("Add to cart")} </Typography>
                                <ShoppingBasketAdd03Icon
                                    width={SIZES.icons}
                                    height={SIZES.icons}
                                    color={COLORS.primary}
                                />
                            </TouchableOpacity>}
                        </FlexContainer>
                    </View>
                </FlexContainer>
                <LineDivider lineStyle={styles.lineDivider} />
            </FlexContainer>
        );
    }
};

export default memo(CardMenu);