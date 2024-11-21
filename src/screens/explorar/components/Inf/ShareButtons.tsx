import React, { useCallback, useEffect, useState } from 'react';
import {
  FlexContainer,
  Icons,
  Typography,
} from '../../../../components/custom';
import styles from './styles';
import {
  ArrowRight01Icon,
  SentIconReaction,
} from '../../../../constants/IconsPro';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import useAPI from '../../../../hooks/useAPI';
import {
  getSharePostService,
  sharingService,
} from '../../../../services/reactions';
import { useAuth } from '../../../../context/AuthContext';
import * as Haptics from 'expo-haptics';

type Props = {
  liked: boolean;
  postID: number;
};

const ShareButtons = (props: Props) => {
  const { liked, postID } = props;
  const { user } = useAuth();
  const [visible, setVisible] = useState(liked);
  const [shared, setShared] = useState(false);
  const [length, setLength] = useState(0);
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
    setShared(newShared);
    setLength(prevLikes => (newShared ? prevLikes + 1 : prevLikes - 1));
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    try {
      await sharingService(postID, '/');
      if (newShared && user) {
        setNotification(true);
        const timer = setTimeout(() => {
          setNotification(false);
        }, 3000);
        return () => clearTimeout(timer);
      }
      if (!newShared) {
        const hideTimer = setTimeout(() => {
          setVisible(false);
        }, 1000);
        return () => clearTimeout(hideTimer);
      }
    } catch (error) {
      setNotification(false);
      setShared(!newShared);
      setLength(prevLikes => (newShared ? prevLikes - 1 : prevLikes + 1));
    }
  }, [user, shared, postID]);

  useEffect(() => {
    if (data) {
      setLength(data.length);
      setShared(data.shared);
    }
  }, [data]);

  useEffect(() => {
    if (liked) {
      setVisible(true);
    } else if (shared) {
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 1000);
      return () => clearTimeout(hideTimer);
    }
  }, [liked, shared]);

  return (
    visible && (
      <Icons
        onPress={handleShare}
        styles={styles.buttonsActions}
        appendIcons={
          <FlexContainer
            variant="row"
            newStyle={styles.containerButtonsActions}
          >
            <SentIconReaction
              width={SIZES.icons}
              height={SIZES.icons}
              color={COLORS.TranspLight}
            />
            <Typography variant="H4title">
              {shared ? 'Share For You!' : 'Share'}
            </Typography>
            <ArrowRight01Icon />
          </FlexContainer>
        }
      />
    )
  );
};

export default ShareButtons;
