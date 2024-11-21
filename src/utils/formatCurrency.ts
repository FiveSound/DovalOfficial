import { useAuth } from '../context/AuthContext';

export const getCurrencyByCountryCode = (countryCode: string) => {
  switch (countryCode) {
    case 'CO':
      return 'COP'; // Peso colombiano
    case 'US':
      return 'USD'; // Dólar estadounidense
    case 'MX':
      return 'MXN'; // Peso mexicano
    case 'AR':
      return 'ARS'; // Peso argentino
    case 'BR':
      return 'BRL'; // Real brasileño
    case 'CL':
      return 'CLP'; // Peso chileno
    case 'PE':
      return 'PEN'; // Sol peruano
    case 'VE':
      return 'VES'; // Bolívar venezolano
    case 'EC':
      return 'USD'; // Dólar estadounidense (Ecuador usa el dólar)
    case 'PA':
      return 'USD'; // Dólar estadounidense (Panamá usa el dólar)
    case 'DO':
      return 'DOP'; // Peso Dominicano
    case 'CA':
      return 'CAD'; // Dólar canadiense
    case 'GB':
      return 'GBP'; // Libra esterlina
    case 'JP':
      return 'JPY'; // Yen japonés
    case 'CN':
      return 'CNY'; // Yuan chino
    case 'IN':
      return 'INR'; // Rupia india
    case 'AU':
      return 'AUD'; // Dólar australiano
    case 'CH':
      return 'CHF'; // Franco suizo
    case 'RU':
      return 'RUB'; // Rublo ruso
    case 'ZA':
      return 'ZAR'; // Rand sudafricano
    case 'KR':
      return 'KRW'; // Won surcoreano
    case 'SG':
      return 'SGD'; // Dólar de Singapur
    case 'HK':
      return 'HKD'; // Dólar de Hong Kong
    case 'NZ':
      return 'NZD'; // Dólar neozelandés
    case 'SE':
      return 'SEK'; // Corona sueca
    case 'NO':
      return 'NOK'; // Corona noruega
    case 'DK':
      return 'DKK'; // Corona danesa
    case 'PL':
      return 'PLN'; // Zloty polaco
    case 'CZ':
      return 'CZK'; // Corona checa
    case 'HU':
      return 'HUF'; // Forint húngaro
    case 'IL':
      return 'ILS'; // Nuevo shéquel israelí
    case 'MY':
      return 'MYR'; // Ringgit malayo
    case 'TH':
      return 'THB'; // Baht tailandés
    case 'ID':
      return 'IDR'; // Rupia indonesia
    case 'PH':
      return 'PHP'; // Peso filipino
    case 'SA':
      return 'SAR'; // Riyal saudí
    case 'AE':
      return 'AED'; // Dírham de los Emiratos Árabes Unidos
    case 'EG':
      return 'EGP'; // Libra egipcia
    case 'NG':
      return 'NGN'; // Naira nigeriana
    case 'KE':
      return 'KES'; // Chelín keniano
    case 'TZ':
      return 'TZS'; // Chelín tanzano
    case 'UG':
      return 'UGX'; // Chelín ugandés
    case 'GH':
      return 'GHS'; // Cedi ghanés
    case 'BD':
      return 'BDT'; // Taka de Bangladés
    case 'PK':
      return 'PKR'; // Rupia pakistaní
    case 'LK':
      return 'LKR'; // Rupia de Sri Lanka
    case 'VN':
      return 'VND'; // Dong vietnamita
    case 'MM':
      return 'MMK'; // Kyat birmano
    case 'KH':
      return 'KHR'; // Riel camboyano
    case 'LA':
      return 'LAK'; // Kip laosiano
    case 'MN':
      return 'MNT'; // Tugrik mongol
    case 'BT':
      return 'BTN'; // Ngultrum butanés
    case 'NP':
      return 'NPR'; // Rupia nepalí
    case 'IR':
      return 'IRR'; // Rial iraní
    case 'IQ':
      return 'IQD'; // Dinar iraquí
    case 'SY':
      return 'SYP'; // Libra siria
    case 'LB':
      return 'LBP'; // Libra libanesa
    case 'JO':
      return 'JOD'; // Dinar jordano
    case 'KW':
      return 'KWD'; // Dinar kuwaití
    case 'QA':
      return 'QAR'; // Riyal catarí
    case 'OM':
      return 'OMR'; // Rial omaní
    case 'YE':
      return 'YER'; // Rial yemení
    case 'BH':
      return 'BHD'; // Dinar bareiní
    case 'AM':
      return 'AMD'; // Dram armenio
    case 'GE':
      return 'GEL'; // Lari georgiano
    case 'AZ':
      return 'AZN'; // Manat azerbaiyano
    case 'KZ':
      return 'KZT'; // Tenge kazajo
    case 'UZ':
      return 'UZS'; // Som uzbeko
    case 'TM':
      return 'TMT'; // Manat turcomano
    case 'KG':
      return 'KGS'; // Som kirguís
    case 'TJ':
      return 'TJS'; // Somoni tayiko
    case 'AF':
      return 'AFN'; // Afgani afgano
    case 'BY':
      return 'BYN'; // Rublo bielorruso
    case 'UA':
      return 'UAH'; // Grivna ucraniana
    case 'MD':
      return 'MDL'; // Leu moldavo
    case 'BA':
      return 'BAM'; // Marco convertible de Bosnia y Herzegovina
    case 'MK':
      return 'MKD'; // Denar macedonio
    case 'AL':
      return 'ALL'; // Lek albanés
    case 'RS':
      return 'RSD'; // Dinar serbio
    case 'IS':
      return 'ISK'; // Corona islandesa
    case 'FO':
      return 'DKK'; // Corona danesa (Islas Feroe usa la corona danesa)
    case 'GL':
      return 'DKK'; // Corona danesa (Groenlandia usa la corona danesa)
    default:
      return 'USD'; // Moneda por defecto si no se encuentra el código de país
  }
};

export const formatCurrency = (number: number, countryCode: string = 'DO') => {
  return new Intl.NumberFormat('DOP', {
    style: 'currency',
    currency: countryCode,
    minimumFractionDigits: 0,
  }).format(number);
};
