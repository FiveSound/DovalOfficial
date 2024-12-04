import { memo } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { ActivityIndicator, TextInput, View, Switch } from "@/src/components/native";
import Picker from "./Picker";
import { iconsNative } from "@/src/constants";

type Props = {
  id: number;
  name: string;
  limit_qty: string;
  required: boolean;
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

const Subvariant = memo((props: Props) => {
  return (
    <View style={styles.subvariant}>
      <TouchableOpacity
        onPress={() => props.mutationRemoveSubVariant.mutate(props.id)}
        disabled={props.mutationRemoveSubVariant.isPending}
      >
        <Image style={{ tintColor: "#444" }} source={iconsNative.DeleteIcon} />
      </TouchableOpacity>

      <View>
        <Text style={{ fontWeight: "bold" }}>Title*</Text>
        <TextInput
          placeholder="Ej: Papas, Salsas..."
          onChangeText={(txt) => props.mutationEditSubVariant.mutate({ id: props.id, name: "name", value: txt })}
          defaultValue={props.name ? props.name : ""}
          style={styles.input_subtitle}
          autoFocus
        />
      </View>

      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>Price*</Text>
        <TextInput
          placeholder="Price"
          defaultValue="0"
          style={{
            width: 50,
            fontSize: 15,
          }}
          onChangeText={(txt) => props.mutationEditSubVariant.mutate({ id: props.id, name: "price", value: txt })}
        />
      </View>

      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>Limit*</Text>
        <Picker
          onChange={(value: string) => {
            props.mutationEditSubVariant.mutate({ id: props.id, name: "limit_qty", value: value });
          }}
          defaultValue="1"
          value={props.limit_qty}
          list={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
            { label: "4", value: "4" },
            { label: "5", value: "5" },
            { label: "6", value: "6" },
            { label: "7", value: "7" },
            { label: "8", value: "8" },
            { label: "9", value: "9" },
            { label: "10", value: "10" },
          ]}
          label={props.limit_qty ? `Limit: ${props.limit_qty}` : "0"}
        />
      </View>

      <View style={{ flexDirection: "column" }}>
        <Text style={{ fontWeight: "bold" }}>Required</Text>
        <Switch
          onValueChange={(value) => {
            props.mutationEditSubVariant.mutate({ id: props.id, name: "required", value: value });
          }}
          value={props.required}
        />
      </View>
    </View>
  );
});

export default Subvariant;

const styles = StyleSheet.create({
  subvariant: {
    marginBottom: 20,
    flexDirection: "row",
    gap: 14,
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  input_subtitle: {
    maxWidth: 200,
    fontWeight: "bold",
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#444",
  },
});
