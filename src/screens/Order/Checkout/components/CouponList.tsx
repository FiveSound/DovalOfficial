import { StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '../../../../components/native';
import {
  Box,
  ButtonAcces,
  FlexContainer,
  Icons,
  LineDivider,
  MiniCard,
  Typography,
} from '../../../../components/custom';
import { COLORS, SIZES } from '../../../../constants/theme';
import i18next from '../../../../Translate';
import { CheckmarkCircle01Icon } from '../../../../constants/IconsPro';

interface Props {
  id: number | null;
}

const CouponList = (props: Props) => {
  const navigation = useNavigation();
  const hat = '#### #### #### ####';
  const handleChange = () => {
    navigation.navigate('Coupons');
  };

  return (
    <Box
      title={i18next.t('Coupons')}
      variant={props.id !== null ? true : false}
    >

      {/* {props.id !== null && ( */}
        <FlexContainer newStyle={[styles.container, props.id !== null && styles.containerSuccess]}>
          <FlexContainer newStyle={[styles.header, props.id !== null && styles.containerSuccess]}>
            <Typography variant="H4title">
              {!props.id
                ? i18next.t('Select Coupons')
                : <FlexContainer variant='row' newStyle={styles.containerSuccessIcons}>
                  <CheckmarkCircle01Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.success}/>
                  <Typography variant="H4title">{i18next.t('Applied coupon')}</Typography>
                  </FlexContainer>}
            </Typography>
            <Icons
              onPress={handleChange}
              styles={{
                borderRadius: SIZES.radius,
              }}
              appendIcons={
                <Typography variant="H4title">{i18next.t('Change')}</Typography>
              }
            />
          </FlexContainer>    
        </FlexContainer>
      {/* )} */}
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SIZES.gapMedium,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  containerSuccess: {
  },
  containerSuccessIcons: {
    gap: SIZES.gapSmall,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CouponList;
