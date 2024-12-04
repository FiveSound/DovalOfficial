import { memo } from "react";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { TextInput, View } from "@/src/components/native";
import { LineDivider } from "@/src/components/custom";
import { UseMutationResult } from "@tanstack/react-query";
import { iconsNative } from "@/src/constants";
import Subvariant from "./Subvariant";

type SubVariantType = {
  id: number;
  variantID: number;
  name: string;
  price: string;
  limit_qty: string;
  required: boolean;
};

type Props = {
  id: number;
  title: string;
  recipeID: number;
  subvariants: SubVariantType[];
  mutationAddSubVariant: UseMutationResult<any, Error, number, unknown>;
  mutationRemoveVariant: UseMutationResult<any, Error, number, unknown>;
  mutationRemoveSubVariant: UseMutationResult<any, Error, number, unknown>;
  mutationEditVariant: UseMutationResult<
    { id: number; name: string; value: string | boolean },
    Error,
    { id: number; name: string; value: string | boolean },
    unknown
  >;
  mutationEditSubVariant: UseMutationResult<
    { id: number; name: string; value: string | boolean },
    Error,
    { id: number; name: string; value: string | boolean },
    unknown
  >;
};

const Variant = memo((props: Props) => {
  return (
    <View style={styles.variant}>
      {/* Variant Header */}
      <View style={styles.variant_header}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <TextInput
            placeholder="Ej: Acompañantes, Bebidas"
            onChangeText={(txt) => {
              props.mutationEditVariant.mutate({ id: props.id, name: "title", value: txt });
            }}
            defaultValue={props.title}
            style={styles.input_title}
            autoFocus
          />
          <Text>({props.subvariants.length})</Text>
        </View>

        <TouchableOpacity
          onPress={() => props.mutationRemoveVariant.mutate(props.id)}
          disabled={props.mutationRemoveVariant.isPending}
        >
          <Image style={{ tintColor: "#444" }} source={iconsNative.DeleteIcon} />
        </TouchableOpacity>
      </View>

      {/* SubVariants */}
      {props.subvariants.map((row) => (
        <Subvariant
          key={row.id.toString()}
          mutationAddSubVariant={props.mutationAddSubVariant}
          mutationRemoveVariant={props.mutationRemoveVariant}
          mutationRemoveSubVariant={props.mutationRemoveSubVariant}
          mutationEditVariant={props.mutationEditVariant}
          mutationEditSubVariant={props.mutationEditSubVariant}
          {...row}
        />
      ))}

      <Text
        onPress={() => props.mutationAddSubVariant.mutate(props.id)}
        style={{ marginBottom: 10, fontWeight: "bold", fontSize: 16, color: "green" }}
      >
        Add variant +
      </Text>

      <LineDivider lineStyle={{ marginBottom: 20 }} />
    </View>
  );
});

export default Variant;

const styles = StyleSheet.create({
  variant: {
    backgroundColor: "#F4F4F4",
    padding: 10,
  },
  variant_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  input_title: {
    marginBottom: 20,
    minWidth: 210,
    fontWeight: "bold",
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
});
