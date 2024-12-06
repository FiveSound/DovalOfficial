import { Text, useNavigation, View } from "@/src/components/native";
import { ArrowRight, ButtonAcces, FlexContainer, LineDivider, Perks } from "@/src/components/custom";
import { useTheme } from "@/src/hooks";
import { FONTS } from "@/src/constants/theme";
import { styles } from "./styles";
import { useFormContext } from "react-hook-form";

const data = [
  {
    id: 1,
    label: "Agregar adicionales",
    href: "RecipeAddDish",
    required: true,
  },
  {
    id: 2,
    label: "Agregar categorías",
    href: "RecipeCategories",
    required: true,
  },
  {
    id: 3,
    label: "Agregar tipo",
    href: "RecipeType",
    required: true,
  },
];

const MoreOptions = () => {
  const { Description } = useTheme();
  const navigation = useNavigation();
  const { watch } = useFormContext();

  const values = watch();

  return data.map((item) => (
    <View key={item.id.toString()}>
      <ButtonAcces
        label={item.label}
        subLabel="Holi"
        labelPreview="Required"
        onPress={() => navigation.navigate(item.href)}
        showAppendBottom="DOWN"
        ShowLineDivider={false}
        container={styles.containerButton}
        ShowAppendPreview={false}
        labelStyle={{
          ...FONTS.semi14,
          color: Description,
        }}
        AppendPreview={<ArrowRight onPress={() => navigation.navigate(item.href)} />}
      />

      <FlexContainer variant="column">
        {item.id === 1 &&
          values.variants.map((row: { id: number; title: string }) => (
            <Perks key={row.id.toString()} label={row.title} status="success" />
          ))}

        {item.id === 2 &&
          values.temporalCategories.map((row: { id: number; name: string }) => (
            <Perks key={row.id.toString()} label={row.name} status="success" />
          ))}

        {item.id === 3 &&
          values.temporalTypes.map((row: { id: number; name: string }) => (
            <Perks key={row.id.toString()} label={row.name} status="success" />
          ))}
      </FlexContainer>
      <LineDivider variant="secondary" />
    </View>
  ));
};

export default MoreOptions;
