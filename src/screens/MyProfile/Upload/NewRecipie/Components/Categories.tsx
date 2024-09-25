import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  StyleSheet,
} from "react-native";
import { getListCategoriesService, selectedCategoriesFromListService } from "../../../../../services/recipes";
import { IsLoading } from "../../../../../components/custom";
import { TextInput, View, Text, TouchableOpacity } from "../../../../../components/native";

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
      queryClient.setQueryData(
        ["recipe-list-categories", values.id],
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

  if (isLoading || isFetching) return <IsLoading />;

  if (isError) return <Text>An ocurred error fetch!</Text>;

  if (data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Categories</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories"
        />

        {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}

        {data.list.map((row: CategoryType) => (
          <TouchableOpacity
            key={row.id}
            onPress={() => mutation.mutate(row.id)}
            style={[
              styles.item,
              {
                backgroundColor: row.selected ? "#DDD" : "transparent",
              },
            ]}
          >
            <Text>{row.name}</Text>
            <Text>{row.description}</Text>
          </TouchableOpacity>
        ))}

        {success && <Text>Guardado con exito!</Text>}
        {mutation.isPending && <IsLoading />}
      </View>
    );
  }
};

export default Categories;

const styles = StyleSheet.create({
  container: {
    margin: 10,
    flex: 1,
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