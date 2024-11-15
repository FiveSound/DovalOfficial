import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, StyleSheet, FlatList } from "react-native";
import SearchInput from "./SearchInput";
import { searchLocalAddressService } from "../../../../services/locations";
import { useNavigation } from "../../../../components/native";

const ComponentSearchLocations = memo(() => {
  const [results, setResults] = useState<any[]>([]);

  const navigation = useNavigation();

  const { watch, setValue } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const values = watch();

  useEffect(() => {
    searchLocalAddressService(values.search)
      .then((data) => {
        console.log(data);
        setResults(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [values.search]);

  return (
    <>
      <SearchInput value={values.search} setValue={setValue} />
      <FlatList
        data={results}
        renderItem={({ item }) => (
          <Text
            onPress={() => {
              navigation.navigate("ScreenConfirmLocation", {
                placeId: item.place_id,
              });
            }}
            style={styles.item}
          >
            {item.description}
          </Text>
        )}
        ListEmptyComponent={<Text>No hay items</Text>}
        keyExtractor={(item) => item.description}
      />
    </>
  );
});

const styles = StyleSheet.create({
  container: {},
  item: {
    padding: 10,
    marginBottom: 8,
  },
});

export default ComponentSearchLocations;
