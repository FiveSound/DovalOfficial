import { useEffect, useCallback } from 'react';
import * as Location from 'expo-location';
import { useDispatch } from 'react-redux';
import { isLocationInCountry } from '../constants/SellersCountry';
import KeyApi from '../constants/KeyApi';
import { Country } from '../constants/Country';

import { setLocationData } from '../redux/slides/locationSlice';

export const useLocation = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.log('Permission to access location was denied');
                dispatch(setLocationData({ isLoading: false }));
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;
            const countryName = await getCountryName(latitude, longitude);
            const countryISO = getCountryISO(countryName);
            const isInCountry = countryISO ? isLocationInCountry(latitude, longitude, countryISO) : false;

            dispatch(setLocationData({
                location,
                country: countryName,
                isLocationAvailable: isInCountry,
                isLoading: false,
                countryKey: isInCountry ? countryISO : null,
                latitude,
                longitude,
                countryCode: countryISO
            }));
        };

        fetchLocation();
    }, [KeyApi.GoogleMapApi, dispatch]);

    const getCountryName = useCallback(async (latitude: number, longitude: number) => {
        const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${KeyApi.GoogleMapApi}`);
        const data = await response.json();
        if (data.results && data.results.length > 0) {
            const countryComponent = data.results[0].address_components.find((component: any) => component.types.includes('country'));
            return countryComponent ? countryComponent.long_name : 'Unknown';
        } else {
            return 'Unknown';
        }
    }, []);

    const getCountryISO = (countryName: string) => {
        const country = Country.find(c => c.countryName === countryName);
        return country ? country.codigoISO : null;
    };
};