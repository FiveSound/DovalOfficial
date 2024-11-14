import { memo } from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import { Ilustrations } from "../../../../constants";

const EmptyLocations = memo(() => {
  return (
    <View style={styles.container}>
      <Image style={styles.emptyMedia} source={Ilustrations.Map} />
      <Text style={styles.emptyTitle}>No tienes direcciones</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyMedia: {
    width: 300,
    height: 300,
    marginBottom: 10,
  },
  emptyTitle: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default EmptyLocations;
