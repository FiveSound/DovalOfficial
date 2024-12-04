import { memo } from "react";
import { StyleSheet } from "react-native";
import { Text, TouchableOpacity, useNavigation, View } from "@/src/components/native";

const MoreDetails = memo(() => {
  const navigation = useNavigation();

  return (
    <View style={styles.flex}>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("RecipeCategories")}>
        <Text style={styles.btn_txt}>Selct Category</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("RecipeType")}>
        <Text style={styles.btn_txt}>Select Types</Text>
      </TouchableOpacity>
    </View>
  );
});

export default MoreDetails;

const styles = StyleSheet.create({
  flex: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  btn: {
    marginTop: 10,
    backgroundColor: "#FF5500",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  btn_txt: {
    color: "#fff",
    fontWeight: "bold",
  },
});
