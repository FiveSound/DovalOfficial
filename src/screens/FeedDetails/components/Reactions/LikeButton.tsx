import React, { useEffect, useState, useCallback, memo } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import {
  getLikePostService,
  handleLikeService,
} from '../../../../services/reactions';
import { COLORS, SIZES } from '../../../../constants/theme';
import { FavouriteIcon, FavouriteIconStroke } from '../../../../constants/IconsPro';
import { FlexContainer, LoginAlert, Typography } from '../../../../components/custom';
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
import { openSignupModal } from '../../../../redux/slides/modalSlice';

type Props = {};

const LikeButton: React.FC<Props> = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { Title } = useTheme()
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
      dispatch(openSignupModal());
      return
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


  return (
    <TouchableOpacity style={styles.containerAll} onPress={handleLike}>
      <TouchableOpacity
        onPress={handleLike}
        style={styles.container}
        disabled={disabled}
      >
        {
          liked ? <FavouriteIcon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.error}
          /> : <FavouriteIconStroke
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.dark}
          />
        }
      </TouchableOpacity>
      <Typography variant="H4title" newStyle={styles.label}>
          {formatMilesAndMillions(likes)}

        </Typography>
    </TouchableOpacity>
  );
});

export default LikeButton;
