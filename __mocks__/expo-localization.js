// __mocks__/expo-localization.js

export const getLocales = () => [
    { languageTag: 'en-US', languageCode: 'en', countryCode: 'US' },
    { languageTag: 'es-ES', languageCode: 'es', countryCode: 'ES' },
    { languageTag: 'pt-BR', languageCode: 'pt', countryCode: 'BR' },
  ];
  
  export const locale = 'en-US';
  export const locales = getLocales();
  export const isoCurrencyCodes = ['USD', 'EUR', 'BRL'];
  export const isoCountries = ['US', 'ES', 'BR'];
  export const region = 'US';