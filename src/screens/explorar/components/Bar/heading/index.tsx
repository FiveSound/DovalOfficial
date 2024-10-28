import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import SearchHome from './SearchHome';
import { SafeAreaView } from '../../../../../components/native';
import ButtonUpload from './ButtonUpload';
import { FlexContainer, Typography } from '../../../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../../../constants/theme';
import Shoppings from './Shoppings';
import ButtonAlert from './ButtonAlert';
import i18next from '../../../../../Translate';

type Props = {
  isFocused: boolean;
};

const Heading = (props: Props) => {
  const { isFocused } = props;
  const cartItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

  return (
    <FlexContainer newStyle={styles.container}>
      <SearchHome />
      <Typography variant="H4title" newStyle={styles.title}>
        {i18next.t('Recipes for you')}
      </Typography>
      <FlexContainer newStyle={styles.subContainer}>
        <Shoppings cartItems={cartItems} isFocused={isFocused} />
        <ButtonAlert />
        <ButtonUpload />
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    width: SIZES.width,
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: SIZES.width,
    position: 'absolute',
    top: SIZES.BtnHeight * 1.24,
    zIndex: 12,
    paddingHorizontal: SIZES.gapLarge,
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.gapLarge,
  },
  title: {
    ...FONTS.semi16,
    color: COLORS.TitleColor,
  },
});
export default memo(Heading);
