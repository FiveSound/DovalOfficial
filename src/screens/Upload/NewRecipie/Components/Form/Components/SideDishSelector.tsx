import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { ScrollView } from "../../../../../../components/native";
import { ButtonAcces, FlexContainer, Icons, IsLoading, Perks, Typography } from "../../../../../../components/custom";
import styles from "./styles";
import { Text } from "react-native";
import { useTheme } from "@/src/hooks";

interface VariantItem {
  id: number;
  name: string;
}

interface VariantData {
  resume: VariantItem[];
}

interface Props {
  variants: ReturnType<typeof useQuery<VariantData, Error>>;
  navigation: NavigationProp<any>;
}

const SideDishSelector: React.FC<Props> = ({ variants, navigation }) => {
const { Description } = useTheme();
  if (variants.isLoading) {
    return <IsLoading />;
  }

  if (variants.isError) {
    return <Typography variant="H4title">Ocurrió un error al cargar las variantes.</Typography>;
  }

  return (
    <ButtonAcces
      label="Side Dish Everyone"
      onPress={() => navigation.navigate("RecipeAddDish")}
      showAppendBottom="DOWN"
      ShowLineDivider={false}
      container={styles.containerButton}
      AppendPreview={
        variants.data && variants.data?.resume.length > 0 ? (
          <Perks label="Completed" status="success" Reverse={false} />
        ) : (
          <Typography variant="H4title">Opcional</Typography>
        )
      }
      append={
        variants.isLoading ? (
          <IsLoading />
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.scrollView}
          >
            <FlexContainer variant="row" newStyle={styles.flexContainer}>
              {variants.data?.resume.map((row: any) => (
                <Icons
                  key={row.id}
                  appendIcons={
                    <Typography variant="H4title" newStyle={{...styles.text, color: Description}}>
                      Varianst: {row.title || ""}
                    </Typography>
                  }
                />
              ))}
            </FlexContainer>
          </ScrollView>
        )
      }
    />
  );
};

export default SideDishSelector;
