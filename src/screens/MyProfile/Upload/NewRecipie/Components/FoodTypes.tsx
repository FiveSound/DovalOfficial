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
      <View style={styles.container}>
        <Text style={styles.title}>Food Type</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories"
        />

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
        {mutation.isPending && <ActivityIndicator size={40} />}
      </View>
    );
  }
};

export default FoodTypes;

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