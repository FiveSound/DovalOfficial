import { Country } from './Country';

type CountryBounds = {
  latMin: number;
  latMax: number;
  lonMin: number;
  lonMax: number;
};

const getCountryBounds = (countryKey: string): CountryBounds | undefined => {
  const country = Country.find(c => c.codigoISO === countryKey);
  return country ? country.bounds : undefined;
};

const isLocationInCountry = (latitude: number, longitude: number, countryKey: string): boolean => {
  const bounds = getCountryBounds(countryKey);
  if (!bounds) return false;

  return (
    latitude >= bounds.latMin &&
    latitude <= bounds.latMax &&
    longitude >= bounds.lonMin &&
    longitude <= bounds.lonMax
  );
};

export {
  isLocationInCountry
};