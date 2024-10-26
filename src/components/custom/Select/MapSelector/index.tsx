import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Dimensions, Text, Button, Alert } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import KeyApi from '../../../../constants/KeyApi';
import mapStyle from '../../../../constants/mapStyle';
import { IsLoading } from '../../Loaders';

export type AddressComponent = {
  street: string;
  city: string;
  state: string;
  zip: string;
  formattedAddress: string;
};

export type SelectedLocation = AddressComponent & {
  latitude: number;
  longitude: number;
};

type MapSelectorProps = {
  initialLocation?: {
    latitude: number;
    longitude: number;
  };
  onLocationSelected: (location: SelectedLocation) => void;
};

const MapSelector: React.FC<MapSelectorProps> = ({ initialLocation, onLocationSelected }) => {
  const [region, setRegion] = useState<Region | null>(null);
  const [marker, setMarker] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [address, setAddress] = useState<string>('');
  const [addressLoading, setAddressLoading] = useState<boolean>(false);

  console.log('Address state initialized:', address, 'address');

  // Move fetchAddress outside of useEffect
  const fetchAddress = async (latitude: number, longitude: number) => {
    setAddressLoading(true);
    try {
      console.log('Fetching address from Google Geocode API');
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`
      );
      console.log('Geocode API response:', response.data);
      if (response.data && response.data.results && response.data.results.length > 0) {
        const addressComponents = parseAddressComponents(response.data.results[0].address_components);
        console.log('Address components obtained:', addressComponents);
        setAddress(addressComponents.formattedAddress);
        onLocationSelected({
          ...addressComponents,
          latitude,
          longitude,
        });
      } else {
        console.log('No address found for the selected location.');
        Alert.alert("Error", "No se pudo obtener la dirección para la ubicación seleccionada.");
      }
    } catch (error) {
      console.error("Error al obtener la dirección:", error);
      Alert.alert("Error", "Ocurrió un error al obtener la dirección.");
    } finally {
      setAddressLoading(false);
    }
  };

  // Debounce fetchAddress to prevent excessive calls
  const debouncedFetchAddress = debounce(fetchAddress, 1000);

  useEffect(() => {
    console.log('useEffect triggered with initialLocation:', initialLocation);

    const fetchLocation = async () => {
      if (initialLocation) {
        console.log('Setting region and marker based on initialLocation:', initialLocation);
        setRegion({
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
        setMarker(initialLocation);
        setLoading(false);
        await fetchAddress(initialLocation.latitude, initialLocation.longitude);
      } else {
        console.log('Requesting location permissions');
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          console.error("Permisos de ubicación no otorgados");
          Alert.alert("Error", "Permisos de ubicación no otorgados.");
          setLoading(false);
          return;
        }

        try {
          console.log('Obtaining current location using Expo Location');
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Highest,
          });
          console.log('Expo Location obtained:', location);
          const { latitude, longitude } = location.coords;
          setRegion({
            latitude,
            longitude,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          });
          setMarker({ latitude, longitude });

          // Obtener dirección
          await fetchAddress(latitude, longitude);
        } catch (error) {
          console.error("Error obteniendo ubicación actual:", error);
          Alert.alert("Error", "No se pudo obtener tu ubicación actual.");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchLocation();

    // Cleanup si es necesario
    return () => {
      // Limpiar timeout si aplica
    };
  }, [initialLocation]);

  const parseAddressComponents = (addressComponents: any[]): AddressComponent => {
    const getComponent = (type: string) => {
      const component = addressComponents.find((c) => c.types.includes(type));
      return component ? component.long_name : '';
    };

    return {
      street: getComponent('route'),
      city: getComponent('locality'),
      state: getComponent('administrative_area_level_1'),
      zip: getComponent('postal_code'),
      formattedAddress: addressComponents.find(c => c.types.includes('formatted_address'))?.long_name || '',
    };
  };

  const handleRegionChangeComplete = (newRegion: Region) => {
    console.log('Region changed to:', newRegion);
    setRegion(newRegion);
    setMarker({
      latitude: newRegion.latitude,
      longitude: newRegion.longitude,
    });
    // Opcional: actualizar la dirección al cambiar la región
    // debouncedFetchAddress(newRegion.latitude, newRegion.longitude);
  };

  const handleConfirmLocation = async () => {
    console.log('Confirm location button pressed');
    if (marker) {
      console.log('Marker coordinates:', marker);
      try {
        console.log('Fetching address for marker location from Google Geocode API');
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${marker.latitude},${marker.longitude}&key=${KeyApi.GoogleMapApi}`
        );
        console.log('Geocode API response for marker:', response.data);

        if (response.data && response.data.results && response.data.results.length > 0) {
          const addressComponents = parseAddressComponents(response.data.results[0].address_components);
          console.log('Address components:', addressComponents);
          setAddress(addressComponents.formattedAddress);
          onLocationSelected({
            ...addressComponents,
            latitude: marker.latitude,
            longitude: marker.longitude,
          });
        } else {
          console.log('No address found for the selected location.');
          Alert.alert("Error", "No se pudo obtener la dirección para la ubicación seleccionada.");
        }
      } catch (error) {
        console.error("Error al obtener la dirección:", error);
        Alert.alert("Error", "Ocurrió un error al obtener la dirección.");
      }
    } else {
      console.log('No marker selected.');
      Alert.alert("Error", "No se ha seleccionado ninguna ubicación.");
    }
  };

  if (loading || !region) {
    console.log('Loading state:', loading, 'Region:', region);
    return (
      <View style={styles.loader}>
        <IsLoading label='Loading map' />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}
        customMapStyle={mapStyle}
        onRegionChangeComplete={handleRegionChangeComplete}
        showsUserLocation={true}
        onPress={(e) => {
          console.log('Map pressed at coordinate:', e.nativeEvent.coordinate);
          setMarker(e.nativeEvent.coordinate);
          // Actualizar la dirección al tocar en el mapa
          fetchAddress(e.nativeEvent.coordinate.latitude, e.nativeEvent.coordinate.longitude);
        }}
      >
        {marker && (
          <Marker
            coordinate={marker}
            draggable
            onDragEnd={(e) => {
              const draggedCoordinate = e.nativeEvent.coordinate;
              console.log('Marker dragged to:', draggedCoordinate);
              setMarker(draggedCoordinate);
              setRegion({
                ...region!,
                latitude: draggedCoordinate.latitude,
                longitude: draggedCoordinate.longitude,
              });
              debouncedFetchAddress(draggedCoordinate.latitude, draggedCoordinate.longitude);
            }}
          />
        )}
      </MapView>
      <Button title="Confirmar Ubicación" onPress={handleConfirmLocation} />
      {addressLoading && <IsLoading label='Obteniendo dirección...' />}
      {address !== '' && (
        <View style={styles.addressContainer}>
          <Text style={styles.addressText}>{address}</Text>
        </View>
      )}
    </View>
  );
};

export default MapSelector;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  map: {
    width: Dimensions.get('window').width - 40,
    height: 300,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addressContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  addressText: {
    textAlign: 'center',
  },
});

export function debounce(func: Function, delay: number) {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
}