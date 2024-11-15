import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator, Alert } from "react-native";
import TitleWithBack from "./TitleWithBack";
import { useNavigation } from "../../../../components/native";
import { addNewLocationService } from "../../../../services/orders";
import { useForm } from "react-hook-form";

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
      street: location.street,
      state: location.state,
      latitude: location.latitude,
      longitude: location.longitude,
    },
  });

  const values = watch();

  const onSubmit = async (data: object) => {
    const response = await addNewLocationService(data);

    if (response.success) {
      Alert.alert("Enhorabuena campeon!");
      reset();
      queryClient.invalidateQueries({ queryKey: ["locations-useQuery"] });
      navigation.navigate("MyLocations");
    }
  };

  return (
    <View style={styles.container}>
      <TitleWithBack onPress={() => navigation.goBack()}>Guardar nueva ubicacion</TitleWithBack>
      <TextInput placeholder="City" value={values.city} style={styles.input} readOnly />
      <TextInput placeholder="Details" value={values.details} style={styles.input} readOnly />
      <TextInput
        placeholder="Aparment"
        value={values.apartment}
        onChangeText={(txt) => setValue("apartment", txt, { shouldDirty: true })}
        style={styles.input}
      />
      <TextInput
        placeholder="Tag"
        value={values.tag}
        onChangeText={(txt) => setValue("tag", txt, { shouldDirty: true })}
        style={styles.input}
      />

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button} disabled={isSubmitting || !isDirty}>
        <Text style={styles.textButton}>Confirmar ubicacion</Text>
      </TouchableOpacity>
      {isSubmitting && <ActivityIndicator />}

      {/* <Text>{JSON.stringify(props.route.params, null, 2)}</Text> */}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  input: {
    width: "90%",
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    margin: 20,
    backgroundColor: "#4ADE80",
    padding: 10,
    borderRadius: 5,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default ScreenSaveLocation;
