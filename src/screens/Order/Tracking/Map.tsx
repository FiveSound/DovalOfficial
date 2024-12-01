import { COLORS, SIZES } from "@/src/constants/theme";
import { memo, useRef } from "react";
import { Dimensions } from "react-native";
import { LocationObjectCoords } from "expo-location";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";
import mapStyle from "../../../constants/mapStyle";
import { CustomMarker } from "@/src/components/custom";
import { Location08Icon, Motorbike01Icon, StoreLocation02Icon } from "@/src/constants/IconsPro";

type TypeRiderLocation = {
  orderID: number | null;
  riderID: string | null;
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
};

type Props = {
  user: Region;
  business: Region[];
  rider: TypeRiderLocation | null;
  coords: LocationObjectCoords[];
};

const Map = memo((props: Props) => {
  const mapRef = useRef<MapView>(null);
  const screenHeight = Dimensions.get("window").height;
  const mapHeight = screenHeight * 0.7;

  return (
    <MapView
      ref={mapRef}
      provider={PROVIDER_GOOGLE}
      style={{
        width: SIZES.width,
        height: mapHeight,
      }}
      initialRegion={props.user}
      mapType="standard"
      customMapStyle={mapStyle}
      zoomControlEnabled={true}
      scrollEnabled={true}
      zoomEnabled={true}
      pitchEnabled={true}
      rotateEnabled={true}
    >
      {props.user && (
        <Marker
          coordinate={{
            latitude: props.user.latitude,
            longitude: props.user.longitude,
          }}
        >
          <CustomMarker>
            <Location08Icon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons} />
          </CustomMarker>
        </Marker>
      )}

      {props.business.length > 0 && (
        <>
          {props.business.map((row) => (
            <Marker
              coordinate={{
                latitude: row.latitude,
                longitude: row.longitude,
              }}
            >
              <CustomMarker>
                <StoreLocation02Icon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons} />
              </CustomMarker>
            </Marker>
          ))}
        </>
      )}

      {props.rider && props.rider.coords && (
        <Marker
          coordinate={{
            latitude: props.rider.coords.latitude,
            longitude: props.rider.coords.longitude,
          }}
        >
          <CustomMarker>
            <Motorbike01Icon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons} />
          </CustomMarker>
        </Marker>
      )}
    </MapView>
  );
});

export default Map;
