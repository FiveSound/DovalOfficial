import React, { useState } from 'react';
import { Input } from '../components';
import {
  FlexContainer,
  Hero,
  MapSelector,
} from '../../../../components/custom';
import { View, Button, StyleSheet } from 'react-native';
import { responsiveFontSize } from '../../../../constants/theme';
import i18next from '../../../../Translate';

const BusinessAddress = ({ control, setValue }: any) => {
  const [showMap, setShowMap] = useState<boolean>(false);

  return (
    <FlexContainer>
      <Hero
        label={i18next.t('Business Address')}
        sublabel={i18next.t(
          'Please fill in the following information to complete the process.',
        )}
      />
      <View style={styles.buttonContainer}>
        <Button
          title={i18next.t('Select on the Map')}
          onPress={() => setShowMap(true)}
        />
      </View>

      {showMap && <MapSelector setValue={setValue} />}

      {showMap && (
        <>
          <Input
            control={control}
            name="address"
            placeholder={i18next.t('Address')}
            required
            validationRules={{
              pattern: {
                value: /^.{5,}$/,
                message: i18next.t(
                  'The address must have at least 5 characters',
                ),
              },
            }}
          />
          <Input
            control={control}
            name="city"
            placeholder={i18next.t('City')}
            required
          />
          <Input
            control={control}
            name="state"
            placeholder={i18next.t('State')}
            required
          />
          <Input
            control={control}
            name="postal_code"
            placeholder={i18next.t('postal_code')}
            required
            keyboardType="numeric"
            validationRules={{
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: i18next.t('Enter a valid zip code'),
              },
            }}
          />
        </>
      )}
    </FlexContainer>
  );
};

export default BusinessAddress;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: responsiveFontSize(10),
    alignItems: 'center',
  },
});
