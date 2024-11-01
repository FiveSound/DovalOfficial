import { useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { isLocationInCountry } from '../constants/SellersCountry';
import KeyApi from '../constants/KeyApi';
import { Country } from '../constants/Country';
import {
  setLocationData,
} from '../redux/slides/locationSlice';
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
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setTimeout(() => {
            dispatch(openLocationModal());
          }, 2000);
          return;
        }

        subscription = await Location.watchPositionAsync(
          {
            accuracy: Location.LocationAccuracy.Highest,
            distanceInterval: 50, 
            timeInterval: 5000, 
          },
          async (location) => {
            const { latitude, longitude } = location.coords;
            if (latitude == null || longitude == null) {
              dispatch(setLocationData(null));
              return;
            }

            const countryName = await getCountryName(latitude, longitude);

            if (countryName === 'Unknown') {
              return;
            }

            const countryISO = getCountryISO(countryName);

            if (!countryISO) {
              return;
            }

            const isInCountry = isLocationInCountry(latitude, longitude, countryISO);

            dispatch(
              setLocationData({
                accuracy: location.coords.accuracy,
                altitude: location.coords.altitude,
                altitudeAccuracy: location.coords.altitudeAccuracy,
                heading: location.coords.heading,
                latitude: latitude,
                longitude: longitude,
                speed: location.coords.speed,
              })
            );

      
          }
        );
      } catch (error) {
        console.error('❌ Error al iniciar la vigilancia de la ubicación:', error);
      }
    };

    startWatchingLocation();

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [dispatch, isLoadingApp]);

  const getCountryName = useCallback(
    async (latitude: number, longitude: number): Promise<string> => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`,
        );

        if (!response.ok) {
          console.error('❌ Error en la respuesta de la API de geocodificación');
          return 'Unknown';
        }

        const data = await response.json();

        if (data.results && data.results.length > 0) {
          const countryComponent = data.results[0].address_components.find(
            (component: any) => component.types.includes('country'),
          );
          return countryComponent ? countryComponent.long_name : 'Unknown';
        } else {
          return 'Unknown';
        }
      } catch (error) {
        console.error('❌ Error al obtener el nombre del país:', error);
        return 'Unknown';
      }
    },
    [],
  );

  const getCountryISO = useCallback((countryName: string): string | null => {
    const normalizedName = countryName.trim().toLowerCase();
    const country = Country.find(
      (c) => c.countryName.trim().toLowerCase() === normalizedName,
    );
    if (!country) {
      console.warn(`⚠️ País no encontrado para: ${countryName}`);
    }
    return country ? country.codigoISO : null;
  }, []);

  return;
};
