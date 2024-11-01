import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import { useAppDispatch } from '../redux';
import { openLocationModal } from '../redux/slides/modalSlice';

export interface LocationState {
  latitude: number;
  longitude: number;
  altitude?: number | null;
  accuracy?: number | null;
  altitudeAccuracy?: number | null;
  heading?: number | null;
  speed?: number | null;
}

const useRangeNearbyLocation = () => {
  const dispatch = useAppDispatch();
  const [currentLocation, setCurrentLocation] = useState<LocationState | null>(
    null,
  );
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);
  const [permissionChecked, setPermissionChecked] = useState<boolean>(false);
  const [hasNavigated, setHasNavigated] = useState<boolean>(false);

  useEffect(() => {
    const checkPermission = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (!hasNavigated) {
            dispatch(openLocationModal());
            setHasNavigated(true);
          }
        } else {
          setPermissionGranted(true);
          let location = await Location.getLastKnownPositionAsync();
          if (!location) {
            location = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.Highest,
            });
          }
          if (location) {
            setCurrentLocation({
              ...location.coords,
            });
          } else {
            console.warn('No se pudo obtener la ubicación.');
            if (!hasNavigated) {
              dispatch(openLocationModal());
              setHasNavigated(true);
            }
          }
        }
      } catch (error) {
        console.error('Error al verificar permisos de ubicación:', error);
        if (!hasNavigated) {
          dispatch(openLocationModal());
          setHasNavigated(true);
        }
      } finally {
        setPermissionChecked(true);
      }
    };

    checkPermission();
  }, [ hasNavigated]);

  return { currentLocation, permissionGranted, permissionChecked };
};

export default useRangeNearbyLocation;
