import { useQuery, useQueryClient } from "@tanstack/react-query";
import { memo } from "react";
import { ActivityIndicator, Button, StyleSheet, Text, TextInput, View } from "react-native";
import { getAddressDetailsByPlaceIdService, getAddressDetailsService } from "../../../../services/locations";
import { addNewLocationService } from "../../../../services/orders";
import { useForm } from "react-hook-form";

type Props = { selected: { latitude: null | number; longitude: null | number; place_id: null | string } };

const FormNewLocation = memo((props: Props) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["form_new_location_api", props.selected],
    queryFn: async () => {
      if (props.selected.place_id) {
        return await getAddressDetailsByPlaceIdService(props.selected.place_id);
      }

      return await getAddressDetailsService(props.selected.latitude, props.selected.longitude);
    },
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, isSubmitSuccessful },
  } = useForm({
    defaultValues: {
      locations_details: data?.street,
      tag: "",
      apartment: "",
      location: {
        lat: 0,
        lng: 0,
      },
    },
  });

  const values = watch();

  const onSubmit = async () => {
    await addNewLocationService({
      location_details: "TEST",
      apartment: "TEST",
      tag: "TEST",
      location: {
        lat: 0,
        lng: 0,
      },
    });

    queryClient.invalidateQueries({ queryKey: ["locations-useQuery"] });
  };

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (isError) return <Text>An ocurred error!</Text>;

  return (
    <View>
      <Text>Nuva direccion</Text>
      <TextInput placeholder="location_details" value={values.locations_details} style={styles.input} readOnly />
      <TextInput
        placeholder="apartment"
        onChangeText={(txt) => setValue("apartment", txt, { shouldDirty: true })}
        style={styles.input}
        readOnly
      />
      <TextInput
        placeholder="tag"
        onChangeText={(txt) => setValue("tag", txt, { shouldDirty: true })}
        style={styles.input}
        readOnly
      />

      <Button title="Saved" onPress={handleSubmit(onSubmit)} disabled={isSubmitting} />
      {isSubmitting && <ActivityIndicator />}
      {isSubmitSuccessful && <Text>Enhorabuena</Text>}

      <Text>{JSON.stringify(data, null, 2)}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  input: {
    width: 300,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
});

export default FormNewLocation;
