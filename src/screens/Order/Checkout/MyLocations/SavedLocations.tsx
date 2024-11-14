import { memo } from "react";
import { View, Text, FlatList } from "react-native";

type Props = {
  data: any[];
};

const SavedLocations = memo((props: Props) => {
  return (
    <View>
      <Text>Saved Locations</Text>
      <FlatList data={props.data} renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>} />
    </View>
  );
});

export default SavedLocations;
