import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import SearchHome from './SearchHome';
import ButtonUpload from './ButtonUpload';
import { FlexContainer, Typography } from '../../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import Shoppings from './Shoppings';
import ButtonAlert from './ButtonAlert';
import i18next from '../../../../Translate';
import { useTheme } from '../../../../hooks';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';
import { SafeAreaView } from '../../../../components/native';

type Props = {};

const FeedHeading = (props: Props) => {
  const { isAuthenticated, businessVerified, isLoadingApp } = useAppSelector((state: RootState) => state.auth);
  const { Title} = useTheme()

  return (
    <FlexContainer newStyle={styles.container}>
      <SearchHome />
      <Typography variant="H4title" newStyle={styles.title}>
        {i18next.t('Doval for you')}
      </Typography>
      <FlexContainer newStyle={styles.subContainer}>
        <Shoppings />
        <ButtonAlert />
        {!isLoadingApp && isAuthenticated && businessVerified && <ButtonUpload />}
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
    // position: 'absolute',
    // top: SIZES.BtnHeight * 1.24,
    zIndex: 12,
    paddingVertical: SIZES.gapLarge,
    paddingHorizontal: SIZES.gapLarge,
  },
  subContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    gap: SIZES.gapLarge,
  },
  title: {
    ...FONTS.semi18,
  },
});
export default memo(FeedHeading);
