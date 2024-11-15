import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { getMyLocations } from "../../../../services/orders";
import EmptyLocations from "./EmptyLocations";
import SavedLocations from "./SavedLocations";
import { useNavigation } from "../../../../components/native";

const MyLocations = memo(() => {
  const navigation = useNavigation();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["locations-useQuery"],
    queryFn: getMyLocations,
  });

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (isError) return <Text>An ocurred error!</Text>;

  if (data) {
    return (
      <>
        {data.length === 0 && <EmptyLocations />}

        {data.length > 0 && <SavedLocations data={data} />}

        <TouchableOpacity onPress={() => navigation.navigate("ScreenNewLocation")} style={styles.button}>
          <Text style={styles.textButton}>Agregar direccion</Text>
        </TouchableOpacity>
      </>
    );
  }
});

const styles = StyleSheet.create({
  button: {
    margin: 20,
    backgroundColor: "#4ADE80",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  textButton: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default MyLocations;
