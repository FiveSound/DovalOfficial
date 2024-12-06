import { memo } from "react";
import { StyleSheet } from "react-native";
import { TextInput, TouchableOpacity, View } from "@/src/components/native";
import { LineDivider, Typography } from "@/src/components/custom";
import { UseMutationResult } from "@tanstack/react-query";
import { iconsNative } from "@/src/constants";
import Subvariant from "./Subvariant";
import { COLORS, FONTS, responsiveWidth, SIZES } from "@/src/constants/theme";
import { Delete03IconSharp } from "@/src/constants/IconsPro";
import { useTheme } from "@/src/hooks";
import i18next from "@/src/Translate";

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
  const { border, Description, Title } = useTheme();
  const placeholder = i18next.t("Ej: Acompañantes, Bebidas");

  return (
    <>
    <View style={styles.variant}>
      <View style={styles.variant_header}>
        <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
          <TextInput
            placeholder={placeholder}
            onChangeText={(txt) => {
              props.mutationEditVariant.mutate({ id: props.id, name: "title", value: txt });
            }}
            placeholderTextColor={Description}
            defaultValue="Nombre del adicional"
            style={[styles.input_title, {
              borderColor: border,
              color: Title
            }]}
            autoFocus
          />
          <Typography variant="subtitle">{props.subvariants.length}</Typography>
        </View>

        <TouchableOpacity
          onPress={() => props.mutationRemoveVariant.mutate(props.id)}
          disabled={props.mutationRemoveVariant.isPending}
        >
          <Delete03IconSharp width={SIZES.icons} height={SIZES.icons} color={COLORS.error} />
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

      <Typography
        variant='subtitle'
        onPress={() => props.mutationAddSubVariant.mutate(props.id)}
        newStyle={{ marginBottom: SIZES.gapMedium, color: COLORS.success }}
      >
        Agregar subadicional +
      </Typography>
    </View>
          <LineDivider lineStyle={{ marginBottom: SIZES.padding }} variant="secondary" /></>
  );
});

export default Variant;

const styles = StyleSheet.create({
  variant: {
    padding: SIZES.gapLarge,
  },
  variant_header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SIZES.gapMedium,
  },
  input_title: {
    marginBottom: SIZES.gapMedium,
    minWidth: responsiveWidth(220),
    borderBottomWidth: SIZES.borderWidth,
    ...FONTS.semi16
  },
});
