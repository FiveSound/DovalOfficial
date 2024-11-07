import { View, Text, ActivityIndicator } from 'react-native';
import { getViewPostService } from '../../../../services/reactions';
import { COLORS, SIZES } from '../../../../constants/theme';
import { EyeIcon } from '../../../../constants/IconsPro';
import { formatMilesAndMillions } from '../../../../utils/format';
import { Typography } from '../../../../components/custom';
import { memo } from 'react';
import styles from './styles';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';

type Props = {
};

const ViewsButton = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`views-post-id-${CurrentFeed.id}`, CurrentFeed.id.toString()],
    queryFn: getViewPostService,
  });

  const length = data?.length || 0;

  return (
    <View style={styles.container}>
      <EyeIcon
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={COLORS.TranspLight}
      />
      <Typography variant="H4title" newStyle={styles.label}>
        {formatMilesAndMillions(length)}
      </Typography>
    </View>
  );
});

export default ViewsButton;
