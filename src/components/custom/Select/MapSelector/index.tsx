import { memo, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { MapPressEvent, Marker, MarkerDragStartEndEvent, Region } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import KeyApi from "../../../../constants/KeyApi";
import { IsLoading } from "../../Loaders";

type Props = {
  setValue: (value: string) => void;
};

const MapSelector = memo(({ setValue }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [region, setRegion] = useState<Region | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string>("");

  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permiso de ubicación denegado");
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      // Get info by location
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`
      );

      if (response.data && response.data.results && response.data.results.length > 0) {
        console.log(response.data.results[0].address_components);
        // setAddress(addressComponents.formattedAddress);
      }

      setValue("latitude", latitude, { shouldDirty: true });
      setValue("longitude", longitude, { shouldDirty: true });

      setMarkerPosition({ latitude, longitude });

      setLoading(false);
    };

    requestLocationPermission();
  }, []);

  const handleMarkerDragEnd = (event: MarkerDragStartEndEvent | MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setValue("latitude", latitude, { shouldDirty: true });
    setValue("longitude", longitude, { shouldDirty: true });

    setMarkerPosition({ latitude, longitude });
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <IsLoading label="Loading map" />
      </View>
    );
  }

  return (
    <>
      {region && (
        <MapView style={styles.map} initialRegion={region} onPress={handleMarkerDragEnd} showsUserLocation>
          {markerPosition && (
            <Marker coordinate={markerPosition} title="Mi Ubicación" draggable onDragEnd={handleMarkerDragEnd} />
          )}
        </MapView>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  map: {
    height: 200,
    width: "100%",
  },
});

export default MapSelector;
