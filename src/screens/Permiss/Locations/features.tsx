import {
  LocationUser03Icon,
  SafeDelivery02Icon,
  UserMultiple02Icon,
} from '../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../constants/theme';
import i18next from '../../../Translate';

const features = [
  {
    key: i18next.t('Alert you about close friends'),
    text: i18next.t(
      'Stay connected and dont miss the opportunity for unexpected encounters.',
    ),
    icon: (
      <UserMultiple02Icon
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.primary}
      />
    ),
  },
  {
    key: i18next.t('Find out about local events'),
    text: i18next.t(
      'Discover whats happening near you, from concerts to fairs',
    ),
    icon: (
      <LocationUser03Icon
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.primary}
      />
    ),
  },
  {
    key: i18next.t('Optimize food delivery'),
    text: i18next.t(
      'Receive your orders more efficiently and discover nearby restaurants.',
    ),
    icon: (
      <SafeDelivery02Icon
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.primary}
      />
    ),
  },
];

export default features;
