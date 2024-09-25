import { useState, useEffect } from "react";
import { Dimensions, Image, StyleSheet } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { LocationObjectCoords } from "expo-location";
import { COLORS, responsiveFontSize, SIZES } from "../../../constants/theme";
import mapStyle from "./mapStyle";
import {
  Home01Icon,
  Location08Icon,
  Location09Icon,
  StoreLocation02Icon,
} from "../../../constants/IconsPro";
import { FlexContainer, Icons } from "../../../components/custom";

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
  const screenHeight = Dimensions.get("window").height;
  const mapHeight = screenHeight * 0.7;

  const calculateMidpoint = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
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
    lon2: number
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
        props.business.longitude
      );
      const delta = calculateDelta(
        props.user.latitude,
        props.user.longitude,
        props.business.latitude,
        props.business.longitude
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
      region={region}
      mapType="standard"
      customMapStyle={mapStyle}
      zoomControlEnabled={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
    >
      <Marker
        coordinate={{
          latitude: props.user.latitude,
          longitude: props.user.longitude,
        }}
        children={
          <FlexContainer newStyle={styles.containerIcons}>
            <Location08Icon 
              color={COLORS.primary} 
              width={SIZES.icons}
              height={SIZES.icons}
            />
          </FlexContainer>
        }
      />
      {props.rider && (
        <Marker
          coordinate={{
            latitude: props.rider.latitude,
            longitude: props.rider.longitude,
          }}
          children={<Home01Icon />}
        />
      )}

      <Marker
        coordinate={{
          latitude: props.business.latitude,
          longitude: props.business.longitude,
        }}
        children={
          <FlexContainer newStyle={styles.containerIcons}>
            <StoreLocation02Icon 
              color={COLORS.primary} 
              width={SIZES.icons}
              height={SIZES.icons}
            />
          </FlexContainer>
        }
      />

      {props.coords && (
        <Polyline
          coordinates={props.coords}
          strokeWidth={5}
          strokeColor={COLORS.primary}
        />
      )}
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
    justifyContent: 'center'
  },
});

export default MapOrdenStatus;