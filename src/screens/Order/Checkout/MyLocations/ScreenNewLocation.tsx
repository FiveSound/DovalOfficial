import { memo } from "react";
import { StyleSheet } from "react-native";
import TitleWithBack from "./TitleWithBack";
import SearchResults from "./ComponentSearchLocations";
import { useNavigation } from "../../../../components/native";

const ScreenNewLocation = memo(() => {
  const navigation = useNavigation();
  return (
    <>
      <TitleWithBack onPress={() => navigation.goBack()}>Agregar una nueva direccion</TitleWithBack>
      <SearchResults />
    </>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "white",
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
  },
});

export default ScreenNewLocation;
