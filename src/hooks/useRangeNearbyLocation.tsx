import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useAuth } from "../context/AuthContext";

export interface LocationState {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

const useRangeNearbyLocation = (navigateToPermissionScreen: () => void) => {
  const [currentLocation, setCurrentLocation] = useState<LocationState | null>(null);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [permissionChecked, setPermissionChecked] = useState<boolean>(false); // New state

  useEffect(() => {
    const checkPermission = async () => {
      const { status } = await Location.getForegroundPermissionsAsync();
      if (status !== "granted") {
        navigateToPermissionScreen();
      } else {
        setPermissionGranted(true);
        const location = await Location.getLastKnownPositionAsync();
        if (!location) {
          const currentLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
          setCurrentLocation({
            ...currentLocation?.coords,
          });
        } else {
          setCurrentLocation({
            ...location?.coords,
          });
        }
      }
      setPermissionChecked(true);
    };

    checkPermission();
  }, [navigateToPermissionScreen]);

  return { currentLocation, permissionGranted, permissionChecked };
};

export default useRangeNearbyLocation;