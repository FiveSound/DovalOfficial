import React, { useEffect, useState, useCallback, memo } from 'react';
import * as Haptics from 'expo-haptics';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../../../../context/AuthContext';
import { RootState } from '../../../../../redux/store';
import { getSavedPostService, handleSavedService } from '../../../../../services/reactions';
import { setSaved, setSavedCount } from '../../../../../redux/slides/reactionsSlice';
import { TouchableOpacity } from '../../../../native';
import { Bookmark02Icon } from '../../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../../constants/theme';
import LoginAlert from '../../../Alert/Login';
import Typography from '../../../Typography';
import { formatMilesAndMillions } from '../../../../../utils/format';
import { openSignupModal } from '../../../../../redux/slides/modalSlice';

type Props = {
  postID: number;
};

const SavedButton: React.FC<Props> = memo(({ postID }) => {
  const { user } = useAuth();
  const dispatch = useDispatch();
  const saved = useSelector(
    (state: RootState) => state.reactions.saved[postID] || false,
  );
  const length = useSelector(
    (state: RootState) => state.reactions.savedCount[postID] || 0,
  );
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `saved-post-id-${postID}`,
      JSON.stringify({ postID, userID: user?.userID }),
    ],
    queryFn: getSavedPostService,
  });

  const handleSaved = useCallback(async () => {
    if (!user) {
      dispatch(openSignupModal());
      return
    }
    const newSaved = !saved;
    dispatch(setSaved({ postID, saved: newSaved }));
    dispatch(
      setSavedCount({ postID, count: newSaved ? length + 1 : length - 1 }),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await handleSavedService(postID);
      if (newSaved && user) {
        setNotification(true);
        const timer = setTimeout(() => {
          setNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      dispatch(setSaved({ postID, saved }));
      dispatch(
        setSavedCount({ postID, count: newSaved ? length - 1 : length + 1 }),
      );
      console.error(error);
    }
  }, [postID, saved, user, dispatch, length]);

  useEffect(() => {
    if (data) {
      dispatch(setSaved({ postID, saved: data.saved }));
      dispatch(setSavedCount({ postID, count: data.length }));
      setDisabled(false);
    }
  }, [data, dispatch, postID]);

  return (
    <TouchableOpacity
      onPress={handleSaved}
      disabled={disabled}
      style={styles.container}
    >
      <Bookmark02Icon
        width={SIZES.icons}
        height={SIZES.icons}
        color={saved ? COLORS.primary : COLORS.TranspLight}
      />
      <Typography variant='title' newStyle={styles.label}>{formatMilesAndMillions(length)}</Typography>
    </TouchableOpacity>
  );
});

export default SavedButton;
