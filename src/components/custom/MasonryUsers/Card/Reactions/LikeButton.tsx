import React, { useEffect, useState, useCallback, memo } from 'react';
import * as Haptics from 'expo-haptics';
import styles from './styles';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../../context/AuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store';
import { setLikes, setLiked } from '../../../../../redux/slides/reactionsSlice';
import { FavouriteIcon } from '../../../../../constants/IconsPro';
import { formatMilesAndMillions } from '../../../../../utils/format';
import Typography from '../../../Typography';
import { useTheme } from '../../../../../hooks';
import { getLikePostService, handleLikeService } from '../../../../../services/reactions';
import { TouchableOpacity } from '../../../../native';
import { COLORS, SIZES } from '../../../../../constants/theme';
import LoginAlert from '../../../Alert/Login';

type Props = {
  postID: number;
  onLikeChange: (liked: boolean) => void;
};

const LikeButton: React.FC<Props> = memo(({ postID, onLikeChange }) => {
  const { user } = useAuth();
  const { backgroundMaingrey, Description, border } = useTheme()
  const dispatch = useDispatch();
  const likes = useSelector(
    (state: RootState) => state.reactions.likes[postID] || 0,
  );
  const liked = useSelector(
    (state: RootState) => state.reactions.liked[postID] || false,
  );
  const [disabled, setDisabled] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `likes-post-id-${postID}-useQuery`,
      JSON.stringify({ postID, userID: user?.userID }),
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
      dispatch(setLiked({ postID, liked: newLiked }));
      dispatch(setLikes({ postID, likes: newLiked ? likes + 1 : likes - 1 }));
      await handleLikeService(postID);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      onLikeChange(newLiked);
    } catch (error) {
      console.error({ error });
    }
  }, [liked, postID, user, onLikeChange, dispatch, likes]);

  useEffect(() => {
    if (data) {
      dispatch(setLikes({ postID, likes: data.likes }));
      dispatch(setLiked({ postID, liked: data.liked }));
      setDisabled(false);
    }
  }, [data, dispatch, postID]);

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
          width={SIZES.icons}
          height={SIZES.icons}
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
