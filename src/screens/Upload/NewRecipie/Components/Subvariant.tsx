import { memo } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Text, TextInput, TouchableOpacity } from "@/src/components/native";
import { FlexContainer } from "@/src/components/custom";
import { StyleSheet } from "react-native";
import { responsiveWidth, SIZES, FONTS, COLORS } from "@/src/constants/theme";
import { Delete03IconSharp } from "@/src/constants/IconsPro";

type Props = {
  index: number;
  id: string;
  handleRemoveSubVariant: () => Promise<void>;
  processing: boolean;
};

const Subvariant = memo((props: Props) => {
  const { control } = useFormContext();

  return (
    <FlexContainer variant="row" newStyle={{ marginBottom: 10, gap: 20 }}>
      <TouchableOpacity onPress={props.handleRemoveSubVariant} disabled={props.processing}>
        <Delete03IconSharp width={SIZES.icons} height={SIZES.icons} color={COLORS.error} />
      </TouchableOpacity>
      <Controller
        control={control}
        name={`subvariants.${props.index}.name`}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            placeholder="Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[styles.input]}
            autoFocus
          />
        )}
      />

      <Controller
        control={control}
        name={`subvariants.${props.index}.price`}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <TextInput
            placeholder="Precio"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            style={[styles.input]}
          />
        )}
      />
    </FlexContainer>
  );
});

export default Subvariant;

const styles = StyleSheet.create({
  input: {
    marginBottom: SIZES.gapMedium,
    minWidth: responsiveWidth(150),
    borderBottomWidth: SIZES.borderWidth,
    ...FONTS.semi16,
  },
});
