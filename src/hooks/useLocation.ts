import { useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { isLocationInCountry } from '../constants/SellersCountry';
import KeyApi from '../constants/KeyApi';
import { Country } from '../constants/Country';
import { setLocationData } from '../redux/slides/locationSlice';
import { openLocationModal } from '../redux/slides/modalSlice';
import { useAppDispatch, useAppSelector } from '../redux';
import { RootState } from '../redux/store';

export const useLocation = () => {
  const dispatch = useAppDispatch();
  const { isLoadingApp } = useAppSelector((state: RootState) => state.auth);

  useEffect(() => {
    // console.log('useLocation: useEffect triggered');
    let subscription: Location.LocationSubscription | null = null;

    const startWatchingLocation = async () => {
      // console.log('useLocation: Starting to watch location');
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        // console.log(`useLocation: Permission status - ${status}`);

        if (status !== 'granted') {
          console.log('useLocation: Permissions not granted, opening location modal');
          dispatch(openLocationModal());
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.Highest,
            distanceInterval: 50, // in meters
            timeInterval: 5000, // in milliseconds
          },
          async (location) => {
            // console.log('useLocation: Location update received', location);
            const { latitude, longitude } = location.coords;
            if (latitude == null || longitude == null) {
              // console.log('useLocation: Invalid coordinates, dispatching setLocationData(null)');
              dispatch(setLocationData(null));
              return;
            }

            const countryName = await getCountryName(latitude, longitude);
            // console.log(`useLocation: Determined country name - ${countryName}`);

            if (countryName === 'Unknown') {
              console.log('useLocation: Country name is Unknown, exiting');
              dispatch(setLocationData(null));
              return;
            }

            const countryISO = getCountryISO(countryName);
            // console.log(`useLocation: Retrieved country ISO - ${countryISO}`);

            if (!countryISO) {
              console.log('useLocation: Country ISO not found, exiting');
              dispatch(setLocationData(null));
              return;
            }

            const isInCountry = isLocationInCountry(latitude, longitude, countryISO);
            // console.log(`useLocation: Is location in country - ${isInCountry}`);

            if (!isInCountry) {
              console.log('useLocation: Location is not within the specified country');
              dispatch(setLocationData(null));
              return;
            }

            dispatch(
              setLocationData({
                location: {
                  accuracy: location.coords.accuracy,
                  altitude: location.coords.altitude,
                  altitudeAccuracy: location.coords.altitudeAccuracy,
                  heading: location.coords.heading,
                  latitude: latitude,
                  longitude: longitude,
                  speed: location.coords.speed,
                },
                country: countryName,
                countryKey: countryISO,
              })
            );
            // console.log('useLocation: Dispatched setLocationData with country information');
          }
        );
        // console.log('useLocation: Location subscription started');
      } catch (error) {
        console.error('❌ Error starting location watch:', error);
      }
    };

    startWatchingLocation();

    return () => {
      // console.log('useLocation: Cleaning up location subscription');
      if (subscription) {
        subscription.remove();
        console.log('useLocation: Location subscription removed');
      }
    };
  }, [dispatch, isLoadingApp]);

  const handleRequestPermissions = useCallback(async () => {
    // console.log('useLocation: handleRequestPermissions called');
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      console.log(`useLocation: Requested permission status - ${status}`);
      if (status !== 'granted') {
        console.warn('⚠️ Location permissions not granted');
        return;
      }

      // Restart location watching if permissions are granted
      console.log('useLocation: Permissions granted, starting to watch location');
      // You can call startWatchingLocation() here if needed
    } catch (error) {
      console.error('❌ Error requesting location permissions:', error);
    }
  }, []);

  const getCountryName = useCallback(
    async (latitude: number, longitude: number): Promise<string> => {
      // console.log(`useLocation: Fetching country name for coordinates (${latitude}, ${longitude})`);
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`,
        );
        // console.log('useLocation: Geocoding API response received');

        if (!response.ok) {
          console.error('❌ Geocoding API response not OK');
          return 'Unknown';
        }

        const data = await response.json();
        // console.log('useLocation: Geocoding API data parsed');

        if (data.results && data.results.length > 0) {
          const countryComponent = data.results[0].address_components.find(
            (component: any) => component.types.includes('country'),
          );
          // console.log(
          //   `useLocation: Country component found - ${
          //     countryComponent ? countryComponent.long_name : 'None'
          //   }`
          // );
          return countryComponent ? countryComponent.long_name : 'Unknown';
        } else {
          console.log('useLocation: No results from Geocoding API');
          return 'Unknown';
        }
      } catch (error) {
        console.error('❌ Error fetching country name:', error);
        return 'Unknown';
      }
    },
    [],
  );

  const getCountryISO = useCallback((countryName: string): string | null => {
    // console.log(`useLocation: Retrieving ISO for country - ${countryName}`);
    const normalizedName = countryName.trim().toLowerCase();
    const country = Country.find(
      (c) => c.countryName.trim().toLowerCase() === normalizedName,
    );
    if (!country) {
      console.warn(`⚠️ Country not found for name: ${countryName}`);
    }
    // console.log(`useLocation: Retrieved country ISO - ${country ? country.codigoISO : 'None'}`);
    return country ? country.codigoISO : null;
  }, []);

  return { handleRequestPermissions };
};