import React, { useEffect, useState, useCallback, memo } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import {
  getLikePostService,
  handleLikeService,
} from '../../../../services/reactions';
import { COLORS, SIZES } from '../../../../constants/theme';
import { FavouriteIcon, FavouriteIconStroke } from '../../../../constants/IconsPro';
import { LoginAlert, Typography } from '../../../../components/custom';
import { formatMilesAndMillions } from '../../../../utils/format';
import * as Haptics from 'expo-haptics';
import styles from './styles';
import { TouchableOpacity } from '../../../../components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setLikes, setLiked } from '../../../../redux/slides/reactionsSlice';
import { useQuery } from '@tanstack/react-query';
import { useTheme } from '../../../../hooks';
import { useAppSelector } from '../../../../redux';

type Props = {};

const LikeButton: React.FC<Props> = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { backgroundMaingrey, Description, border } = useTheme()
  const dispatch = useDispatch();
  const likes = useSelector(
    (state: RootState) => state.reactions.likes[CurrentFeed.id] || 0,
  );
  const liked = useSelector(
    (state: RootState) => state.reactions.liked[CurrentFeed.id] || false,
  );
  const [disabled, setDisabled] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `likes-post-id-${CurrentFeed.id}-useQuery`,
      JSON.stringify({ postID: CurrentFeed.id, userID: user?.userID }),
    ],
    queryFn: getLikePostService,
  });

  const handleLike = useCallback(async () => {
    if (!user) {
      setVisible(true);
      return;
    }
    try {
      const newLiked = !liked;
      dispatch(setLiked({ postID: CurrentFeed.id, liked: newLiked }));
      dispatch(setLikes({ postID: CurrentFeed.id, likes: newLiked ? likes + 1 : likes - 1 }));
      await handleLikeService(CurrentFeed.id);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    } catch (error) {
      console.error({ error });
    }
  }, [liked, CurrentFeed, user, dispatch, likes]);

  useEffect(() => {
    if (data) {
      dispatch(setLikes({ postID: CurrentFeed.id, likes: data.likes }));
      dispatch(setLiked({ postID: CurrentFeed.id, liked: data.liked }));
      setDisabled(false);
    }
  }, [data, dispatch, CurrentFeed]);

  const handleAlertDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={handleLike}
        style={styles.container}
        disabled={disabled}
      >
        <FavouriteIcon
          width={SIZES.icons * 1.2}
          height={SIZES.icons * 1.2}
          color={liked ? COLORS.error : COLORS.TranspLight}
        />
         <Typography variant="H4title" newStyle={styles.label}>
          {formatMilesAndMillions(likes)}
          
        </Typography>
        <LoginAlert showAlert={visible} onDismiss={handleAlertDismiss} />
      </TouchableOpacity>

    </>
  );
});

export default LikeButton;