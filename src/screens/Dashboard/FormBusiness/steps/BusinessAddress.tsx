import React, { useState } from 'react';
import { Input } from '../components';
import { FlexContainer, Hero, MapSelector } from '../../../../components/custom';
import { useQuery } from '@tanstack/react-query';
import { searchLocationsService } from '../../../../services/orders';
import { View, Button, StyleSheet } from 'react-native';
import { responsiveFontSize } from '../../../../constants/theme';

const BusinessAddress = ({control}: any) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);

  const handleLocationSelected = (location: any) => {
    setShowMap(true);
    setLocation(location);
  };

  return (
    <FlexContainer>
      <Hero label='Business Address' sublabel='Por favor, completa la siguiente información para finalizar el proceso.' />
      <View style={styles.buttonContainer}>
        <Button title="Seleccionar en el Mapa" onPress={() => setShowMap(true)} />
   
      </View>

      {showMap && (
        <MapSelector onLocationSelected={handleLocationSelected} />
      )}

     {location !== null &&
     <>
      <Input
        control={control}
        name='address'
        placeholder={location?.street || 'Address'}
        required
        validationRules={{
          pattern: {
            value: /^.{5,}$/,
            message: 'La dirección debe tener al menos 5 caracteres',
          },
        }}
      />
      <Input
        control={control}
        name='street'
        placeholder={location?.street || 'Street'}
        required
      />
      <Input
        control={control}
        name='city'
        placeholder={location?.city || 'City'}
        required
      />
      <Input
        control={control}
        name='state'
        placeholder={location?.state || 'State'}
        required
      />
      <Input
        control={control}
        name='zip'
        placeholder={location?.zip || 'Zip'}
        required
        keyboardType='numeric'
        validationRules={{
          pattern: {
            value: /^\d{5}(-\d{4})?$/,
            message: 'Ingrese un código postal válido',
          },
        }}
      />
      </>
     }

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