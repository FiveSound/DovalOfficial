import React, { memo, useEffect, useState } from 'react';
import * as Haptics from 'expo-haptics';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getCommentsPostService } from '../../../../../services/reactions';
import { openCommentModal } from '../../../../../redux/slides/modalSlice';
import { TouchableOpacity } from '../../../../native';
import { Message02Icon } from '../../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../../constants/theme';
import { formatMilesAndMillions } from '../../../../../utils/format';
import Typography from '../../../Typography';

type Props = {
  postID: number;
};

const CommentButton = memo(({ postID }: Props) => {
  const dispatch = useDispatch();
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`comments-post-id-${postID}`],
    queryFn: getCommentsPostService,
  });

  useEffect(() => {
    if (data) {
      setCommentsCount(data.length);
      setDisabled(false);
    }
  }, [data]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(openCommentModal({ postID: postID }));
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={styles.container}
    >
      <Message02Icon
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.TranspLight}
      />
      <Typography variant='title' newStyle={styles.label}>{formatMilesAndMillions(commentsCount)}</Typography>
    </TouchableOpacity>
  );
});

export default CommentButton;
