import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import {  FlexContainer, Hero, Typography } from '../../../../components/custom';
import { Store01IconStroke } from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { TouchableOpacity } from '../../../../components/native';
import { Input, Select } from '../components';
import i18next from '../../../../Translate';

const BasicBusinessInformation = ({ control }: any) => {
  const { Title, backgroundMaingrey } = useTheme();
  const [taxIdentificationNumber, setTaxIdentificationNumber] = useState(false);
  
  const businessTypeList = [
    {
      category: "Business Category",
      list: [
        { id: 1, label: "Restaurant", value: "Restaurant", interest: "Restaurant" },
        { id: 2, label: "Cafeteria", value: "Cafeteria", interest: "Cafeteria" },
        { id: 3, label: "Bakery", value: "Bakery", interest: "Bakery" },
        { id: 4, label: "Pastry Shop", value: "Pastry Shop", interest: "Pastry Shop" },
        { id: 5, label: "Grocery Store / Supermarket", value: "Grocery Store / Supermarket", interest: "Grocery Store / Supermarket" },
        { id: 6, label: "Liquor Store", value: "Liquor Store", interest: "Liquor Store" },
        { id: 7, label: "Ice Cream Shop", value: "Ice Cream Shop", interest: "Ice Cream Shop" },
        { id: 8, label: "Pizzeria", value: "Pizzeria", interest: "Pizzeria" },
        { id: 9, label: "Sushi Bar", value: "Sushi Bar", interest: "Sushi Bar" },
        { id: 10, label: "Tapas Bar", value: "Tapas Bar", interest: "Tapas Bar" },
        { id: 11, label: "Fast Food", value: "Fast Food", interest: "Fast Food" },
        { id: 12, label: "Healthy Food", value: "Healthy Food", interest: "Healthy Food" },
        { id: 13, label: "Ethnic Food", value: "Ethnic Food", interest: "Ethnic Food" },
        { id: 14, label: "Vegetarian / Vegan", value: "Vegetarian / Vegan", interest: "Vegetarian / Vegan" },
        { id: 15, label: "Buffet", value: "Buffet", interest: "Buffet" },
        { id: 16, label: "Takeout", value: "Takeout", interest: "Takeout" },
        { id: 17, label: "Snack Kiosk", value: "Snack Kiosk", interest: "Snack Kiosk" },
        { id: 18, label: "Juice / Smoothie Bar", value: "Juice / Smoothie Bar", interest: "Juice / Smoothie Bar" },
      ],
    },
    {
      category: "Services",
      list: [
        { id: 19, label: "Food Truck", value: "Food Truck", interest: "Food Truck" },
        { id: 20, label: "Catering Service", value: "Catering Service", interest: "Catering Service" },
      ],
    },
  ];

  return (
    <FlexContainer>
      <Hero label={i18next.t('Basic Business Information')} sublabel={i18next.t('Please fill in the following information to complete the process.')} />
      <Select
        control={control}
        name="business_types"
        listTextSelector={businessTypeList}
        defaultValue=""
        placeholder={i18next.t('Business types*')}
        required
        maxSelections={3}
        isDatePicker={true}
        isMultiSelect={true}
        IconsendComponent={<Store01IconStroke color={Title} width={SIZES.icons} height={SIZES.icons}/>}
      />
          <Input control={control} name="business_name" placeholder={i18next.t('Business name*')} required />
          <Input control={control} name="business_description" placeholder={i18next.t('Business description*')} required inputStyle={styles.input}/>
          <TouchableOpacity onPress={() => setTaxIdentificationNumber(!taxIdentificationNumber)} style={[styles.showTaxIdentificationNumber, {backgroundColor: backgroundMaingrey}]}>
            <Typography variant='subtitle'>{taxIdentificationNumber ? 'This business is not registered' : 'Business is registered'}</Typography>
          </TouchableOpacity>
          {taxIdentificationNumber && <Input control={control} name="tax_identification_number" placeholder={i18next.t('Tax identification number')} required={false} keyboardType='numeric' />}
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  input: {
    height: SIZES.InputsHeight * 2,
  },
  showTaxIdentificationNumber: {
    paddingVertical: SIZES.gapSmall,
    marginHorizontal: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    width: 'auto',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default BasicBusinessInformation;
