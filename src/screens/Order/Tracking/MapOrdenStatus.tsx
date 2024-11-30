import { useState, useEffect, useRef } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Region } from 'react-native-maps';
import { LocationObjectCoords } from 'expo-location';
import { COLORS, responsiveFontSize, responsiveWidth, SIZES } from '../../../constants/theme';
import {
  Location08Icon,
  Motorbike01Icon,
  StoreLocation02Icon,
} from '../../../constants/IconsPro';
import { CustomMarker, FlexContainer, Icons } from '../../../components/custom';
import mapStyle from '../../../constants/mapStyle';
import { useAppSelector } from '@/src/redux';
import { RootState } from '@/src/redux/store';
import KeyApi from '@/src/constants/KeyApi';
import MapViewDirections from 'react-native-maps-directions';

interface PropsMapOrdenStatus {
  user: {
    latitude: number;
    longitude: number;
  };
  business: {
    latitude: number;
    longitude: number;
  };
  rider: LocationObjectCoords | null;
  coords: any[];
}

const MapOrdenStatus = (props: PropsMapOrdenStatus) => {
  const screenHeight = Dimensions.get('window').height;
  const mapHeight = screenHeight * 0.7;
  const { data } = useAppSelector((state: RootState) => state.modal);
  const { location: RiderLocation } = useAppSelector((state: RootState) => state.locationRider);
  console.log('RiderLocation', RiderLocation);

  const mapRef = useRef<MapView>(null);

  const calculateMidpoint = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    return {
      latitude: (lat1 + lat2) / 2,
      longitude: (lon1 + lon2) / 2,
    };
  };

  const calculateDelta = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ) => {
    const latitudeDelta = Math.abs(lat1 - lat2) * 1.5 || 0.02;
    const longitudeDelta = Math.abs(lon1 - lon2) * 1.5 || 0.02;
    return {
      latitudeDelta: latitudeDelta < 0.02 ? 0.02 : latitudeDelta,
      longitudeDelta: longitudeDelta < 0.02 ? 0.02 : longitudeDelta,
    };
  };

  const calculateMapRegion = (): Region => {
    if (props.user && props.business) {
      let midpoint = calculateMidpoint(
        props.user.latitude,
        props.user.longitude,
        props.business.latitude,
        props.business.longitude,
      );

      // Incluir las coordenadas del rider si están disponibles
      if (RiderLocation) {
        midpoint = {
          latitude: (midpoint.latitude + RiderLocation.latitude) / 2,
          longitude: (midpoint.longitude + RiderLocation.longitude) / 2,
        };
      }

      const delta = calculateDelta(
        props.user.latitude,
        props.user.longitude,
        props.business.latitude,
        props.business.longitude,
      );

      return {
        latitude: midpoint.latitude,
        longitude: midpoint.longitude,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      };
    }
    return {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 0.02,
      longitudeDelta: 0.02,
    };
  };

  const [region, setRegion] = useState<Region>(calculateMapRegion());

  useEffect(() => {
    const newRegion = calculateMapRegion();
    
    if (
      Math.abs(newRegion.latitude - region.latitude) > 0.001 ||
      Math.abs(newRegion.longitude - region.longitude) > 0.001 ||
      Math.abs(newRegion.latitudeDelta - region.latitudeDelta) > 0.002 ||
      Math.abs(newRegion.longitudeDelta - region.longitudeDelta) > 0.002
    ) {
      setRegion(newRegion);
    }
  }, [props.user, RiderLocation]);

  return (
    <MapView
      ref={mapRef}
      style={{
        width: SIZES.width,
        height: mapHeight,
      }}
      provider={PROVIDER_GOOGLE}
      region={region}
      mapType="standard"
      customMapStyle={mapStyle}
      zoomControlEnabled={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
    >
      {/* Marcador del Usuario */}
      {props.user.latitude && props.user.longitude && (
        <Marker
          coordinate={{
            latitude: props.user.latitude,
            longitude: props.user.longitude,
          }}
        >
          <CustomMarker>
            <Location08Icon
              color={COLORS.dark}
              width={SIZES.icons}
              height={SIZES.icons}
            />
          </CustomMarker>
        </Marker>
      )}

      {/* Marcador del Negocio */}
      {props.business.latitude && props.business.longitude && (
        <Marker
          coordinate={{
            latitude: props.business.latitude,
            longitude: props.business.longitude,
          }}
        >
          <CustomMarker>
            <StoreLocation02Icon
              color={COLORS.dark}
              width={SIZES.icons}
              height={SIZES.icons}
            />
          </CustomMarker>
        </Marker>
      )}

      {/* Marcador y Ruta del Rider */}
      {data?.riderID !== null && RiderLocation !== null && (
        <>
          {/* Marcador del Rider */}
          <Marker
            coordinate={{
              latitude: RiderLocation.latitude,
              longitude: RiderLocation.longitude,
            }}
          >
            <CustomMarker>
              <Motorbike01Icon
                color={COLORS.dark}
                width={SIZES.icons}
                height={SIZES.icons}
              />
            </CustomMarker>
          </Marker>

          {/* Ruta del Rider hacia el Usuario */}
          <MapViewDirections
            origin={{
              latitude: RiderLocation.latitude,
              longitude: RiderLocation.longitude,
            }}
            destination={{
              latitude: props.user.latitude,
              longitude: props.user.longitude,
            }}
            apikey={KeyApi.GoogleMapApi}
            strokeWidth={responsiveWidth(4)}
            strokeColor={COLORS.primary}
            optimizeWaypoints={true}
            strokeColors={[COLORS.dark]}
            onError={(errorMessage) => {
              console.log('MapViewDirections error: ', errorMessage);
            }}
            onReady={(result) => {
              if (mapRef.current) {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: SIZES.width / 20,
                    bottom: SIZES.height / 20,
                    left: SIZES.width / 20,
                    top: SIZES.height / 20,
                  },
                  animated: true,
                });
              }
            }}
          />
        </>
      )}
    </MapView>
  );
};

export default MapOrdenStatus;
