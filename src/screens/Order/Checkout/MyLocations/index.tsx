import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Alert, Modal, View, Text, StyleSheet, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { getMyLocations } from "../../../../services/orders";
import { iconsNative, Ilustrations } from "../../../../constants";
import TitleWithBack from "./TitleWithBack";
import FromMap from "./FromMap";
import FromLocation from "./FromLocation";
import FormNewLocation from "./FormNewLocation";

const MyLocations = memo(() => {
  const [modalVisible, setModalVisible] = useState(false);
  const [openMap, setOpenMap] = useState(false);
  const [selected, setSelected] = useState<{
    latitude: null | number;
    longitude: null | number;
    place_id: null | string;
  }>();

  const savedLocations = useQuery({
    queryKey: ["locations-useQuery"],
    queryFn: getMyLocations,
  });

  if (savedLocations.isLoading || savedLocations.isFetching) return <ActivityIndicator />;

  if (savedLocations.data) {
    return (
      <>
        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <TitleWithBack onPress={() => setModalVisible(!modalVisible)}>Agregar una nueva direccion</TitleWithBack>

          {openMap && (
            <FromMap
              onSuccess={(obj) => {
                setSelected(obj);
                setOpenMap(false);
              }}
            />
          )}

          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {!openMap && (
                <FromLocation
                  onSuccess={(obj) => {
                    setSelected(obj);
                    setOpenMap(false);
                  }}
                />
              )}
            </View>
          </View>

          {/* <Text style={{ fontSize: 30 }}>Aqui va el Bndito form que envia la direccion al Bck y finaliza</Text> */}
          {/* {selected && <Text>{JSON.stringify(selected, null, 2)}</Text>} */}
          {selected && <FormNewLocation selected={selected} />}

          <TouchableOpacity onPress={() => setOpenMap(!openMap)} style={styles.mapButton}>
            <Image style={styles.mapIcon} source={iconsNative.Map} />
            <Text style={styles.mapButtonText}>Seleccionar en el mapa</Text>
          </TouchableOpacity>
        </Modal>

        <View style={styles.container}>
          <TitleWithBack onPress={() => {}}>Mis direcciones</TitleWithBack>

          <View>
            {savedLocations.data.length === 0 && (
              <>
                <Image style={styles.emptyMedia} source={Ilustrations.Map} />
                <Text style={styles.emptyTitle}>No tienes direcciones</Text>
              </>
            )}
            {savedLocations.data.length > 0 && <Text>{JSON.stringify(savedLocations.data, null, 2)}</Text>}
          </View>

          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
            <Text style={styles.textButton}>Agregar dirección</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 19,
    textAlign: "center",
  },
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
  button: {
    width: 360,
    borderWidth: 1,
    padding: 10,
    borderRadius: 30,
    marginBottom: 10,
  },
  textButton: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#4ADE80",
  },
  buttonClose: {},
  textStyle: {
    fontWeight: "bold",
    textAlign: "center",
  },
  mapButton: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    padding: 10,
  },
  mapIcon: {
    width: 20,
    height: 20,
  },
  mapButtonText: {
    textAlign: "center",
    fontWeight: "bold",
  },
});

export default MyLocations;
