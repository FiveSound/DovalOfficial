import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { responsiveFontSize } from "../../../../constants/theme";
import { Header, Input, Select } from "../components";
import { FlexContainer, Hero } from "../../../../components/custom";
import { ListBank } from "./data";
import i18next from "../../../../Translate";

const Financial = memo(() => {
  const { control } = useFormContext();
  const navigation = useNavigation();

  return (
    <>
      <Header
        currentStep={5}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Agreements")}
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
            label={i18next.t("Financial Information")}
            sublabel={i18next.t("Please fill in the following information to complete the process.")}
          />

          <Input
            control={control}
            name="account_number"
            placeholder={i18next.t("Account number*")}
            required
            keyboardType="numeric"
          />
          <Input
            control={control}
            name="account_holder_name"
            placeholder={i18next.t("Account holder name*")}
            required
          />
          <Input
            control={control}
            name="fiscal_identification"
            placeholder={i18next.t("Fiscal identification*")}
            required
            keyboardType="numeric"
          />

          <Select
            control={control}
            name="bank_details"
            list={ListBank}
            defaultValue="Banco de Reservas (Banreservas)"
            placeholder={i18next.t("Bank name*")}
            required
          />
          <Select
            control={control}
            name="account_currency"
            list={[
              { label: i18next.t("Dominican Pesos"), value: "DOP" },
              { label: i18next.t("US Dollars"), value: "USD" },
            ]}
            defaultValue="DOP"
            placeholder={i18next.t("Currency*")}
            required
          />
          <Select
            control={control}
            name="account_type"
            list={[
              { label: i18next.t("Current"), value: "Corriente" },
              { label: i18next.t("Savings"), value: "Ahorros" },
            ]}
            defaultValue="Ahorros"
            placeholder={i18next.t("Account type*")}
            required
          />
        </FlexContainer>
      </KeyboardAwareScrollView>
    </>
  );
});

export default Financial;
