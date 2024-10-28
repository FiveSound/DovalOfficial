import { memo, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Modal,
} from 'react-native';
import MapView, {
  MapPressEvent,
  Marker,
  MarkerDragStartEndEvent,
  PROVIDER_GOOGLE,
  Region,
} from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import KeyApi from '../../../../constants/KeyApi';
import { IsLoading } from '../../Loaders';
import mapStyle from '../../../../constants/mapStyle';
import { SIZES } from '../../../../constants/theme';
import { Ionicons } from '@expo/vector-icons';

type Props = {
  setValue: (field: string, value: any, options?: any) => void;
};

// Función para comparar dos regiones
const areRegionsEqual = (region1: Region, region2: Region): boolean => {
  return (
    region1.latitude === region2.latitude &&
    region1.longitude === region2.longitude &&
    region1.latitudeDelta === region2.latitudeDelta &&
    region1.longitudeDelta === region2.longitudeDelta
  );
};

const MapSelector = memo(({ setValue }: Props) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [region, setRegion] = useState<Region | null>(null);
  const [markerPosition, setMarkerPosition] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [address, setAddress] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  // Referencia para evitar actualizaciones redundantes de region
  const previousRegionRef = useRef<Region | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          alert('Permiso de ubicación denegado');
          setLoading(false);
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;

        const initialRegion: Region = {
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        setValue('latitude', latitude, { shouldDirty: true });
        setValue('longitude', longitude, { shouldDirty: true });
        setRegion(initialRegion);
        previousRegionRef.current = initialRegion;

        await fetchAddress(latitude, longitude);

        setMarkerPosition({ latitude, longitude });
        setLoading(false);
      } catch (error) {
        console.error('Error al obtener la ubicación:', error);
        setLoading(false);
      }
    };

    requestLocationPermission();
  }, [setValue]);

  const fetchAddress = async (latitude: number, longitude: number) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`,
      );

      if (
        response.data &&
        response.data.results &&
        response.data.results.length > 0
      ) {
        const fetchedAddress = response.data.results[0].formatted_address;
        setAddress(fetchedAddress);
        setValue('address', fetchedAddress, { shouldDirty: true });

        const addressComponents = response.data.results[0].address_components;
        const city =
          addressComponents.find(component =>
            component.types.includes('locality'),
          )?.long_name || '';
        const state =
          addressComponents.find(component =>
            component.types.includes('administrative_area_level_1'),
          )?.short_name || '';
        const country =
          addressComponents.find(component =>
            component.types.includes('country'),
          )?.long_name || '';
        const postal_code =
          addressComponents.find(component =>
            component.types.includes('postal_code'),
          )?.long_name || '';

        setValue('city', city, { shouldDirty: true });
        setValue('state', state, { shouldDirty: true });
        setValue('country', country, { shouldDirty: true });
        setValue('postal_code', postal_code, { shouldDirty: true });
      } else {
        console.warn('No se encontraron resultados para la geocodificación.');
      }
    } catch (error) {
      console.error('Error al obtener la dirección:', error);
    }
  };

  const handleMarkerDragEnd = async (
    event: MarkerDragStartEndEvent | MapPressEvent,
  ) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setValue('latitude', latitude, { shouldDirty: true });
    setValue('longitude', longitude, { shouldDirty: true });
    setMarkerPosition({ latitude, longitude });

    // Actualizar la región para centrar el mapa en la nueva posición
    const newRegion = region ? { ...region, latitude, longitude } : null;
    if (newRegion) {
      setRegion(newRegion);
      previousRegionRef.current = newRegion;
    }

    await fetchAddress(latitude, longitude);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  console.log('searchResults', searchResults);

  if (loading) {
    return <IsLoading label="Cargando mapa" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Search Bar */}
      {/* <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar dirección"
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Ionicons name="search" size={20} color="#fff" />
        </TouchableOpacity>
      </View> */}

      {/* Map View */}
      <MapView
        provider={PROVIDER_GOOGLE}
        style={isFullscreen ? styles.mapFullscreen : styles.map}
        region={region}
        onPress={handleMarkerDragEnd}
        showsUserLocation
        customMapStyle={mapStyle}
      >
        {markerPosition && (
          <Marker
            coordinate={markerPosition}
            title="Mi Ubicación"
            draggable
            onDragEnd={handleMarkerDragEnd}
          />
        )}
      </MapView>

      {/* Search Results */}
      {/* {searchResults.length > 0 && (
        <View style={styles.searchResultsContainer}>
          {searchResults.map((result, index) => (
            <TouchableOpacity key={index} style={styles.searchResultItem} onPress={() => selectSearchResult(result)}>
              <Text style={styles.searchResultText}>{result.formatted_address}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )} */}

      {/* Fullscreen Toggle Button */}
      <TouchableOpacity
        style={styles.fullscreenButton}
        onPress={toggleFullscreen}
      >
        <Ionicons
          name={isFullscreen ? 'contract' : 'expand'}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {/* Fullscreen Modal */}
      <Modal visible={isFullscreen} animationType="fade">
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapFullscreen}
          region={region}
          onPress={handleMarkerDragEnd}
          showsUserLocation
          customMapStyle={mapStyle}
        >
          {markerPosition && (
            <Marker
              coordinate={markerPosition}
              title="Mi Ubicación"
              draggable
              onDragEnd={handleMarkerDragEnd}
            />
          )}
        </MapView>
        <TouchableOpacity style={styles.closeButton} onPress={toggleFullscreen}>
          <Ionicons name="close" size={30} color="#fff" />
        </TouchableOpacity>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  map: {
    height: SIZES.height / 3,
    width: '100%',
  },
  mapFullscreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  fullscreenButton: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 30,
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 10,
    borderRadius: 30,
  },
  addressContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
    padding: 10,
    borderRadius: 8,
  },
  addressText: {
    fontSize: 16,
    color: '#333',
  },
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: 10,
    right: 10,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    alignItems: 'center',
    paddingHorizontal: 10,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  searchButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 8,
    marginLeft: 5,
  },
  searchResultsContainer: {
    position: 'absolute',
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 1,
  },
  searchResultItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  searchResultText: {
    fontSize: 14,
    color: '#333',
  },
});

export default MapSelector;
