import { memo } from "react";
import { StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Container, Hero, LoadingScreen, Typography } from "@/src/components/custom";
import { useNavigation, TouchableOpacity } from "@/src/components/native";
import i18next from "../../../../Translate";
import { getRecipeDrafts } from "@/src/services/recipes";
import { SIZES } from "@/src/constants/theme";

const QUERY_KEY = "recipes-draft-list";
const RecipeDrafts = memo(() => {
  const navigation = useNavigation();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getRecipeDrafts,
  });

  if (isLoading || isFetching) return <LoadingScreen />;

  if (data) {
    return (
      <Container
        showHeader={true}
        label={i18next.t("Selecciona un draft!")}
      >
          <Hero
            label={i18next.t("Selecciona un draft!")}
            sublabel={i18next.t("Publica ese contenido que no has terminado!")}
          />

          {data.list.map((row: any) => (
            <TouchableOpacity
              key={row.id.toString()}
              onPress={() => navigation.navigate("NewRecipie", { id: row.id })}
              style={styles.item}
            >
              <Typography variant='H4title'>{row.name}</Typography>
            </TouchableOpacity>
          ))}
      </Container>
    );
  }
});

export default RecipeDrafts;

const styles = StyleSheet.create({
  item: {
    padding: SIZES.gapMedium,
  },
});
