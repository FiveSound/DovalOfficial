import { memo } from "react";
import { Alert, StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";
import { Header } from "../components";
import { KeyboardAwareScrollView, useNavigation, View } from "../../../../components/native";
import { FlexContainer, Hero, InfoCard, LineDivider } from "../../../../components/custom";
import { Checkbox } from "../../../../components/custom/Checkbox";
import { CheckmarkCircle02Icon } from "../../../../constants/IconsPro";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import { registerBusinessService } from "../../../../services/business";
import i18next from "../../../../Translate";
import { reloadApp } from "@/src/redux/slides/appSlice";
import { useAppDispatch } from "@/src/redux";

const steps = [
  {
    title: i18next.t("Basic Business Information"),
    description: "Business name, Business description, Business categories",
  },
  {
    title: i18next.t("Representative information"),
    description: i18next.t("Please fill in the following information to complete the process."),
  },
  {
    title: i18next.t("Business Address"),
    description: i18next.t("Please fill in the following information to complete the process."),
  },
  {
    title: i18next.t("Business Hours"),
    description: i18next.t("Please provide the business hours of your business."),
  },
  {
    title: i18next.t("Financial Information"),
    description: i18next.t("Please fill in the following information to complete the process."),
  },
];

const Agreements = memo(() => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useFormContext();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();

  const values = watch();
  console.log(values);

  const onSubmit = async (data: object) => {
    console.log("onSubmit called with data:", data);
    try {
      
      const response = await registerBusinessService(data);
      console.log('Response from registerBusinessService:', response);

      if (response.success) {
        console.log("Registration successful, resetting form and navigating.");
        reset();
        navigation.navigate("FormBusiness/Complete");
      } else {
        console.error("Registration failed with message:", response.message);
        Alert.alert(
          i18next.t("Error"),
          i18next.t(response.message)
        );
        Alert.alert(
          i18next.t("Error Detallado"),
          i18next.t("Se produjo un error al registrar el negocio.")
        );
      }
    } catch (error) {
      console.error("Exception caught in onSubmit:", error);
      Alert.alert(
        i18next.t("Error"),
        i18next.t("Ocurrió un error inesperado. Por favor, intenta de nuevo.", { error })
      );
    }
  };

  return (
    <>
      <Header
        currentStep={6}
        label=""
        goBack={() => navigation.goBack()}
        goNext={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting || !values.verification || !values.privacy || !values.terms}
        showDivider={false}
        submit
      />
      <View style={styles.container}>
        <Hero
          label={i18next.t("Confirm your data and accept the agreements")}
          sublabel={i18next.t(
            "Please confirm your data and accept the agreements to continue with the registration process."
          )}
        />

        {steps.map((step) => (
          <InfoCard
            key={step.title}
            title={step.title}
            description={step.description}
            icon={
              <CheckmarkCircle02Icon color={COLORS.success} width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} />
            }
          />
        ))}

        <LineDivider lineStyle={{ marginTop: 20, marginBottom: 20 }} variant="primary" />

        <FlexContainer newStyle={styles.checkboxContainer}>
          <Checkbox
            checked={values.terms}
            label={i18next.t("I accept the terms and conditions")}
            showLabel={true}
            LabelStyle={styles.checkboxLabel}
            onChange={(checked) => {
              console.log("Terms checkbox changed to:", checked);
              setValue("terms", checked);
            }}
          />
          <Checkbox
            checked={values.privacy}
            label={i18next.t("I accept the privacy policy")}
            showLabel={true}
            LabelStyle={styles.checkboxLabel}
            onChange={(checked) => {
              console.log("Privacy checkbox changed to:", checked);
              setValue("privacy", checked);
            }}
          />
          <Checkbox
            checked={values.verification}
            label={i18next.t("I authorize data verification")}
            showLabel={true}
            LabelStyle={styles.checkboxLabel}
            onChange={(checked) => {
              console.log("Verification checkbox changed to:", checked);
              setValue("verification", checked);
            }}
          />
        </FlexContainer>
      </View>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  checkboxContainer: {
    gap: SIZES.gapMedium,
  },
  checkboxLabel: {
    ...FONTS.semi14,
  },
});

export default Agreements;
