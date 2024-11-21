import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { LocationObjectCoords } from 'expo-location';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import {
  Home01Icon,
  Location08Icon,
  StoreLocation02Icon,
} from '../../../constants/IconsPro';
import { CustomMarker, FlexContainer, Icons } from '../../../components/custom';
import mapStyle from '../../../constants/mapStyle';

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

  const [region, setRegion] = useState({
    latitude: props.business.latitude,
    longitude: props.business.longitude,
    latitudeDelta: 0.02,
    longitudeDelta: 0.02,
  });

  useEffect(() => {
    if (props.user && props.business) {
      const midpoint = calculateMidpoint(
        props.user.latitude,
        props.user.longitude,
        props.business.latitude,
        props.business.longitude,
      );
      const delta = calculateDelta(
        props.user.latitude,
        props.user.longitude,
        props.business.latitude,
        props.business.longitude,
      );
      setRegion({
        latitude: midpoint.latitude,
        longitude: midpoint.longitude,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      });
    }
  }, [props.user, props.business]);

  return (
    <MapView
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
        {
        props.user.latitude && props.user.longitude && (
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
        )
      }
      
     
      {
        props.business.latitude && props.business.longitude && (
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
        )
      }



      {/* {props.coords && (
        <Polyline
          coordinates={props.coords}
          strokeWidth={5}
          strokeColor={COLORS.primary}
        />
      )} */}
    </MapView>
  );
};

const styles = StyleSheet.create({
  containerIcons: {
    borderRadius: responsiveFontSize(44),
    width: responsiveFontSize(44),
    height: responsiveFontSize(44),
    backgroundColor: COLORS.TranspDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MapOrdenStatus;
