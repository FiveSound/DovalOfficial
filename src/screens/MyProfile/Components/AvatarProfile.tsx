import React, { memo, useCallback, useState } from 'react';
import { Avatars, FlexContainer, Perks } from '../../../components/custom';
import { CLOUDFRONT } from '../../../services';
import * as Haptics from 'expo-haptics';
import UploadAvatar from './UploadAvatar';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/theme';
import i18next from '../../../Translate';

type Props = {
  data: {
    avatar?: string;
  };
  refetch: any;
};

const AvatarProfile = (props: Props) => {
  const { data, refetch } = props;
  const [loadCount, setLoadCount] = useState(0);
  const [avatarLoader, setAvatarLoader] = useState(false);
  const [imageAvatar, setImageAvatar] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'success' | 'error' | null>(
    null,
  );

  const updateAvatar = useCallback(() => {
    UploadAvatar(
      setImageAvatar,
      refetch,
      setAvatarLoader,
      setLoadCount,
      setUploadStatus,
    );
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [refetch, setLoadCount]);

  return (
    <FlexContainer newStyle={styles.container}>
      <Avatars
        source={`${CLOUDFRONT}${data?.avatar}`}
        size="xxLarge"
        Upload={true}
        onPress={updateAvatar}
        label={i18next.t('Upload Image..')}
        IsLoading={avatarLoader}
        onPressAvatar={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        }}
      />
      {uploadStatus === 'success' && (
        <Perks
          status="success"
          label={i18next.t('Avatar updated successfully')}
        />
      )}
      {uploadStatus === 'error' && (
        <Perks status="error" label={i18next.t('Failed to update avatar')} />
      )}
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    alignItems: 'center',
    height: 'auto',
    justifyContent: 'center',
  },
});
export default memo(AvatarProfile);
