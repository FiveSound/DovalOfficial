import { useEffect, useState, useCallback, memo } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../../../context/AuthContext';
import {
  getSharePostService,
  sharingService,
} from '../../../../services/reactions';
import { SentIconReaction } from '../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../constants/theme';
import { formatMilesAndMillions } from '../../../../utils/format';
import * as Haptics from 'expo-haptics';
import styles from './styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import {
  setShared,
  setSharedCount,
} from '../../../../redux/slides/reactionsSlice';
import { LoginAlert } from '../../../../components/custom';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../../redux';

type Props = {
};

const ShareButton = memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();
  const shared = useSelector(
    (state: RootState) => state.reactions.shared[CurrentFeed.id] || false,
  );
  const length = useSelector(
    (state: RootState) => state.reactions.sharedCount[CurrentFeed.id] || 0,
  );
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState(false);

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [
      `share-post-id-${CurrentFeed.id}`,
        JSON.stringify({postID: CurrentFeed.id, userID: user?.userID }),
    ],
    queryFn: getSharePostService,
  });

  const handleShare = useCallback(async () => {
    if (!user) {
      setVisible(true);
      return;
    }
    const newShared = !shared;
    dispatch(setShared({ postID: CurrentFeed.id, shared: newShared }));
    dispatch(
      setSharedCount({ postID: CurrentFeed.id, count: newShared ? length + 1 : length - 1 }),
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await sharingService(CurrentFeed.id, '/');
      if (newShared && user) {
        setNotification(true);
        const timer = setTimeout(() => {
          setNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      dispatch(setShared({ postID: CurrentFeed.id, shared }));
      dispatch(
        setSharedCount({ postID: CurrentFeed.id, count: newShared ? length - 1 : length + 1 }),
      );
    }
  }, [user, shared, CurrentFeed, dispatch, length]);

  const handleAlertDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setShared({ postID: CurrentFeed.id, shared: data.shared }));
      dispatch(setSharedCount({ postID: CurrentFeed.id, count: data.length }));
    }
  }, [data, dispatch, CurrentFeed]);

  return (
    <TouchableOpacity onPress={handleShare} style={styles.container}>
      <SentIconReaction
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={shared ? COLORS.primary : COLORS.TranspLight}
      />
      <Text style={styles.label}>{formatMilesAndMillions(length)}</Text>
      <LoginAlert showAlert={visible} onDismiss={handleAlertDismiss} />
    </TouchableOpacity>
  );
});

export default ShareButton;
