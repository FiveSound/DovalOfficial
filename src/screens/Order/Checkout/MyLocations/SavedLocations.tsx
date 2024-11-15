import { memo } from "react";
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { setDefaultLocationService } from "../../../../services/orders";

type Props = {
  data: any[];
};

const SavedLocations = memo((props: Props) => {
  const handleDefault = async (locationID: string) => {
    const response = await setDefaultLocationService(locationID);
    console.log({ response });
  };

  return (
    <View>
      <Text style={styles.title}>Saved Locations</Text>
      <FlatList
        data={props.data}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleDefault(item.locationID)} style={styles.item}>
            <Text>{item.city}</Text>
            <Text>{item.tag}</Text>
            <Text>{item.apartment}</Text>
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
  item: {
    padding: 10,
    marginBottom: 10,
  },
});

export default SavedLocations;
