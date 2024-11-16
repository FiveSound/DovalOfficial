import { memo } from "react";
import { Text, StyleSheet } from "react-native";
import { useFormContext } from "react-hook-form";
import { Header } from "../components";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { FlexContainer, Hero, InfoCard } from "../../../../components/custom";
import { Checkbox } from "../../../../components/custom/Checkbox";
import { FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import i18next from "../../../../Translate";

const Agreements = memo(() => {
  const { watch, setValue } = useFormContext();
  const navigation = useNavigation();

  const values = watch();

  return (
    <>
      <Header
        currentStep={6}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => console.log("Submit...")}
        showDivider
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

          <InfoCard title="Hola" description="Hola 2" />

          <Text>{JSON.stringify(watch(), null, 2)}</Text>

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
