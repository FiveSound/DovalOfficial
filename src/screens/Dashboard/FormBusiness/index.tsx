import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingForm from "./steps/OnboardingForm";
import Basic from "./steps/Basic";
import Representative from "./steps/Representative";
import Address from "./steps/Address";
import MapLocation from "./steps/MapLocation";
import Operations from "./steps/Operations";
import Financial from "./steps/Financial";
import Agreements from "./steps/Agreements";
import Complete from "./steps/Complete";
import { schedules } from "./steps/data";

const Stack = createNativeStackNavigator();

const defaultValues = {
  business_name: "",
  business_description: "",
  business_category: [],
  tax_identification_number: "",
  full_name: "",
  identification_number: "",
  document_ident: "",
  email: "",
  phone: "",
  cover: "",
  banner: "",
  search_location: "",
  country: "",
  city: "",
  state: "",
  formatted_address: "",
  street: "",
  country_code: "",
  postalCode: "",
  latitude: null,
  longitude: null,
  bank_details: "",
  schedules: schedules,
  delivery_service: false,
  account_currency: "",
  account_type: "",
  account_number: "",
  account_holder_name: "",
  fiscal_identification: "",
  accept_terms: "",
  accept_privacy_policy: "",
  authorize_verification: "",
  show_store: false,
  privacy: false,
  verification: false,
  terms: false,
  placeID: null,
};

const FormBusiness = memo(() => {
  const methods = useForm({ defaultValues });

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="FormBusiness/Onboarding"
      >
        <Stack.Screen name="FormBusiness/Onboarding" component={OnboardingForm} />
        <Stack.Screen name="FormBusiness/Basic" component={Basic} />
        <Stack.Screen name="FormBusiness/Representative" component={Representative} />
        <Stack.Screen name="FormBusiness/Address" component={Address} />
        <Stack.Screen name="FormBusiness/MapLocation" component={MapLocation} />
        <Stack.Screen name="FormBusiness/Operations" component={Operations} />
        <Stack.Screen name="FormBusiness/Financial" component={Financial} />
        <Stack.Screen name="FormBusiness/Agreements" component={Agreements} />
        <Stack.Screen name="FormBusiness/Complete" component={Complete} />
      </Stack.Navigator>
    </FormProvider>
  );
});

export default FormBusiness;
