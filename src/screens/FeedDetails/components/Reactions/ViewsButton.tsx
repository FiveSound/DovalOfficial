import { View, Text, ActivityIndicator } from 'react-native';
import { getViewPostService } from '../../../../services/reactions';
import { COLORS, SIZES } from '../../../../constants/theme';
import { EyeIcon, EyeIconStroke } from '../../../../constants/IconsPro';
import { formatMilesAndMillions } from '../../../../utils/format';
import { Typography } from '../../../../components/custom';
import { memo } from 'react';
import styles from './styles';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';
import { useTheme } from '@/src/hooks';

type Props = {
};

const ViewsButton = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { Title } = useTheme();
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`views-post-id-${CurrentFeed.id}`, CurrentFeed.id.toString()],
    queryFn: getViewPostService,
  });

  const length = data?.length || 0;

  return (
    <View style={styles.container}>
      <EyeIconStroke
        width={SIZES.icons}
        height={SIZES.icons}
        color={Title}
      />
      <Typography variant="H4title" newStyle={styles.label}>
        {formatMilesAndMillions(length)}
      </Typography>
    </View>
  );
});

export default ViewsButton;
