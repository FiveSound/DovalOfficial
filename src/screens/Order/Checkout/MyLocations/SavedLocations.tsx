import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { deleteLocationService, setDefaultLocationService } from "../../../../services/orders";
import { useNavigation } from "../../../../components/native";

type Props = {
  data: any[];
};

const SavedLocations = memo((props: Props) => {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const handleDefault = async (locationID: string) => {
    const response = await setDefaultLocationService(locationID);

    if (response) {
      queryClient.invalidateQueries({ queryKey: ["screen-checkout-orders-useQuery"] });
      navigation.navigate("Checkout");
    }
  };

  const handleDelete = async (locationID: string) => {
    const response = await deleteLocationService(locationID);
    if (response.success) {
      // queryClient.invalidateQueries({ queryKey: ["screen-checkout-orders-useQuery"] });
      // navigation.navigate("Checkout");
    }
  };

  return (
    <View>
      <Text style={styles.title}>Saved Locations</Text>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDefault(item.locationID)} style={[styles.item]}>
            <Text style={styles.subtitle}>Tag: {item.tag}</Text>
            <Text>City: {item.city}</Text>
            <Text>Apartment: {item.apartment}</Text>
            <Text>Details: {item.details}</Text>
            {item.selected && <Text style={styles.selected}>Default</Text>}

            {/* {!item.selected && (
              <TouchableOpacity onPress={() => handleDelete(item.locationID)} style={styles.deleteButton}>
                <Text>Eliminar</Text>
              </TouchableOpacity>
            )} */}
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  item: {
    padding: 10,
    marginBottom: 10,
  },
  selected: {
    maxWidth: 80,
    padding: 5,
    backgroundColor: "#FF5500",
    color: "white",
    borderRadius: 10,
    textAlign: "center",
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "red",
  },
});

export default SavedLocations;
