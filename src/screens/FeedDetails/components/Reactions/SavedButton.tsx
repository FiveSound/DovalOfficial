import React, { useEffect, useState, useCallback, memo } from 'react';
import {
  getSavedPostService,
  handleSavedService,
} from '../../../../services/reactions';
import { COLORS, SIZES } from '../../../../constants/theme';
import { Bookmark02Icon } from '../../../../constants/IconsPro';
import { formatMilesAndMillions } from '../../../../utils/format';
import * as Haptics from 'expo-haptics';
import styles from './styles';
import { TouchableOpacity, Text } from '../../../../components/native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {
  setSaved,
  setSavedCount,
} from '../../../../redux/slides/reactionsSlice';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../redux';
import { openSignupModal } from '../../../../redux/slides/modalSlice';

type Props = {};

const SavedButton: React.FC<Props> = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const saved = useSelector(
    (state: RootState) => state.reactions.saved[CurrentFeed.id] || false,
  );
  const length = useSelector(
    (state: RootState) => state.reactions.savedCount[CurrentFeed.id] || 0,
  );
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `saved-post-id-${CurrentFeed.id}`,
      JSON.stringify({ postID:CurrentFeed.id, userID: user?.userID }),
    ],
    queryFn: getSavedPostService,
  });

  const handleSaved = useCallback(async () => {
    if (!user) {
      dispatch(openSignupModal());
      return;
    }
    const newSaved = !saved;
    dispatch(setSaved({ postID: CurrentFeed.id, saved: newSaved }));
    dispatch(
      setSavedCount({ postID: CurrentFeed.id, count: newSaved ? length + 1 : length - 1 }),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await handleSavedService(CurrentFeed.id);
      if (newSaved && user) {
        setNotification(true);
        const timer = setTimeout(() => {
          setNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      dispatch(setSaved({ postID: CurrentFeed.id, saved }));
      dispatch(
        setSavedCount({ postID: CurrentFeed.id, count: newSaved ? length - 1 : length + 1 }),
      );
      console.error(error);
    }
  }, [CurrentFeed, saved, user, dispatch, length]);

  useEffect(() => {
    if (data) {
      dispatch(setSaved({ postID: CurrentFeed.id, saved: data.saved }));
      dispatch(setSavedCount({ postID: CurrentFeed.id, count: data.length }));
      setDisabled(false);
    }
  }, [data, dispatch, CurrentFeed]);


  return (
    <TouchableOpacity
      onPress={handleSaved}
      disabled={disabled}
      style={styles.container}
    >
      <Bookmark02Icon
       width={SIZES.icons * 1.2}
       height={SIZES.icons * 1.2}
        color={saved ? COLORS.primary : COLORS.TranspLight}
      />
      <Text style={styles.label}>{formatMilesAndMillions(length)}</Text>
    </TouchableOpacity>
  );
});

export default SavedButton;
