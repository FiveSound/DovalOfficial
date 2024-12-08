import React from 'react';
import { StyleSheet } from 'react-native';
import useNavigation from '../../../native/useNavigation';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';
import { CLOUDFRONT } from '../../../../services';
import InfoCard from '../InfoCard';
import Avatars from '../../Avatars';
import CoverProducts from './CoverProducts';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';
import { VerifyIcons } from '../../../../constants/IconsPro';
import i18next from '../../../../Translate';

interface Cover {
  key: string;
}

interface Product {
  name: string;
  description: string;
  business_cover: string;
  userID: string;
  business_name: string;
  cover: Cover[];
}

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = React.memo(({ product }) => {
  const navigation = useNavigation();
  const coverBusiness = `${CLOUDFRONT}${product.business_cover}`;
  const { businessVerified } = useAppSelector((state: RootState) => state.auth);

  return (
    <FlexContainer newStyle={styles.container}>
      <CoverProducts row={product.cover} />
      <InfoCard
        title={product?.business_name || i18next.t('business name')}
        description={businessVerified ? i18next.t('This is a verified business') : ''}
        showArrow={true}
        showLineDivider={true}
        containerStyle={styles.containerInfoCard}
        orientation="LEGHT"
        icon={<Avatars source={coverBusiness} size="medium" />}
        onPress={() => navigation.navigate('Business', { id: product.userID })}
        lineStyle={styles.lineDivider}
        AppTitle={
          businessVerified ? (
            <VerifyIcons width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} />
          ) : null
        }
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
  },
  containerheader: {
    maxWidth: SIZES.width / 1.4,
  },
  containerheaders: {
    paddingHorizontal: SIZES.gapLarge,
  },
  name: {
    ...FONTS.semi18,
    width: SIZES.width / 1.08,
  },
  description: {
    width: SIZES.width / 1.1,
    ...FONTS.text14,
    marginBottom: SIZES.gapSmall,
  },
  containerInfoCard: {
    margin: 0,
    paddingHorizontal: SIZES.gapLarge,
  },
  lineDivider: {
    height: SIZES.gapMedium,
  },
});

export default ProductCard;
