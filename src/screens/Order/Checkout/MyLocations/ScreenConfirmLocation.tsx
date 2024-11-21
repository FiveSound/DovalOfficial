import { memo, useEffect, useState, useCallback } from "react";
import {
  Alert,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
} from "react-native";
import MapView, {
  Marker,
  PROVIDER_GOOGLE,
  Region,
  MapPressEvent,
} from "react-native-maps";
import TitleWithBack from "./TitleWithBack";
import { useNavigation } from "../../../../components/native";
import {
  getAddressDetailsByCoordsIdService,
  getAddressDetailsByPlaceIdService,
} from "../../../../services/locations";
import mapStyle from "@/src/constants/mapStyle";
import {
  Avatars,
  Container,
  CustomMarker,
  LoadingScreen,
} from "@/src/components/custom";
import i18next from "@/src/Translate";
import { Location08Icon } from "@/src/constants/IconsPro";
import useDebounce from "../../../../hooks/useDebounce";

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

const ScreenConfirmLocation = memo((props: Props) => {
  const navigation = useNavigation();
  const [region, setRegion] = useState<Region | null>(null);
  const [marker, setMarker] = useState<Region | null>(null);
  const [location, setLocation] = useState<AddressDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const debouncedRegion = useDebounce(region, 1000);

  const fetchLocationByPlaceId = useCallback(async () => {
    if (props.route.params.placeId) {
      try {
        const response = await getAddressDetailsByPlaceIdService(
          props.route.params.placeId
        );

        if (!response?.latitude || !response?.longitude) {
          throw Error("No se pudo obtener la ubicación.");
        }

        setRegion({
          latitude: response.latitude,
          longitude: response.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });

        setMarker({
          latitude: response.latitude,
          longitude: response.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        });

        setLocation(response);
        setLoading(false);
      } catch (error) {
        console.warn(error);
        Alert.alert("Error", "Ocurrió un error al obtener la ubicación.");
        setLoading(false);
      }
    }
  }, [props.route.params.placeId]);

  useEffect(() => {
    fetchLocationByPlaceId();
  }, [fetchLocationByPlaceId]);

  // // Manejador para actualizar la región del mapa con debounce
  useEffect(() => {
  }, [debouncedRegion]);

  const handleMapPress = async (e: MapPressEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    setMarker({
      latitude,
      longitude,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    });

    // setLoading(true);
    try {
      const response = await getAddressDetailsByCoordsIdService(
        latitude,
        longitude
      );
      setLocation(response);
      // setLoading(false);
    } catch (error) {
      console.warn(error);
      Alert.alert(
        "Error",
        "Ocurrió un error al obtener los detalles de la ubicación."
      );
      // setLoading(false);
    }
  };

  const confirmLocation = () => {
    if (!location) {
      Alert.alert("Error", "No se ha seleccionado una ubicación válida.");
      return;
    }
    navigation.navigate("ScreenSaveLocation", {
      location,
    });
  };

  if (loading || !region) {
    return <LoadingScreen label={i18next.t("Loading")} />;
  }

  return (
    <Container
      showHeader={true}
      label={i18next.t("Confirmar ubicación")}
      onPressButtons={confirmLocation}
      showFooter={true}
      labels={i18next.t("Confirm")}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        customMapStyle={mapStyle}
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
        showsUserLocation={true}
        zoomControlEnabled
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        loadingEnabled={true}
        loadingIndicatorColor="#666666"
        loadingBackgroundColor="#eeeeee"
        onPress={handleMapPress}
      >
        {marker && (
          <Marker coordinate={marker} draggable>
            <CustomMarker>
              <Location08Icon />
            </CustomMarker>
          </Marker>
        )}
      </MapView>
      {location && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>
            {location.formatted_address || i18next.t("Dirección no disponible")}
          </Text>
        </View>
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  map: {
    flex: 1,
    width: "100%",
  },
  addressContainer: {
    position: "absolute",
    bottom: 100,
    left: 20,
    right: 20,
    backgroundColor: "rgba(255,255,255,0.9)",
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  addressText: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
});

export default ScreenConfirmLocation;