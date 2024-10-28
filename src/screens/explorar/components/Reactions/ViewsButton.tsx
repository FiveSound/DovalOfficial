import { View, Text, ActivityIndicator } from 'react-native';
import useAPI from '../../../../hooks/useAPI';
import { getViewPostService } from '../../../../services/reactions';
import { COLORS, SIZES } from '../../../../constants/theme';
import { EyeIcon } from '../../../../constants/IconsPro';
import { formatMilesAndMillions } from '../../../../utils/format';
import { Typography } from '../../../../components/custom';
import { memo } from 'react';
import styles from './styles';

type Props = {
  postID: number;
};

const ViewsButton = memo(({ postID }: Props) => {
  const { data, isLoading, isFetching } = useAPI({
    queryKey: [`views-post-id-${postID}`, postID.toString()],
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
