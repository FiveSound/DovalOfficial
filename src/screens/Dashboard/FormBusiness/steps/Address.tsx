import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { responsiveFontSize } from "../../../../constants/theme";
import { Header } from "../components";
import { FlexContainer, Hero } from "../../../../components/custom";
import { Input } from "../components";
import i18next from "../../../../Translate";

const Address = memo(() => {
  const { control } = useFormContext();
  const navigation = useNavigation();

  return (
    <>
      <Header
        currentStep={3}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Operations")}
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
            label={i18next.t("Business Address")}
            sublabel={i18next.t("Please fill in the following information to complete the process.")}
          />
          <Input
            control={control}
            name="address"
            placeholder={i18next.t("Address")}
            required
            validationRules={{
              pattern: {
                value: /^.{5,}$/,
                message: i18next.t("The address must have at least 5 characters"),
              },
            }}
          />
          <Input control={control} name="city" placeholder={i18next.t("City")} required />
          <Input control={control} name="state" placeholder={i18next.t("State")} required />
          <Input
            control={control}
            name="postal_code"
            placeholder={i18next.t("postal_code")}
            required
            keyboardType="numeric"
            validationRules={{
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: i18next.t("Enter a valid zip code"),
              },
            }}
          />
        </FlexContainer>
      </KeyboardAwareScrollView>
    </>
  );
});

export default Address;
