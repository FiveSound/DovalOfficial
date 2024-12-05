import { memo } from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import Layout from "../Components/Layout";
import { Hero } from "@/src/components/custom";
import { ActivityIndicator, ScrollView, useNavigation, View } from "@/src/components/native";
import i18next from "../../../../Translate";
import { getRecipeDrafts } from "@/src/services/recipes";

const RecipeDrafts = memo(() => {
  const navigation = useNavigation();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["recipes-draft-list"],
    queryFn: getRecipeDrafts,
  });

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (isError) return <Text>An ocurred error!</Text>;

  if (data) {
    return (
      <Layout title="" href="RecipeMedia" disabled>
        <ScrollView>
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
              <Text>{row.name}</Text>
            </TouchableOpacity>
          ))}
          {/* <Text>{JSON.stringify(data.list, null, 2)}</Text> */}
        </ScrollView>
      </Layout>
    );
  }
});

export default RecipeDrafts;

const styles = StyleSheet.create({
  item: {
    padding: 10,
  },
});
