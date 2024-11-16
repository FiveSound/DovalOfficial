import { memo, useEffect, useState } from "react";
import { useNavigation } from "../../../../components/native";
import { ActivityIndicator, Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Region,
  MarkerDragStartEndEvent,
  MapPressEvent,
} from "react-native-maps";
import { getAddressDetailsByCoordsIdService, getAddressDetailsByPlaceIdService } from "../../../../services/locations";
import { useFormContext } from "react-hook-form";

type Props = {
  route: any;
};

interface AddressDetails {
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  formatted_address?: string;
  latitude?: number;
  longitude?: number;
}

const MapLocation = memo((props: Props) => {
  const { setValue } = useFormContext();
  const navigation = useNavigation();
  const [region, setRegion] = useState<Region | null>(null);
  const [marker, setMarker] = useState<Region | null>(null);
  const [location, setLocation] = useState<AddressDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (props.route.params.placeId) {
      const getLocation = async () => {
        try {
          const response = await getAddressDetailsByPlaceIdService(props.route.params.placeId);

          if (!response?.latitude || !response?.longitude) throw Error("Couldn't get location");

          setRegion({
            latitude: response.latitude,
            longitude: response.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          setMarker({
            latitude: response.latitude,
            longitude: response.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          });

          setLocation(response);

          setLoading(false);
        } catch (error) {
          console.warn(error);
          Alert.alert("Error", "Ocurrió un error al obtener la ubicación.");
          setLoading(false);
        }
      };

      getLocation();
    }
  }, [props.route.params.placeId]);

  // Manejador para actualizar la región del mapa
  const onRegionChangeComplete = (newRegion: Region) => {
    setRegion(newRegion);
  };

  const handleDragEnd = async (e: MarkerDragStartEndEvent | MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setMarker({
      latitude,
      longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });

    const response = await getAddressDetailsByCoordsIdService(latitude, longitude);
    setLocation(response);
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
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        onRegionChangeComplete={onRegionChangeComplete}
        showsUserLocation={true}
        zoomControlEnabled
      >
        {marker && (
          <Marker coordinate={marker} onDragEnd={handleDragEnd} draggable>
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.location}>{location?.street}</Text>
                <Text style={styles.location}>{location?.formatted_address}</Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>

      <TouchableOpacity
        onPress={() => {
          setValue("country", location?.country);
          setValue("state", location?.state);
          setValue("city", location?.city);
          setValue("street", location?.street);
          setValue("formatted_address", location?.formatted_address);
          setValue("latitude", location?.latitude);
          setValue("longitude", location?.longitude);
          setValue("postalCode", location?.postalCode);
          setValue("search_location", "");
          navigation.goBack();
          // navigation.navigate("FormBusiness/Address");
        }}
        style={styles.button}
      >
        <Text style={styles.textButton}>Confirmar ubicacion</Text>
      </TouchableOpacity>
    </>
  );
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    flex: 1,
    width: "100%",
  },
  callout: {
    width: 250,
  },
  location: {
    fontSize: 16,
  },
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

export default MapLocation;
