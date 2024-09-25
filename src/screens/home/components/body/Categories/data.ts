import { iconsNative } from "../../../../../constants";
import i18next from "../../../../../Translate";

export type Category = {
    id: number;
    name: string;
    icon: any;
    navigation?: string;
  };

const categories: Category[] = [
    { id: 1, name: i18next.t('Restaurants'), icon: iconsNative.Restaurants, navigation: 'SearchBusiness' },
    { id: 2, name: i18next.t('Flash sales'), icon: iconsNative.PromotionsIcons },
    { id: 3, name: 'Pizza', icon: iconsNative.PizzaIcons },
    { id: 4, name: 'Hamburgesa', icon: iconsNative.HamburgerIcons },
    { id: 5, name: i18next.t('More'), icon: iconsNative.Restaurants },
  ];

export default categories