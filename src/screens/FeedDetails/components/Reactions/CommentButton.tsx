import React, { memo, useEffect, useState } from 'react';
import { Message02Icon, Messege01IconStroke } from '../../../../constants/IconsPro';
import { getCommentsPostService } from '../../../../services/reactions';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { formatMilesAndMillions } from '../../../../utils/format';
import { TouchableOpacity, Text } from '../../../../components/native';
import * as Haptics from 'expo-haptics';
import styles from './styles';
import { useDispatch } from 'react-redux';
import { openCommentModal } from '../../../../redux/slides/modalSlice';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';

type Props = {
};

const CommentButton = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { data, isLoading, isFetching } = useQuery({
    queryKey: [`comments-post-id-${CurrentFeed.id}`],
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
    dispatch(openCommentModal({ postID: CurrentFeed.id }));
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={styles.container}
    >
      <Message02Icon
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={COLORS.TranspLight}
      />
      <Text style={styles.label}>{formatMilesAndMillions(commentsCount)}</Text>
    </TouchableOpacity>
  );
});

export default CommentButton;
