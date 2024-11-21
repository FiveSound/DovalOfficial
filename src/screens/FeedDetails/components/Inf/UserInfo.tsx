import React, { memo, useContext, useMemo } from 'react';
import {
  TouchableOpacity,
  useNavigation
} from '../../../../components/native';
import {
  Avatars,
  FlexContainer,
  Typography,
} from '../../../../components/custom';
import {  SIZES } from '../../../../constants/theme';
import { VerifyIcons } from '../../../../constants/IconsPro';
import styles from './styles';
import { CLOUDFRONT } from '../../../../services';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';

type Props = {};

const UserInfo = React.memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user } = useAppSelector((state:RootState) => state.auth)
  const memoizedAvatar = useMemo(() => `${CLOUDFRONT}${CurrentFeed.avatar}`, [CurrentFeed.avatar]);
  const navigation = useNavigation();

  const MyProfile = useMemo(
    () => user?.username === CurrentFeed.username,
    [user?.username, CurrentFeed.username],
  );

  const handleNavigation = () => {
    if (MyProfile) {
      navigation.navigate('MyTabs', { 
        screen: 'MyProfile',
      });
    } else {
      navigation.navigate('UserProfile', {
        username: CurrentFeed.username,
        businessID: CurrentFeed.userID,
      });
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleNavigation}>
      <Avatars size='small' source={memoizedAvatar} />
      <FlexContainer>
        <FlexContainer
          newStyle={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Typography
            variant='title'
            numberOfLines={1}
            newStyle={{
              ...styles.titlePost,
            }}
          >
            {CurrentFeed.business_name || ''}
          </Typography>
          {CurrentFeed.verified && (
            <VerifyIcons
              width={SIZES.iconsPro / 1.1}
              height={SIZES.iconsPro / 1.1}
            />
          )}
        </FlexContainer>
        {/* <FlexContainer
          variant="row"
          newStyle={{
            gap: SIZES.gapSmall,
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            variant='subtitle'
            numberOfLines={1}
          >
            @{CurrentFeed.username || ''}
          </Typography>
        </FlexContainer> */}
      </FlexContainer>
    </TouchableOpacity>
  );
});

export default memo(UserInfo);
