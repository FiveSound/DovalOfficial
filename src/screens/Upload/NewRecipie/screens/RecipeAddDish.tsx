import { memo, useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Buttons, Container, Hero, IsLoading } from "@/src/components/custom";
import { ScrollView, TouchableOpacity, Text, View } from "@/src/components/native";
import { addSubVariantService, addVariantService, removeVariantService } from "@/src/services/recipes";
import { SIZES } from "@/src/constants/theme";
import i18next from "@/src/Translate";
import Variant from "../components/Variant";
import Subvariant from "../components/Subvariant";

const RecipeAddDish = memo(() => {
  const [processing, setProcessing] = useState(false);
  const { watch, control } = useFormContext();

  const variants_fields = useFieldArray({
    name: "variants",
    control,
    keyName: "variantID",
  });

  const subvariants_fields = useFieldArray({
    name: "subvariants",
    control,
    keyName: "subVariantID",
  });

  const values = watch();

  const handleAddVariant = async (id: number) => {
    setProcessing(true);
    const response = await await addVariantService(id);
    if (response.success) {
      variants_fields.append(response.item);
    }
    setProcessing(false);
  };

  const handleRemoveVariant = async (id: number, index: number) => {
    setProcessing(true);
    const response = await await removeVariantService(id);
    if (response.success) {
      variants_fields.remove(index);
    }
    setProcessing(false);
  };

  const handleAddSubVariant = async (id: number) => {
    setProcessing(true);
    const response = await addSubVariantService(id);

    if (response.success) {
      subvariants_fields.append(response.item);
    }
    setProcessing(false);
  };

  const handleRemoveSubVariant = async (id: number, index: number) => {
    setProcessing(true);
    const response = await addSubVariantService(id);
    if (response.success) {
      subvariants_fields.remove(index);
    }
    setProcessing(false);
  };

  const handleAdd = async () => {};

  return (
    <Container showBack={true} showHeader={true} label="">
      <ScrollView>
        <Hero
          label="Agregar adicionales a tus recetas"
          sublabel="los adicionales son opciones que puedes agregar a tus recetas para que los clientes puedan elegir entre ellas."
        />

        {variants_fields.fields.map((row: any, index: number) => (
          <Variant
            key={row.variantID}
            index={index}
            id={row.variantID}
            handleRemoveVariant={() => handleRemoveVariant(row.id, index)}
            limit_qty={row.limit_qty}
            required={row.required}
            processing={processing}
          >
            {subvariants_fields.fields.map((field: any, i) => {
              if (field.variantID === row.id) {
                return (
                  <Subvariant
                    key={field.subVariantID}
                    index={i}
                    id={field.subVariantID}
                    handleRemoveSubVariant={() => handleRemoveSubVariant(field.id, i)}
                    processing={processing}
                  />
                );
              }
            })}
            <TouchableOpacity onPress={() => handleAddSubVariant(row.id)} disabled={processing}>
              <Text>Agregar subadicional +</Text>
            </TouchableOpacity>
          </Variant>
        ))}

        {processing && <IsLoading />}

        <View
          style={{
            marginTop: SIZES.gapMedium,
            alignItems: "center",
            gap: SIZES.gapMedium,
          }}
        >
          <Buttons
            variant={processing ? "disabled" : "primary"}
            label={i18next.t("Agregar adicionales +")}
            onPress={() => handleAddVariant(values.id)}
            disabled={processing}
          />
        </View>
      </ScrollView>
    </Container>
  );
});

export default RecipeAddDish;
