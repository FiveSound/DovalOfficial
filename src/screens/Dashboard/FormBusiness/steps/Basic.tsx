import { memo, useState } from "react";
import { StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";
import { KeyboardAwareScrollView, useNavigation, View } from "../../../../components/native";
import { useTheme } from "../../../../hooks";
import { responsiveFontSize } from "../../../../constants/theme";
import { FlexContainer, Hero, Typography } from "../../../../components/custom";
import { Header, Input, Select } from "../components";
import { Store01IconStroke } from "../../../../constants/IconsPro";
import i18next from "../../../../Translate";
import { SIZES } from "../../../../constants/theme";

const businessTypeList = [
  {
    category: "Business Category",
    list: [
      {
        id: 1,
        label: "Restaurant",
        value: "Restaurant",
        interest: "Restaurant",
      },
      {
        id: 2,
        label: "Cafeteria",
        value: "Cafeteria",
        interest: "Cafeteria",
      },
      { id: 3, label: "Bakery", value: "Bakery", interest: "Bakery" },
      {
        id: 4,
        label: "Pastry Shop",
        value: "Pastry Shop",
        interest: "Pastry Shop",
      },
      {
        id: 5,
        label: "Grocery Store / Supermarket",
        value: "Grocery Store / Supermarket",
        interest: "Grocery Store / Supermarket",
      },
      {
        id: 6,
        label: "Liquor Store",
        value: "Liquor Store",
        interest: "Liquor Store",
      },
      {
        id: 7,
        label: "Ice Cream Shop",
        value: "Ice Cream Shop",
        interest: "Ice Cream Shop",
      },
      { id: 8, label: "Pizzeria", value: "Pizzeria", interest: "Pizzeria" },
      {
        id: 9,
        label: "Sushi Bar",
        value: "Sushi Bar",
        interest: "Sushi Bar",
      },
      {
        id: 10,
        label: "Tapas Bar",
        value: "Tapas Bar",
        interest: "Tapas Bar",
      },
      {
        id: 11,
        label: "Fast Food",
        value: "Fast Food",
        interest: "Fast Food",
      },
      {
        id: 12,
        label: "Healthy Food",
        value: "Healthy Food",
        interest: "Healthy Food",
      },
      {
        id: 13,
        label: "Ethnic Food",
        value: "Ethnic Food",
        interest: "Ethnic Food",
      },
      {
        id: 14,
        label: "Vegetarian / Vegan",
        value: "Vegetarian / Vegan",
        interest: "Vegetarian / Vegan",
      },
      { id: 15, label: "Buffet", value: "Buffet", interest: "Buffet" },
      { id: 16, label: "Takeout", value: "Takeout", interest: "Takeout" },
      {
        id: 17,
        label: "Snack Kiosk",
        value: "Snack Kiosk",
        interest: "Snack Kiosk",
      },
      {
        id: 18,
        label: "Juice / Smoothie Bar",
        value: "Juice / Smoothie Bar",
        interest: "Juice / Smoothie Bar",
      },
    ],
  },
];

const Basic = memo(() => {
  const { control, watch } = useFormContext();
  const navigation = useNavigation();
  const { Title, BackgroundMain } = useTheme();

  const values = watch();

  return (
    <>
      <Header
        currentStep={1}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Representative")}
        showDivider={false}
        disabled={
          values.business_name.length === 0 ||
          values.business_description.length === 0 ||
          values.business_category.length < 1
        }
      />
      <KeyboardAwareScrollView
        behavior="padding"
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
        style={{ backgroundColor: BackgroundMain }}
      >
        <View style={styles.container}>
        <Hero
            label={i18next.t("Basic Business Information")}
            sublabel={i18next.t("Please fill in the following information to complete the process.")}
          />
          <Input
            control={control}
            name="business_name"
            placeholder={i18next.t("Business name*")}
            required
            testID="input-business-name"
          />
          <Input
            control={control}
            name="business_description"
            placeholder={i18next.t("Business description*")}
            required
            inputStyle={styles.input}
            testID="input-business-description"
          />
{/* 
          <Input
            control={control}
            name="tax_identification_number"
            placeholder={"Tax identification number (Optional)"}
            keyboardType="numeric"
          /> */}

<Select
            control={control}
            name="business_category"
            listTextSelector={businessTypeList}
            defaultValue=""
            placeholder={i18next.t("Business types*")}
            required
            maxSelections={3}
            isDatePicker={true}
            isMultiSelect={true}
            IconsendComponent={<Store01IconStroke color={Title} width={SIZES.icons} height={SIZES.icons} />}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: SIZES.InputsHeight * 2,
  },
  showTaxIdentificationNumber: {
    marginBottom: 10,
    paddingVertical: SIZES.gapSmall,
    marginHorizontal: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    width: "auto",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Basic;
