import { memo, useEffect, useState } from "react";
import { Text } from "react-native";
import { useFormContext } from "react-hook-form";
import { KeyboardAwareScrollView, useNavigation } from "../../../../components/native";
import { responsiveFontSize, SIZES } from "../../../../constants/theme";
import { Header } from "../components";
import { Container, FlexContainer, Hero, Typography } from "../../../../components/custom";
import { Input } from "../components";
import i18next from "../../../../Translate";
import { searchLocalAddressService } from "../../../../services/locations";

const Address = memo(() => {
  const { control, watch } = useFormContext();
  const navigation = useNavigation();

  const [results, setResults] = useState<any[]>([]);

  const values = watch();

  useEffect(() => {
    searchLocalAddressService(values.search_location)
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [values.search_location]);

  return (
    <Container>
      <Header
        currentStep={3}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Operations")}
        showDivider={false}
        disabled={!values.latitude && !values.longitude}
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

          <Input control={control} name="search_location" placeholder={i18next.t("Address")} isSearch />

          {results.map((row) => (
            <Typography
              variant='H4title'
              key={row.place_id}
              onPress={() => navigation.navigate("FormBusiness/MapLocation", { placeId: row.place_id })}
              newStyle={{ padding: SIZES.gapMedium }}
            >
              {row.description}
            </Typography>
          ))}

          {values.latitude && values.longitude && results.length === 0 && (
            <>
              <Input control={control} name="formatted_address" placeholder={i18next.t("Address")} />
              <Input control={control} name="city" placeholder={i18next.t("City")} required />
              <Input control={control} name="state" placeholder={i18next.t("State")} required />
              <Input
                control={control}
                name="postalCode"
                placeholder={i18next.t("postal_code")}
                keyboardType="numeric"
              />
            </>
          )}
        </FlexContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
});

export default Address;
