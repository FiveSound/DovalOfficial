import { memo, useState } from "react";
import { useTheme } from "../../../../hooks";
import { useCart } from "../../../../context/CartContext";
import FlexContainer from "../../FlexContainer";
import { FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import Typography from "../../Typography";
import { ShoppingBagAddIcon } from "../../../../constants/IconsPro";
import LineDivider from "../../LineDivider";
import Cover from "../../Avatars/Cover";
import { CLOUDFRONT } from "../../../../services";
import styles from "./styles";
import { TouchableOpacity, useNavigation, View } from "../../../native";
import { IsLoading } from "../../Loaders";

interface Row {
    name: string;
    description: string;
    cover: string;
    price: string;
    id: number;
    businessID: number;
}

type props = {
    row: Row
};

const CardMenu = (props: props) => {
    const { row } = props;
    const [expand, setExpand] = useState(false)
    const navigation = useNavigation()
    const { color } = useTheme();
    const handleProduct = () => {
        navigation.navigate("AddProducts", { recipeID: row.id })
      }
    

    return (
        <FlexContainer newStyle={styles.flexContainer}>
            <TouchableOpacity
                onPress={() => setExpand(!expand)}
                style={styles.touchableOpacity}
            >
                <View>
                    <Typography
                        variant='subtitle'
                        numberOfLines={expand ? undefined : 1}
                        newStyle={styles.typographyName}
                    >
                        {row.name}
                    </Typography>
                    <Typography
                        numberOfLines={expand ? undefined : 3}
                        variant='SubDescription'
                        newStyle={styles.typographyDescription}
                    >
                        {row.description}
                    </Typography>
                </View>
                <Cover source={`${CLOUDFRONT}${row.cover}`} />
            </TouchableOpacity>
            <FlexContainer>
                <Typography variant='subtitle' newStyle={{ color: color, ...FONTS.heading24 , maxWidth: SIZES.width / 2.5}}>
                    {row.price}
                </Typography>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleProduct}
                >
    
                        <ShoppingBagAddIcon
                            width={SIZES.icons * 1.2}
                            height={SIZES.icons * 1.2}
                            color={color}
                        />
                </TouchableOpacity>
            </FlexContainer>
            <LineDivider lineStyle={styles.lineDivider} />
        </FlexContainer>
    );
};

export default memo(CardMenu);