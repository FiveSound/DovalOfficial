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
import Typography from "../../Typography";
import { CLOUDFRONT } from "../../../../services";
import InfoCard from "../InfoCard";
import Avatars from "../../Avatars";

interface Product {
  name: string;
  description: string;
  thumbnail: string;
  userID: string;
  business_name: string;
  cover: string;
}

type Props = {
  product: Product;
}

const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  const navigation = useNavigation()
  const coverRecipie = `${CLOUDFRONT}${product.thumbnail}`
  const coverBusiness = `${CLOUDFRONT}${product.cover}`

  return (
    <FlexContainer newStyle={styles.container}>
      <Image
        placeholderSource={coverRecipie}
        showPlaceholder={true}
        style={styles.image}
        contentFit='cover'
        priority="high"
        cachePolicy="memory-disk"
      />
      <InfoCard 
      title={product?.business_name || 'business name'}
      description='Business verificad'
      showArrow={true}
      showLineDivider={true}
      containerStyle={styles.containerInfoCard}
      orientation='LEGHT'
      icon={< Avatars source={coverBusiness} size='medium' />}
      onPress={() => navigation.navigate('Business', { id: product.userID })}
      lineStyle={styles.lineDivider}
      />
      <FlexContainer newStyle={styles.containerheaders}>
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
      </FlexContainer>
    </FlexContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.gapMedium,
    alignSelf: 'center',
    paddingHorizontal: SIZES.gapLarge,
    gap: SIZES.gapLarge
  },
  containerheader: {
    maxWidth: SIZES.width / 1.4,

  },
  containerheaders: {
    paddingHorizontal: SIZES.gapLarge
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 3.5,
  },
  name: {
    ...FONTS.semi18,
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
  },
  containerInfoCard: {
    margin: 0,
    paddingHorizontal: SIZES.gapLarge,
  },
  lineDivider: {
    height: SIZES.gapSmall,
  }
});

export default ProductCard;