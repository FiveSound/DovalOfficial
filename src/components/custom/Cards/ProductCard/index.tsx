import React from "react";
import { StyleSheet } from "react-native";
import { Text, Image, useNavigation } from "../../../native";
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from "../../../../constants/theme";
import FlexContainer from "../../FlexContainer";
import { useTheme } from "../../../../hooks";
import Typography from "../../Typography";
import { Clock01Icon, ShoppingBag01Icon, Store01Icon } from "../../../../constants/IconsPro";
import Icons from "../../Icons";
import i18next from "../../../../Translate";

interface Product {
  name: string;
  description: string;
  thumbnail: string;
  userID: string;
}

type Props = {
  product: Product;
}

const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  const { Title } = useTheme();
  const navigation = useNavigation()

  return (
    <FlexContainer newStyle={styles.container}>
      <FlexContainer>
        <FlexContainer newStyle={styles.containerheader}>
          <Typography variant="subtitle" newStyle={styles.name}>
            {product?.name || ''}
          </Typography>
          <Typography
            numberOfLines={3}
            variant="SubDescription"
            newStyle={styles.description}
          >
            {product?.description || ''}
          </Typography>
        </FlexContainer>
        <FlexContainer>
          <Icons
            styles={styles.buttonscontainer}
            onPress={() => navigation.navigate('Business', { id: product.userID})}
            appendIcons={
              <FlexContainer variant="row" newStyle={{
                gap: SIZES.gapSmall,
                alignItems: 'center'
              }}>
                <ShoppingBag01Icon
                  color={COLORS.dark}
                  width={SIZES.icons}
                  height={SIZES.icons}
                />
                <Typography variant='H4title' newStyle={styles.deliveryTime}>{i18next.t('Visit Store')}</Typography>
              </FlexContainer>
            }
          />

        </FlexContainer>
      </FlexContainer>
      <Image
        source={{ uri: product?.thumbnail || '' }}
        style={styles.image}
        contentFit='cover'
        priority="high"
        cachePolicy="memory-disk"
      />
    </FlexContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: 'space-between'
  },
  containerheader: {
    maxWidth: SIZES.width / 1.4
  },
  image: {
    width: responsiveFontSize(110),
    height: responsiveFontSize(98),
    borderRadius: SIZES.radius,
  },
  name: {
    ...FONTS.heading21,
    width: SIZES.width / 1.8,
  },
  description: {
    width: SIZES.width / 1.8,
    ...FONTS.text16, 
    marginBottom: SIZES.gapSmall
  },
  deliveryTime: {
    color: COLORS.dark,
  },
  freeShipping: {
    ...FONTS.body4,
    color: COLORS.success,
  },
  buttonscontainer: {
    backgroundColor: COLORS.primary,
    width: responsiveFontSize(120),
    borderRadius: SIZES.radius2 / 2,
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonscontainerOthers: {
    borderRadius: SIZES.radius,
    height: responsiveFontSize(34),
    borderWidth: 0,
    width: responsiveFontSize(120),
    backgroundColor: 'transparent'
  }
});

export default ProductCard;