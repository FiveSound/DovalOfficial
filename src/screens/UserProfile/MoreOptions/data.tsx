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
    title: 'Blocked Users',
    description: 'View and manage your past posts, recipes, and live streams.',
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
    title: 'Report a User',
    description:
      'Start a live stream to connect with your audience in real-time.',
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
    title: 'About this user',
    description: 'View and manage your past posts, recipes, and live streams.',
    icon: (
      <AlertSquareIconStroke
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.dark}
      />
    ),
    showLineDivider: false,
    action: 'About this user',
  },
];

export default data;
