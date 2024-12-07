import { memo, ReactNode } from "react";
import { Alert, StyleSheet } from "react-native";
import { TouchableOpacity, Text, TextInput, View } from "@/src/components/native";
import { Controller, FieldValues, useFormContext } from "react-hook-form";
import { responsiveWidth, SIZES, FONTS, COLORS } from "@/src/constants/theme";
import { Delete03IconSharp } from "@/src/constants/IconsPro";
import { Checkbox } from "@/src/components/custom";
import Pickers from "../components/Pickers";

type Props = {
  index: number;
  id: number;
  limit_qty: string;
  required: boolean;
  processing: boolean;
  children: ReactNode;
  onRemove: () => Promise<void>;
};

const Variant = memo((props: Props) => {
  const { watch, control, setValue } = useFormContext();

  const values = watch();

  let lenghtVariants = values.subvariants.filter((row: FieldValues) => row.variantID === props.id).length;

  return (
    <View style={styles.variant}>
      <View style={styles.variant_header}>
        <Controller
          control={control}
          name={`variants.${props.index}.title`}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <TextInput
              placeholder="Title"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, { fontSize: 20 }]}
              autoFocus
            />
          )}
        />
        {values.variants[props.index].required && (
          <View style={{ width: 50 }}>
            <Text>Limit</Text>
            <Pickers
              onChange={(value) => {
                if (lenghtVariants < parseInt(value)) {
                  Alert.alert("Accion no completada:", "No tienes suficientes subvariantes!", [
                    {
                      text: "OK!",
                      style: "default",
                      onPress: () => {},
                      isPreferred: true,
                    },
                  ]);
                  return;
                }

                setValue(`variants.${props.index}.limit_qty`, value, { shouldDirty: true });
              }}
              defaultValue="1"
              value={values.variants[props.index].limit_qty}
              list={[
                { label: "1", value: "1" },
                { label: "2", value: "2" },
                { label: "3", value: "3" },
                { label: "4", value: "4" },
                { label: "5", value: "5" },
              ]}
              label=""
            />
          </View>
        )}
        <View style={{ width: 60 }}>
          {lenghtVariants > 0 && (
            <>
              <Text>Required</Text>
              <Checkbox
                onChange={(value: boolean) => {
                  setValue(`variants.${props.index}.required`, value, { shouldDirty: true });
                }}
                checked={values.variants[props.index].required}
              />
            </>
          )}
        </View>
        <TouchableOpacity onPress={props.onRemove} disabled={props.processing}>
          <Delete03IconSharp width={SIZES.icons} height={SIZES.icons} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      {props.children}
    </View>
  );
});

export default Variant;

const styles = StyleSheet.create({
  variant: {
    padding: SIZES.gapLarge,
  },
  variant_header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: SIZES.gapMedium,
  },
  input: {
    marginBottom: SIZES.gapMedium,
    minWidth: responsiveWidth(220),
    borderBottomWidth: SIZES.borderWidth,
    ...FONTS.semi16,
  },
});
