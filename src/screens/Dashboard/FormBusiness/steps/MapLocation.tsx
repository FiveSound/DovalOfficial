import { memo, useEffect, useState, useCallback } from "react";
import { useNavigation } from "../../../../components/native";
import { Alert, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import MapView, {
  Marker,
  Callout,
  PROVIDER_GOOGLE,
  Region,
  MapPressEvent,
} from "react-native-maps";
import {
  getAddressDetailsByCoordsIdService,
  getAddressDetailsByPlaceIdService,
} from "../../../../services/locations";
import { useFormContext } from "react-hook-form";
import mapStyle from "@/src/constants/mapStyle";
import { Container, LoadingScreen } from "@/src/components/custom";
import i18next from "@/src/Translate";
import { COLORS } from "@/src/constants/theme";

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

interface MarkerCoordinate {
  latitude: number;
  longitude: number;
}

const MapLocation = memo((props: Props) => {
  const { setValue } = useFormContext();
  const navigation = useNavigation();
  const [marker, setMarker] = useState<MarkerCoordinate | null>(null);
  const [location, setLocation] = useState<AddressDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [mapRegion, setMapRegion] = useState<Region | null>(null);

  useEffect(() => {
    if (props.route.params.placeId) {
      const getLocation = async () => {
        try {
          const response = await getAddressDetailsByPlaceIdService(
            props.route.params.placeId
          );


          if (!response?.latitude || !response?.longitude) {
            console.error("Invalid response: Missing latitude or longitude");
            throw Error("Couldn't get location");
          }

          const newRegion: Region = {
            latitude: response.latitude,
            longitude: response.longitude,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          };

          setMapRegion(newRegion);

          const newMarker: MarkerCoordinate = {
            latitude: response.latitude,
            longitude: response.longitude,
          };
          setMarker(newMarker);

          setLocation(response);
          setLoading(false);
        } catch (error) {
          console.warn("Error in getLocation:", error);
          Alert.alert("Error", "Ocurrió un error al obtener la ubicación.");
          setLoading(false);
        }
      };

      getLocation();
    }
  }, [props.route.params.placeId]);

  const onRegionChangeComplete = (newRegion: Region) => {
    setMapRegion(newRegion);
  };

  const handleDragEnd = async (e: any) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    const newMarker: MarkerCoordinate = {
      latitude,
      longitude,
    };
    setMarker(newMarker);

    try {
      const response = await getAddressDetailsByCoordsIdService(
        latitude,
        longitude
      );
      setLocation(response);
    } catch (error) {
      console.warn("Error in handleDragEnd:", error);
      Alert.alert("Error", "Ocurrió un error al actualizar la ubicación.");
    }
  };

  const handleMapPress = useCallback(
    async (e: MapPressEvent) => {
      const { latitude, longitude } = e.nativeEvent.coordinate;

      const newMarker: MarkerCoordinate = {
        latitude,
        longitude,
      };
      setMarker(newMarker);

      const newRegion: Region = {
        latitude,
        longitude,
        latitudeDelta: 0.009,
        longitudeDelta: 0.009,
      };
      setMapRegion(newRegion);

      try {
        const response = await getAddressDetailsByCoordsIdService(
          latitude,
          longitude
        );

        setLocation(response);
      } catch (error) {
        console.warn("Error in handleMapPress:", error);
        Alert.alert("Error", "Ocurrió un error al actualizar la ubicación.");
      }
    },
    [setMarker, setMapRegion, setLocation]
  );


  if (loading || !mapRegion) {
    return <LoadingScreen label={i18next.t("Loading...")} />;
  }

  return (
    <Container
    showHeader={true}
    label={i18next.t("Location")}
    labels={i18next.t("Confirm Location")}
    showFooter={true}
    onPressButtons={() => {
      if (location) {
        setValue("country", location.country);
        setValue("state", location.state);
        setValue("city", location.city);
        setValue("street", location.street);
        setValue("formatted_address", location.formatted_address);
        setValue("latitude", location.latitude);
        setValue("longitude", location.longitude);
        setValue("postalCode", location.postalCode);
        setValue("placeID", props.route.params.placeId);
      } else {
      }
      setValue("search_location", "");
      navigation.goBack();
    }}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={mapRegion}
        customMapStyle={mapStyle}
        onRegionChangeComplete={onRegionChangeComplete}
        onPress={handleMapPress}
        showsUserLocation={true}
        zoomControlEnabled
      >
        {marker && (
          <Marker
            coordinate={marker}
            onDragEnd={handleDragEnd}
            draggable
            pinColor={COLORS.primary}
          >
            <Callout>
              <View style={styles.callout}>
                <Text style={styles.location}>{location?.street}</Text>
                <Text style={styles.location}>
                  {location?.formatted_address}
                </Text>
              </View>
            </Callout>
          </Marker>
        )}
      </MapView>
    </Container>
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