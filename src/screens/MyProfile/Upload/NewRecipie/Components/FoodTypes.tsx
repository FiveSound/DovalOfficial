import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  getListTypesService,
  selectedTypeFromListService,
} from "../../../../../services/recipes";
import { Container, IsLoading, LineDivider, Perks, SearchHeader } from "../../../../../components/custom";
import { LabelVariants } from "./LabelVariants";

type CategoryType = {
  id: number;
  name: string;
  description: string;
  selected: boolean;
};

const FoodTypes = () => {
  const { watch } = useFormContext();
  const values = watch();

  const [success, setSuccess] = useState(false);

  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["recipe-list-types", values.id],
    queryFn: getListTypesService,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ["recipe-list-types", values.id],
    mutationFn: async (typeID: number) => {
      return await selectedTypeFromListService(values.id, typeID);
    },
    onSuccess: (result) => {
      queryClient.setQueryData(
        ["recipe-list-types", values.id],
        (oldData: { list: CategoryType[] }) => ({
          ...oldData,
          list: oldData.list.map((row) => ({
            ...row,
            selected: row.id === result.id ? result.selected : row.selected,
          })),
        })
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    },
  });

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (isError) return <Text>An ocurred error fetch!</Text>;

  if (data) {
    return (
      <Container 
      style={styles.container}
      label="Categorias"
      showBack={true}
      showHeader={true}
      >
        {/* <SearchHeader
          onChange={(text) => {
            setSearchTerm(text); 
          }}
          placeholder="Buscar categorias"
        /> */}
        <LineDivider variant='secondary' />
        <LabelVariants data={data} onPress={(id) => mutation.mutate(id)} isLoading={isLoading}/>
      {success && <Perks status='success' label="Guardado con exito!" Reverse={false}/>}
      {mutation.isPending && <IsLoading />}
    </Container>
    );
  }
};

export default FoodTypes;

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
  item: {
    padding: 10,
    width: "100%",
  },
});