import i18next from '@/src/Translate';
import {
  AlertSquareIconStroke,
  ComplaintIcon,
  Share08Icon,
  UserBlock01IconStroke,
} from '../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../constants/theme';

interface data {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  showLineDivider: boolean;
  action: string | undefined | boolean | number;
}

const data: data[] = [
  {
    id: 1,
    title: i18next.t('BlockedUsers'),
    description: i18next.t('BlockedUsersDescription'),
    icon: (
      <UserBlock01IconStroke
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.dark}
      />
    ),
    showLineDivider: true,
    action: true,
  },
  {
    id: 2,
    title: i18next.t('ReportUser'),
    description: i18next.t('ReportUserDescription'),
    icon: (
      <ComplaintIcon
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={COLORS.dark}
      />
    ),
    showLineDivider: true,
    action: 'ReportUsers',
  },
  // {
  //   id: 3,
  //   title: 'Share to Social Media',
  //   description: 'View and manage your past posts, recipes, and live streams.',
  //   icon: (
  //     <Share08Icon
  //       width={SIZES.icons}
  //       height={SIZES.icons}
  //       color={COLORS.dark}
  //     />
  //   ),
  //   showLineDivider: true,
  //   action: 'ShareToSocialMedia',
  // },
  {
    id: 4,
    title: i18next.t('AboutThisUser'),
    description: i18next.t('AboutThisUserDescription'),
    icon: (
      <AlertSquareIconStroke
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.dark}
      />
    ),
    showLineDivider: false,
    action: 'AboutThisUser',
  },
];

export default data;
