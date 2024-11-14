import { memo, useState, useEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Text, Alert, TouchableOpacity } from "react-native";
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Region,
  MarkerDragStartEndEvent,
  MapPressEvent,
} from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import KeyApi from "../../../../constants/KeyApi";

type Props = {
  onSuccess: (obj: object) => void;
};

const FromMap = memo((props: Props) => {
  const [region, setRegion] = useState<Region | null>(null);
  const [direccion, setDireccion] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const obtenerUbicacion = async () => {
      try {
        // Solicitar permisos de ubicación
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Permiso denegado",
            "No se pudo obtener la ubicación. Por favor, activa los permisos de ubicación en la configuración de tu dispositivo."
          );
          setLoading(false);
          return;
        }

        // Obtener la ubicación actual
        let ubicacion = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = ubicacion.coords;

        // Definir la región del mapa
        setRegion({
          latitude,
          longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });

        // Geocodificación inversa para obtener la dirección
        let direccionObtenida = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        if (direccionObtenida.length > 0) {
          const direccionCompleta = `${direccionObtenida[0].name || ""}, ${direccionObtenida[0].street || ""}, ${direccionObtenida[0].city || ""}, ${direccionObtenida[0].region || ""}, ${direccionObtenida[0].country || ""}`;
          setDireccion(direccionCompleta);
        } else {
          setDireccion("Dirección no disponible");
        }

        setLoading(false);
      } catch (error) {
        console.warn(error);
        Alert.alert("Error", "Ocurrió un error al obtener la ubicación.");
        setLoading(false);
      }
    };

    obtenerUbicacion();
  }, []);

  const handleDragEnd = async (e: MarkerDragStartEndEvent | MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    try {
      // Actualizar la región con las nuevas coordenadas
      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      // Realizar geocodificación inversa para obtener la nueva dirección
      let direccionObtenida = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });

      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`
      );
      const fetchedAddress = response.data.results[0].formatted_address;
      const addressComponents = response.data.results[0].address_components;
      const city = addressComponents.find((component: any) => component.types.includes("locality"))?.long_name || "";

      console.log({ fetchedAddress, city });

      if (direccionObtenida.length > 0) {
        const direccionCompleta = `${direccionObtenida[0].name || ""}, ${direccionObtenida[0].street || ""}, ${direccionObtenida[0].city || ""}, ${direccionObtenida[0].region || ""}, ${direccionObtenida[0].country || ""}`;
        setDireccion(direccionCompleta);
      } else {
        setDireccion("Dirección no disponible");
      }

      // Opcional: Retornar la dirección al componente padre
      // onAddressChange(direccionCompleta);
    } catch (error) {
      console.warn(error);
      Alert.alert("Error", "Ocurrió un error al obtener la nueva ubicación.");
    }
  };

  if (loading || !region) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Cargando ubicación...</Text>
      </View>
    );
  }

  return (
    <>
      <MapView
        provider={PROVIDER_GOOGLE} // Opcional: usar Google Maps
        style={styles.map}
        region={region}
        onPress={(e) => handleDragEnd(e)}
        showsUserLocation={true}
        showsMyLocationButton={true}
      >
        <Marker coordinate={region} onDragEnd={(e) => handleDragEnd(e)} draggable>
          <Callout>
            <View style={styles.callout}>
              <Text style={styles.direccion}>{direccion}</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <TouchableOpacity
        onPress={() => {
          console.log("La vida aes un carnaval!", region);
          props.onSuccess({ latitude: region.latitude, longitude: region.longitude });
        }}
        style={{
          backgroundColor: "#ff0000",
          padding: 10,
          borderRadius: 5,
          marginTop: 10,
        }}
        disabled={!region.latitude}
      >
        <Text>Confirmar ubicacion</Text>
      </TouchableOpacity>
    </>
  );
});

export default FromMap;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  callout: {
    width: 250,
  },
  direccion: {
    fontSize: 16,
  },
});
