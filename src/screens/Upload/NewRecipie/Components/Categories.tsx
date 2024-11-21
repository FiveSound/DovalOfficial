import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { StyleSheet } from "react-native";
import { getListCategoriesService, selectedCategoriesFromListService } from "../../../../services/recipes";
import {
  Container,
  FlexContainer,
  IsLoading,
  LineDivider,
  LoadingScreen,
  Perks,
  SearchHeader,
  Typography,
} from "../../../../components/custom";
import { LabelVariants } from "./LabelVariants";
import i18next from "@/src/Translate";
import { ScrollView } from "@/src/components/native";

type CategoryType = {
  id: number;
  name: string;
  description: string;
  selected: boolean;
};

const Categories = () => {
  const { watch } = useFormContext();

  const values = watch();

  const [success, setSuccess] = useState(false);

  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["recipe-list-categories", values.id],
    queryFn: getListCategoriesService,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["recipe-list-categories", values.id],
    mutationFn: async (typeID: number) => {
      return await selectedCategoriesFromListService(values.id, typeID);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(["recipe-list-categories", values.id], (oldData: { list: CategoryType[] }) => ({
        ...oldData,
        list: oldData.list.map((row) => ({
          ...row,
          selected: row.id === result.id ? result.selected : row.selected,
        })),
      }));

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    },
  });

  if (isLoading || isFetching) return <LoadingScreen label={i18next.t("Loading")} />;

  if (isError) return <Typography variant="H4title">{i18next.t("An ocurred error fetch!")}</Typography>;

  if (data) {
    return (
      <Container style={styles.container} label={i18next.t("Categories")} showBack={true} showHeader={true}>
        {/* <SearchHeader
          // onChange={(text) => {
          //   setSearchTerm(text); 
          // }}
          placeholder="Buscar categorias"
        /> */}
        <LineDivider variant="secondary" />
        <ScrollView>
        <LabelVariants data={data} onPress={(id) => mutation.mutate(id)} isLoading={isLoading} />
        </ScrollView>
        {success && <Perks status="success" label={i18next.t("Saved successfully!")} Reverse={false} />}
        {mutation.isPending && <IsLoading />}
      </Container>
    );
  }
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    marginBottom: 10,
    fontWeight: "bold",
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    width: "100%",
    borderWidth: 1,
  },
});
