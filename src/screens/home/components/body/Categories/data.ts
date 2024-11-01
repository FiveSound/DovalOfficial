import { iconsNative } from '../../../../../constants';
import i18next from '../../../../../Translate';

export type Category = {
  id: number;
  name: string;
  navigation?: string;
  description?: string;
  image?: any;
  backgroundColor?: string;
};

// const categories: Category[] = [
//   {
//     id: 1,
//     name: i18next.t('Restaurants'),
//     icon: iconsNative.Restaurants,
//     navigation: 'SearchBusiness',
//   },
//   { id: 2, name: i18next.t('Flash sales'), icon: iconsNative.PromotionsIcons },
//   { id: 3, name: 'Pizza', icon: iconsNative.PizzaIcons },
//   { id: 4, name: 'Hamburgesa', icon: iconsNative.HamburgerIcons },
//   { id: 5, name: i18next.t('More'), icon: iconsNative.Restaurants },
// ];

const categories: Category[] = [
  { id: 1, name: 'Restaurantes', description: 'La comida que te gusta', image: iconsNative.restaurants, backgroundColor: '#FFE700', navigation: 'SearchBusiness' },
  { id: 2, name: 'Recetas', description: 'Tus compras desde casa', image: iconsNative.HamburgerIcons, backgroundColor: '#C6E7FF', navigation: 'Recipes' },
  { id: 3, name: 'Flash Deals', image: iconsNative.PromotionsIcons, backgroundColor: '#FF885B', navigation: 'FlashDeals' },
  { id: 4, name: 'Pizza', image: iconsNative.PizzaIcons, backgroundColor: '#FFE700', navigation: 'Pizza' },
  { id: 5, name: 'Hamburguesas', image: iconsNative.HamburgerIcons, backgroundColor: '#F87A53', navigation: 'Hamburgers' },
];

export default categories;
