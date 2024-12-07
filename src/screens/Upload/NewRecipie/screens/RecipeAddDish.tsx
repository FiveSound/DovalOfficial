import { memo, useState } from "react";
import { FieldValues, useFieldArray, useFormContext } from "react-hook-form";
import { Buttons, Container, Hero, IsLoading, LineDivider } from "@/src/components/custom";
import { ScrollView, TouchableOpacity, Text, View } from "@/src/components/native";
import {
  addSubVariantService,
  addVariantService,
  removeSubVariantService,
  removeVariantService,
} from "@/src/services/recipes";
import { SIZES } from "@/src/constants/theme";
import i18next from "@/src/Translate";
import Variant from "../components/Variant";
import Subvariant from "../components/Subvariant";

const RecipeAddDish = memo(() => {
  const [processing, setProcessing] = useState(false);
  const { watch, control } = useFormContext();

  const variantsFields = useFieldArray({
    name: "variants",
    control,
    keyName: "variantID",
  });

  const subvariantsFields = useFieldArray({
    name: "subvariants",
    control,
    keyName: "subVariantID",
  });

  const values = watch();

  const handle = async (type: string, index: number | null, id: number) => {
    setProcessing(true);
    let response;

    // Filter By Need Type
    switch (type) {
      case "ADD_VARIANT":
        response = await addVariantService(id);
        if (response.item) {
          variantsFields.append({ ...response.item });
        }
        break;

      case "ADD_SUBVARIANT":
        response = await addSubVariantService(id);
        if (response.item) {
          subvariantsFields.append({ ...response.item });
        }
        break;

      case "REMOVE_VARIANT":
        response = await removeVariantService(id);

        if (response.success && index !== null) {
          variantsFields.remove(index);
        }
        break;

      case "REMOVE_SUBVARIANT":
        response = await removeSubVariantService(id);
        if (response.success && index !== null) {
          subvariantsFields.remove(index);
        }
        break;

      default:
        break;
    }

    console.log({ response });

    setProcessing(false);
  };

  return (
    <Container showBack={true} showHeader={true} label="">
      <ScrollView>
        <Hero
          label="Agregar adicionales (opcional)"
          sublabel="los adicionales son opciones que puedes agregar a tus recetas para que los clientes puedan elegir entre ellas."
        />

        {variantsFields.fields.map((row: FieldValues, index: number) => (
          <Variant
            key={row.variantID}
            index={index}
            id={row.id}
            limit_qty={row.limit_qty}
            required={row.required}
            processing={processing}
            onRemove={() => handle("REMOVE_VARIANT", index, row.id)}
          >
            {subvariantsFields.fields.map((field: FieldValues, i: number) => {
              if (field.variantID === row.id) {
                return (
                  <Subvariant
                    key={field.subVariantID}
                    index={i}
                    id={field.id}
                    onRemove={() => handle("REMOVE_SUBVARIANT", i, row.id)}
                    processing={processing}
                  />
                );
              }
            })}

            <TouchableOpacity onPress={() => handle("ADD_SUBVARIANT", null, row.id)} disabled={processing}>
              <Text>Agregar subadicional +</Text>
            </TouchableOpacity>

            <LineDivider variant="primary" lineStyle={{ marginVertical: 10 }} />
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
            onPress={() => handle("ADD_VARIANT", null, values.id)}
            disabled={processing}
          />
        </View>
      </ScrollView>
    </Container>
  );
});

export default RecipeAddDish;
