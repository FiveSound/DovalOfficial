import { View,} from 'react-native';
import { memo } from 'react';
import styles from './styles';
import { useQuery } from '@tanstack/react-query';
import { getViewPostService } from '../../../../../services/reactions';
import { EyeIcon } from '../../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../../constants/theme';
import { formatMilesAndMillions } from '../../../../../utils/format';
import Typography from '../../../Typography';

type Props = {
  postID: number;
};

const ViewsButton = memo(({ postID }: Props) => {
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`views-post-id-${postID}`, postID.toString()],
    queryFn: getViewPostService,
  });

  const length = data?.length || 0;

  return (
    <View style={styles.container}>
      <EyeIcon
        width={SIZES.icons / 1.2}
        height={SIZES.icons / 1.2}
        color={COLORS.TranspLight}
      />
      <Typography variant="H4title" newStyle={styles.label}>
        {formatMilesAndMillions(length)}
      </Typography>
    </View>
  );
});

export default ViewsButton;
