// useLocation.ts

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
    let subscription: Location.LocationSubscription | null = null;

    const startWatchingLocation = async () => {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();
        // console.log('useLocation: Status:', status);
        if (status !== 'granted') {
          console.log('useLocation: Permissions not granted, opening location modal');
          dispatch(openLocationModal());
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.Highest,
            distanceInterval: 50, // en metros
            timeInterval: 5000, // en milisegundos
          },
          async (location) => {
            const { latitude, longitude } = location.coords;
            // console.log('Location Update Received:', { latitude, longitude });


            const countryName = await getCountryName(latitude, longitude);
            // console.log('Country Name:', countryName);

            const countryISO = getCountryISO(countryName);
            // console.log('Country ISO:', countryISO);

  
            dispatch(
              setLocationData({
                location: {
                  latitude: latitude,
                  longitude: longitude,
                },
                countryISO: countryISO, 
              })
            );
            // console.log('Location Data Dispatched Successfully');
          }
        );
      } catch (error) {
        console.error('❌ Error starting location watch:', error);
      }
    };

    startWatchingLocation();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [dispatch, isLoadingApp]);

  const handleRequestPermissions = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

    } catch (error) {
      console.error('❌ Error requesting location permissions:', error);
    }
  }, []);

  const getCountryName = useCallback(
    async (latitude: number, longitude: number): Promise<string> => {
      try {
        // console.log(`Fetching country name for coordinates: ${latitude}, ${longitude}`);
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`,
        );

        // console.log('Geocoding API Response Status:', response.status);

        if (!response.ok) {
          console.error('❌ Geocoding API response not OK');
          return 'Unknown';
        }

        const data = await response.json();
        // console.log('Geocoding API Response Data:', data);

        if (data.results && data.results.length > 0) {
          const countryComponent = data.results[0].address_components.find(
            (component: any) => component.types.includes('country'),
          );

            // console.log('Country Component:', countryComponent);

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
    // console.log(`Retrieving ISO for country: ${countryName}`);
    const normalizedName = countryName.trim().toLowerCase();
    const country = Country.find(
      (c) => c.countryName.trim().toLowerCase() === normalizedName,
    );

    if (!country) {
      console.warn(`⚠️ Country not found for name: ${countryName}`);
    } else {
      console.log(`Found ISO Code: ${country.codigoISO}`);
    }

    return country ? country.codigoISO : null;
  }, []);


  return { handleRequestPermissions };
};