import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
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
    if (values.search.trim() === "") {
      setResults([]);
      return;
    }

    searchLocalAddressService(values.search)
      .then((data) => {
        setResults(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [values.search]);

  return (
    <View style={styles.container}>
      <SearchInput value={values.search} setValue={setValue} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {results.length > 0 ? (
          results.map((item) => (
            <TouchableOpacity
              key={item.place_id}
              onPress={() => {
                navigation.navigate("ScreenConfirmLocation", {
                  placeId: item.place_id,
                });
              }}
              style={styles.itemContainer}
            >
              <Text style={styles.itemText}>{item.description}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.emptyText}>No hay items</Text>
        )}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  scrollContainer: {
    width: "100%",
    paddingVertical: 10,
  },
  itemContainer: {
    padding: 10,
    marginBottom: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
});

export default ComponentSearchLocations;