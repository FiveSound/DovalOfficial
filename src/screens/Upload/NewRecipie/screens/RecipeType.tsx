import { memo } from "react";
import { Text } from "react-native";
import { useFormContext } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getListTypesService, selectedTypeFromListService } from "@/src/services/recipes";
import Layout from "../components/Layout";
import { ActivityIndicator, ScrollView } from "@/src/components/native";
import { Hero, LineDivider, LoadingScreen } from "@/src/components/custom";
import ItemCategory from "../components/ItemCategory";
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

const QUERY_KEY = "recipe-list-types-screen";

const RecipeType = memo(() => {
  const { watch } = useFormContext();
  const values = watch();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getListTypesService(values.id),
    enabled: values.id ? true : false,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (typeID: number) => await selectedTypeFromListService(values.id, typeID),
    onSuccess: (response) => {
      console.log({ response });

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
      <Layout title="" href="RecipeAddDish">
        <ScrollView>
          <Hero
            style={{ marginTop: 20, marginBottom: 20 }}
            label={i18next.t("Selecciona algunos types!")}
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

export default RecipeType;
