import React, { useEffect, useState, useCallback, memo } from "react";
import { useAuth } from "../../../../context/AuthContext";
import useAPI from "../../../../hooks/useAPI";
import { getLikePostService, handleLikeService } from "../../../../services/reactions";
import { COLORS, SIZES } from "../../../../constants/theme";
import { FavouriteIcon } from "../../../../constants/IconsPro";
import { LoginAlert, Typography } from "../../../../components/custom";
import { formatMilesAndMillions } from "../../../../utils/format";
import * as Haptics from "expo-haptics";
import styles from "./styles";
import { TouchableOpacity } from "../../../../components/native";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setLikes, setLiked } from '../../../../redux/slides/reactionsSlice';

type Props = {
  postID: number;
  onLikeChange: (liked: boolean) => void; 
};

const LikeButton: React.FC<Props> = memo(({ postID, onLikeChange }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const likes = useSelector((state: RootState) => state.reactions.likes[postID] || 0);
  const liked = useSelector((state: RootState) => state.reactions.liked[postID] || false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [visible, setVisible] = useState(false);

  const { data, isLoading, isFetching } = useAPI({
    queryKey: [
      `likes-post-id-${postID}`,
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