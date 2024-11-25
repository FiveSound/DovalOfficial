import { iconsNative } from '../../../../../constants';
import i18next from '../../../../../Translate';

export type Category = {
  id: number;
  name: string;
  navigation?: string;
  description?: string;
  image?: any;
  lightBackgroundColor?: string;
  darkBackgroundColor?: string;
};

const categories: Category[] = [
  { 
    id: 1, 
    name: i18next.t('Restaurants'),
    description: i18next.t('The food you like'),
    image: iconsNative.restaurants,
    lightBackgroundColor: '#FF5733', // Naranja rojizo que estimula el apetito
    darkBackgroundColor: '#C70039',  // Rojo intenso que capta atención y apela al hambre
    navigation: 'SearchBusiness'
  },
  { 
    id: 2,
    name: i18next.t('Recipes'),
    description: i18next.t('Your purchases from home'),
    image: iconsNative.HamburgerIcons,
    lightBackgroundColor: '#FFC300', // Amarillo brillante que evoca alegría y apetito
    darkBackgroundColor: '#FF8C00',  // Naranja oscuro que añade calidez y energía
    navigation: 'SearchBusiness'

  },
  { 
    id: 3, 
    name: i18next.t('Flash Deals'), 
    image: iconsNative.PromotionsIcons, 
    lightBackgroundColor: '#FF6F61', // Coral vibrante que llama la atención
    darkBackgroundColor: '#E63946',  // Rojo coral profundo que destaca ofertas
    navigation: 'SearchBusiness'
  },
  { 
    id: 4, 
    name: i18next.t('Pizza'), 
    image: iconsNative.PizzaIcons, 
    lightBackgroundColor: '#FFB74D', // Naranja suave que es acogedor y apetitoso
    darkBackgroundColor: '#D35400',  // Naranja quemado que resalta la categoría
    navigation: 'SearchBusiness'
  },
  { 
    id: 5, 
    name: i18next.t('Hamburgers'), 
    image: iconsNative.HamburgerIcons, 
    lightBackgroundColor: '#FF7043', // Naranja vibrante que es energizante
    darkBackgroundColor: '#BF360C',  // Marrón rojizo que transmite robustez y apetito
    navigation: 'SearchBusiness'
  },
];

export default categories;