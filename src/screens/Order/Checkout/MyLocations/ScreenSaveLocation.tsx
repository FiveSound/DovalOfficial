import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import TitleWithBack from "./TitleWithBack";
import { useNavigation } from "../../../../components/native";
import { addNewLocationService } from "../../../../services/orders";
import { useForm } from "react-hook-form";
import Checkbox from "expo-checkbox";

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
      navigation.navigate("Checkout");
    }
  };

  return (
    <View style={styles.container}>
      <TitleWithBack onPress={() => navigation.goBack()}>Agregar nueva direccion</TitleWithBack>
      <View style={styles.inputLabel}>
        <Text style={styles.label}>Etiqueta tu direccion*</Text>
        <TextInput
          placeholder="Etiqueta: (ej: Mi casa, Oficina, Novia)"
          value={values.tag}
          onChangeText={(txt) => setValue("tag", txt, { shouldDirty: true })}
          style={styles.input}
        />
      </View>

      <View style={styles.inputLabel}>
        <Text style={styles.label}>Detalles de la direccion*</Text>
        <TextInput
          placeholder="No. Apto, Oficina, Casa"
          value={values.apartment}
          onChangeText={(txt) => setValue("apartment", txt, { shouldDirty: true })}
          style={styles.input}
        />
      </View>

      <View style={styles.inputLabel}>
        <Text style={styles.label}>Detalles de la ubicacion</Text>
        <TextInput placeholder="Details" value={values.details} style={styles.input} readOnly />
      </View>

      <View style={styles.inputLabel}>
        <Text style={styles.label}>Instrucciones (Opcional)</Text>
        <TextInput
          placeholder="(ej: La casa de rejas negras frente a la tienda de empanadas)"
          value={values.instructions}
          onChangeText={(txt) => setValue("instructions", txt, { shouldDirty: true })}
          style={[styles.input, styles.textarea]}
          multiline
          numberOfLines={4}
        />
      </View>

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
      </View>

      <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.button} disabled={isSubmitting || !isDirty}>
        <Text style={styles.textButton}>Guardar</Text>
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
