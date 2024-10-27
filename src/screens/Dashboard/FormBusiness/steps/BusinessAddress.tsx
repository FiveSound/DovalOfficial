import React, { useState } from "react";
import { Input } from "../components";
import { FlexContainer, Hero, MapSelector } from "../../../../components/custom";
import { useQuery } from "@tanstack/react-query";
import { searchLocationsService } from "../../../../services/orders";
import { View, Button, StyleSheet } from "react-native";
import { responsiveFontSize } from "../../../../constants/theme";
import i18next from "../../../../Translate";

const BusinessAddress = ({ control, setValue }: any) => {
  const [showMap, setShowMap] = useState<boolean>(false);
  const [location, setLocation] = useState<any>(null);

  const handleLocationSelected = (location: any) => {
    setShowMap(true);
    setLocation(location);
  };

  return (
    <FlexContainer>
      <Hero
        label={i18next.t("Business Address")}
        sublabel={i18next.t("Please fill in the following information to complete the process.")}
      />
      <View style={styles.buttonContainer}>
        <Button title={i18next.t("Select on the Map")} onPress={() => setShowMap(true)} />
      </View>

      {showMap && <MapSelector setValue={setValue} />}

      {location !== null && (
        <>
          <Input
            control={control}
            name="address"
            placeholder={location?.street || i18next.t("Address")}
            required
            validationRules={{
              pattern: {
                value: /^.{5,}$/,
                message: i18next.t("The address must have at least 5 characters"),
              },
            }}
          />
          <Input control={control} name="street" placeholder={location?.street || i18next.t("Street")} required />
          <Input control={control} name="city" placeholder={location?.city || i18next.t("City")} required />
          <Input control={control} name="state" placeholder={location?.state || i18next.t("State")} required />
          <Input
            control={control}
            name="zip"
            placeholder={location?.zip || i18next.t("Zip")}
            required
            keyboardType="numeric"
            validationRules={{
              pattern: {
                value: /^\d{5}(-\d{4})?$/,
                message: i18next.t("Enter a valid zip code"),
              },
            }}
          />
        </>
      )}
    </FlexContainer>
  );
};

export default BusinessAddress;

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: responsiveFontSize(10),
    alignItems: "center",
  },
});
