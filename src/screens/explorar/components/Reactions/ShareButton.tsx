import { useEffect, useState, useCallback, memo } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useAuth } from "../../../../context/AuthContext";
import useAPI from "../../../../hooks/useAPI";
import {
  getSharePostService,
  sharingService,
} from "../../../../services/reactions";
import { SentIconReaction } from "../../../../constants/IconsPro";
import { COLORS, SIZES } from "../../../../constants/theme";
import { formatMilesAndMillions } from "../../../../utils/format";
import * as Haptics from "expo-haptics";
import styles from "./styles";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../redux/store';
import { setShared, setSharedCount } from '../../../../redux/slides/reactionsSlice';
import { LoginAlert } from "../../../../components/custom";

type Props = {
  postID: number;
};

const ShareButton = memo((props: Props) => {
  const { user } = useAuth();
  const { postID } = props;
  const dispatch = useDispatch();
  const shared = useSelector((state: RootState) => state.reactions.shared[postID] || false);
  const length = useSelector((state: RootState) => state.reactions.sharedCount[postID] || 0);
  const [visible, setVisible] = useState(false);
  const [notification, setNotification] = useState(false);

  const { data, isLoading, isFetching } = useAPI({
    queryKey: [
      `share-post-id-${postID}`,
      JSON.stringify({ postID, userID: user?.userID }),
    ],
    queryFn: getSharePostService,
  });

  const handleShare = useCallback(async () => {
    if (!user) {
      setVisible(true);
      return;
    }
    const newShared = !shared;
    dispatch(setShared({ postID, shared: newShared }));
    dispatch(setSharedCount({ postID, count: newShared ? length + 1 : length - 1 }));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await sharingService(postID, "/");
      if (newShared && user) {
        setNotification(true);
        const timer = setTimeout(() => {
          setNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
    } catch (error) {
      dispatch(setShared({ postID, shared }));
      dispatch(setSharedCount({ postID, count: newShared ? length - 1 : length + 1 }));
    }
  }, [user, shared, postID, dispatch, length]);

  const handleAlertDismiss = useCallback(() => {
    setVisible(false);
  }, []);

  useEffect(() => {
    if (data) {
      dispatch(setShared({ postID, shared: data.shared }));
      dispatch(setSharedCount({ postID, count: data.length }));
    }
  }, [data, dispatch, postID]);

  return (
    <TouchableOpacity
      onPress={handleShare}
      style={styles.container}
    >
      <SentIconReaction
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={shared ? COLORS.primary : COLORS.TranspLight}
      />
      <Text style={styles.label}>
        {formatMilesAndMillions(length)}
      </Text>
      <LoginAlert showAlert={visible} onDismiss={handleAlertDismiss} />
    </TouchableOpacity>
  );
});

export default ShareButton;