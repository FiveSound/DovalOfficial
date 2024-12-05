import { memo } from "react";
import { Text } from "react-native";
import { useFormContext } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getListCategoriesService, selectedCategoriesFromListService } from "@/src/services/recipes";
import Layout from "../Components/Layout";
import { ActivityIndicator, ScrollView } from "@/src/components/native";
import { Hero, LineDivider, LoadingScreen } from "@/src/components/custom";
import ItemCategory from "../Components/ItemCategory";
import i18next from "@/src/Translate";

type TypeListData = {
  id: number;
  name: string;
  description: string;
  selected: boolean;
};

type TypeData = {
  list: any[];
};

const QUERY_KEY = "recipe-list-categories-screen";

const RecipeCategories = memo(() => {
  const { watch } = useFormContext();
  const values = watch();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getListCategoriesService(values.id),
    enabled: values.id ? true : false,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (id: number) => await selectedCategoriesFromListService(values.id, id),
    onSuccess: (response) => {
      queryClient.setQueryData([QUERY_KEY], (oldData: TypeData) => ({
        ...oldData,
        list: oldData.list.map((row) => (row.id === response.id ? { ...row, selected: response.selected } : row)),
      }));
    },
  });

  const handleMutation = (id: number) => {
    mutation.mutate(id);
  };

  if (isLoading || isFetching) return <LoadingScreen label={i18next.t("Loading")} />;

  if (isError) return <Text>An ocurred error!</Text>;

  if (data) {
    return (
      <Layout title="" href="RecipeType">
        <ScrollView>
          <Hero
            style={{ marginTop: 20, marginBottom: 20 }}
            label={i18next.t("Selecciona algunas categorias!")}
            sublabel={i18next.t("Esto ayudara muchisimo!")}
          />

          {mutation.isPending && <ActivityIndicator />}

          <LineDivider />

          {data.list.map((row: TypeListData) => (
            <ItemCategory key={row.name} onPress={() => handleMutation(row.id)} {...row} />
          ))}
        </ScrollView>
      </Layout>
    );
  }
});

export default RecipeCategories;
