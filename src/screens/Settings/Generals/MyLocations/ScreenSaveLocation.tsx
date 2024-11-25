import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { useNavigation, KeyboardAwareScrollView } from "@/src/components/native";
import { addNewLocationService } from "../../../../services/orders";
import { useForm } from "react-hook-form";
import { Container, InputLabel, IsLoading } from "@/src/components/custom";
import { responsiveFontSize, SIZES } from "@/src/constants/theme";
import i18next from "@/src/Translate";

type Props = {
  route: {
    params: {
      location: AddressDetails;
    };
  };
};

interface AddressDetails {
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
}

const ScreenSaveLocation = memo((props: Props) => {
  const { location } = props.route.params;
  const navigation = useNavigation();

  const queryClient = useQueryClient();

  const {
    watch,
    setValue,
    handleSubmit,
    formState: { isDirty, isSubmitting },
    reset,
  } = useForm({
    defaultValues: {
      city: location.city,
      details: location.formatted_address,
      apartment: "",
      tag: "",
      instructions: "",
      street: location.street,
      state: location.state,
      latitude: location.latitude,
      longitude: location.longitude,
      receive: "personally",
    },
  });

  const values = watch();

  const onSubmit = async (data: object) => {
    const response = await addNewLocationService(data);

    if (response.success) {
      reset();
      queryClient.invalidateQueries({ queryKey: ["screen-checkout-orders-useQuery"] });
      navigation.reset({
        index: 1,
        routes: [
          { name: "Settings" }, 
          { name: "MyLocationsGeneral" },
        ],
      });
    }
  };

  return (
    <Container
      style={styles.container}
      showHeader={true}
      label={i18next.t('Add a new address')}
      showFooter={true}
      labels={i18next.t('Save')}
      onPressButtons={handleSubmit(onSubmit)}
      loading={isSubmitting}
    >

      <KeyboardAwareScrollView
        behavior="padding"
        enabled={true}
        extraHeight={responsiveFontSize(200)}
        contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
      >
        <InputLabel
          label={i18next.t('Tag your address*')}
          placeholder={i18next.t('Tag: (ej: Mi casa, Oficina, Novia)')}
          value={values.tag}
          onChangeText={(txt) => setValue("tag", txt, { shouldDirty: true })}
        />
        <InputLabel
          label={i18next.t('Details of the address*')}
          placeholder={i18next.t('No. Apto, Oficina, Casa')}
          value={values.apartment}
          onChangeText={(txt) => setValue("apartment", txt, { shouldDirty: true })}
        />
        <InputLabel
          label={i18next.t('Details of the location')}
          placeholder={i18next.t('Details')}
          value={values.details}
          onChangeText={(txt) => setValue("instructions", txt, { shouldDirty: true })}
          readOnly={true}
        />
        <InputLabel
          label={i18next.t('Instructions (optional)')}
          placeholder={i18next.t('(ej: La casa de rejas negras frente a la tienda de empanadas)')}
          value={values.instructions}
          onChangeText={(txt) => setValue("instructions", txt, { shouldDirty: true })}
          inputStyle={{ height: SIZES.BtnHeight }}
          multiline
          numberOfLines={4}
        />
        {/* 
      <View style={styles.inputLabel}>
        <Text style={styles.label}>Quien recibe?</Text>
        <View style={styles.list_checkbox}>
          <View style={styles.flex_checkbox}>
            <Text onPress={() => setValue("receive", "personally")}>Recibir personalmente</Text>
            <Checkbox
              style={styles.checkbox}
              value={values.receive == "personally"}
              onValueChange={() => setValue("receive", "personally")}
            />
          </View>

          <View style={styles.flex_checkbox}>
            <Text onPress={() => setValue("receive", "porter")}>Dejar en porteria</Text>
            <Checkbox
              style={styles.checkbox}
              value={values.receive == "porter"}
              onValueChange={() => setValue("receive", "porter")}
            />
          </View>
        </View>
      </View> */}
      </KeyboardAwareScrollView>
      {isSubmitting && <IsLoading />}
    </Container>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputLabel: {
    marginBottom: 15,
    width: "90%",
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  textarea: {
    height: 100,
  },
  button: {
    marginHorizontal: 20,
    width: "90%",
    backgroundColor: "#4ADE80",
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  list_checkbox: {
    flexDirection: "row",
    gap: 20,
  },
  flex_checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    margin: 8,
  },
});

export default ScreenSaveLocation;
