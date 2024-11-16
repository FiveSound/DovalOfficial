import { memo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingForm from "./steps/OnboardingForm";
import Basic from "./steps/Basic";
import Representative from "./steps/Representative";
import Address from "./steps/Address";
import Operations from "./steps/Operations";
import Financial from "./steps/Financial";
import Agreements from "./steps/Agreements";

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
  city: "",
  country_code: "",
  latitude: "",
  longitude: "",
  bank_details: "Banco de Reservas (Banreservas)",
  schedule: [],
  account_currency: "DOP",
  account_type: "Ahorros",
  account_number: "",
  account_holder_name: "",
  fiscal_identification: "",
  accept_terms: "",
  accept_privacy_policy: "",
  authorize_verification: "",
  show_store: false,
  privacy: false,
  verification: true,
  terms: true,
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
        <Stack.Screen name="FormBusiness/Operations" component={Operations} />
        <Stack.Screen name="FormBusiness/Financial" component={Financial} />
        <Stack.Screen name="FormBusiness/Agreements" component={Agreements} />
      </Stack.Navigator>
    </FormProvider>
  );
});

export default FormBusiness;
