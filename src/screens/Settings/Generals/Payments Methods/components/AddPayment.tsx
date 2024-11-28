import React from 'react';
import { StyleSheet } from 'react-native';
import {
  FlexContainer,
  Icons,
  Typography,
} from '../../../../../components/custom';
import { useTheme } from '../../../../../hooks';
import { responsiveFontSize, SIZES } from '../../../../../constants/theme';
import { PlusSignIcon } from '../../../../../constants/IconsPro';
import {
  TouchableOpacity,
  useNavigation,
  Image
} from '../../../../../components/native';
import { iconsNative } from '../../../../../constants';
import i18next from '../../../../../Translate';

const AddPayment = () => {
  const { backgroundMaingrey, borderInput, Title, BackgroundMain } = useTheme();
  const navigation = useNavigation();
  const handleAddCard = () => {
    navigation.navigate('AddCardGeneral');
  };
  return (
    <TouchableOpacity
      onPress={handleAddCard}
      style={[
        styles.addCardContainer,
        {
          backgroundColor: backgroundMaingrey,
        },
      ]}
    >
      <Icons
        onPress={handleAddCard}
        appendIcons={
          <PlusSignIcon
            color={BackgroundMain}
            width={SIZES.icons / 1.2}
            height={SIZES.icons / 1.2}
          />
        }
        styles={{
          backgroundColor: Title,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 200,
          width: responsiveFontSize(34),
          height: responsiveFontSize(34),
        }}
      />
      <Typography variant="subtitle" newStyle={{ textAlign: 'center' }}>
        {i18next.t('Add credit or debit card')}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  addCardContainer: {
    borderRadius: SIZES.radius,
    padding: SIZES.gapMedium,
    alignItems: 'center',
    width: '100%',
    height: SIZES.height / 6,
    justifyContent: 'center',
  },
});
export default AddPayment;
