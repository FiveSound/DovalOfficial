import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getListCategoriesService, selectedCategoriesFromListService } from "@/src/services/recipes";
import Layout from "../Components/Layout";
import { ActivityIndicator, ScrollView } from "@/src/components/native";
import { Container, Hero, IsLoading, LineDivider, LoadingScreen } from "@/src/components/custom";
import ItemCategory from "../Components/ItemCategory";
import i18next from "@/src/Translate";
import { SIZES } from "@/src/constants/theme";

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


  if (data) {
    return (
      <Container
        label="Categorias"
        showBack={true}
        showHeader={true}
      >     
          {mutation.isPending && <IsLoading />}
        <ScrollView contentContainerStyle={{ paddingBottom: SIZES.height / 10 }}>
          {data.list.map((row: TypeListData) => (
            <ItemCategory key={row.name} onPress={() => handleMutation(row.id)} {...row} />
          ))}
        </ScrollView>
      </Container>
    );
  }
});

export default RecipeCategories;
