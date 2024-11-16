import { memo } from "react";
import { StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";
import { Header } from "../components";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { FlexContainer, Hero, InfoCard, LineDivider } from "../../../../components/custom";
import { Checkbox } from "../../../../components/custom/Checkbox";
import { CheckmarkCircle02Icon } from "../../../../constants/IconsPro";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import { registerBusinessService } from "../../../../services/business";
import i18next from "../../../../Translate";

const steps = [
  {
    title: i18next.t("Basic Business Information"),
    description: "Business name, Business description, Business categories",
  },
  {
    title: i18next.t("Basic Business Information 2"),
    description: "Business name, Business description, Business categories",
  },
  {
    title: i18next.t("Basic Business Information 3"),
    description: "Business name, Business description, Business categories",
  },
  {
    title: i18next.t("Basic Business Information 4"),
    description: "Business name, Business description, Business categories",
  },

  {
    title: i18next.t("Basic Business Information 5"),
    description: "Business name, Business description, Business categories",
  },
];

const Agreements = memo(() => {
  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = useFormContext();

  const navigation = useNavigation();

  const values = watch();

  const onSubmit = async (data: object) => {
    console.log({ data });

    const response = await registerBusinessService(data);
    console.log({ response });
  };

  return (
    <>
      <Header
        currentStep={6}
        label=""
        goBack={() => navigation.goBack()}
        goNext={handleSubmit(onSubmit)}
        loading={isSubmitting}
        disabled={isSubmitting}
        showDivider
        submit
      />

      <KeyboardAwareScrollView
        behavior="padding"
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
      >
        <FlexContainer>
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

          {/* <Text>{JSON.stringify(watch(), null, 2)}</Text> */}

          <LineDivider lineStyle={{ marginTop: 20, marginBottom: 20 }} variant="primary" />

          <FlexContainer newStyle={styles.checkboxContainer}>
            <Checkbox
              checked={values.terms}
              label={i18next.t("I accept the terms and conditions")}
              showLabel={true}
              LabelStyle={styles.checkboxLabel}
              onChange={(checked) => setValue("terms", checked)}
            />
            <Checkbox
              checked={values.privacy}
              label={i18next.t("I accept the privacy policy")}
              showLabel={true}
              LabelStyle={styles.checkboxLabel}
              onChange={(checked) => setValue("privacy", checked)}
            />
            <Checkbox
              checked={values.verification}
              label={i18next.t("I authorize data verification")}
              showLabel={true}
              LabelStyle={styles.checkboxLabel}
              onChange={(checked) => setValue("verification", checked)}
            />
          </FlexContainer>
        </FlexContainer>
      </KeyboardAwareScrollView>
    </>
  );
});

const styles = StyleSheet.create({
  checkboxContainer: {
    gap: SIZES.gapMedium,
  },
  checkboxLabel: {
    ...FONTS.semi14,
  },
});

export default Agreements;
