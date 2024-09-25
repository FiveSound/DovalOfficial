import { useQuery } from "@tanstack/react-query";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getRecipeDrafts } from "../../../../../services/recipes";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Recipe } from "../../../../../types/comments/types";

const Drafts = () => {
  const navigation = useNavigation<NavigationProp<any>>();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["recipes-draft-list"],
    queryFn: getRecipeDrafts,
  });

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (isError) return <Text>An ocurred fetch error!</Text>;

  if (data) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Drafts</Text>

        {data.list.length === 0 && <Text>No hay borradores</Text>}
        {data.list.map((row: Recipe) => (
          <TouchableOpacity
            onPress={() => {
              navigation.reset({
                index: 0,
                routes: [
                  { name: "TabsNavigator" },
                  { name: "UploadRecipe", params: { id: row.id } },
                ],
              });
            }}
            style={styles.item}
            key={row.id}
          >
            <Text style={styles.itemTitle}>{row.name}</Text>
            <Text style={styles.itemSubtitle}>{row.description}</Text>
            <Text>{row.created_at}</Text>
          </TouchableOpacity>
        ))}
        {/* <Text selectable>{JSON.stringify(data, null, 2)}</Text> */}
      </View>
    );
  }
};

export default Drafts;

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    alignItems: "center",
  },
  item: {
    marginBottom: 10,
    padding: 10,
    width: "100%",
    borderWidth: 1,
    borderRadius: 4,
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemSubtitle: {},
  title: {
    marginBottom: 10,
    fontWeight: "bold",
  },
});