import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { responsiveFontSize } from "../../../../constants/theme";
import { Header } from "../components";
import { FlexContainer, Hero } from "../../../../components/custom";
import { Input } from "../components";
import i18next from "../../../../Translate";
import { useTheme } from "@/src/hooks";

const Representative = memo(() => {
  const { control, watch } = useFormContext();
  const navigation = useNavigation();
  const { BackgroundMain } = useTheme();
  const values = watch();

  return (
    <>
      <Header
        currentStep={2}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Address")}
        showDivider={false}
        disabled={
          values.full_name.length === 0 ||
          values.identification_number.length === 0 ||
          values.email.length === 0 ||
          values.phone.length === 0
        }
      />
      <KeyboardAwareScrollView
        behavior="padding"
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
        style={{ backgroundColor: BackgroundMain }}
      >
        <FlexContainer>
          <Hero
            label={i18next.t("Representative information")}
            sublabel={i18next.t("Please fill in the following information to complete the process.")}
          />
          <Input
            control={control}
            name="full_name"
            placeholder={i18next.t("Full Name*")}
            required
            keyboardType="default"
          />
          <Input
            control={control}
            name="identification_number"
            placeholder={i18next.t("Identification Number*")}
            required
            keyboardType="numeric"
          />
          <Input control={control} name="role" placeholder={i18next.t("Role*")} required keyboardType="default" />
          <Input
            control={control}
            name="email"
            placeholder={i18next.t("Email*")}
            required
            keyboardType="email-address"
          />
          <Input
            control={control}
            name="phone"
            placeholder={i18next.t("Phone Number*")}
            required
            keyboardType="phone-pad"
          />
          {/* <UploadSource /> */}
        </FlexContainer>
      </KeyboardAwareScrollView>
    </>
  );
});

export default Representative;
