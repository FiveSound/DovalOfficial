import React, { memo, useContext, useMemo } from 'react';
import {
  TouchableOpacity,
  useNavigation,
  View,
} from '../../../../components/native';
import { useAuth } from '../../../../context/AuthContext';
import {
  Avatars,
  FlexContainer,
  Typography,
} from '../../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { VerifyIcons } from '../../../../constants/IconsPro';
import styles from './styles';
import { CLOUDFRONT } from '../../../../services';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';
import { ActiveTabContext } from '../../../../context/ActiveTabContext';

type Props = {};

const UserInfo = React.memo((props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user } = useAppSelector((state:RootState) => state.auth)
  const navigation = useNavigation();
  const { setActiveTab } = useContext(ActiveTabContext);

  const MyProfile = useMemo(
    () => user?.username === CurrentFeed.username,
    [user?.username, CurrentFeed.username],
  );
  const handleNavigation = () => {
    if (MyProfile) {
      setActiveTab('Profile');
      navigation.navigate('ProfileStack', { 
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
      <Avatars size="medium" source={`${CLOUDFRONT}${CurrentFeed.avatar}`} />
      <FlexContainer>
        <FlexContainer
          newStyle={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Typography
            variant='title'
            numberOfLines={1}
            newStyle={{
              ...styles.titlePost,
              maxWidth: SIZES.width / 2,
              width: 'auto',
            }}
          >
            {CurrentFeed.business_name || ''}
          </Typography>
          {CurrentFeed.verify === 1 && (
            <VerifyIcons
              width={SIZES.iconsPro / 1.1}
              height={SIZES.iconsPro / 1.1}
            />
          )}
        </FlexContainer>
        <FlexContainer
          variant="row"
          
          newStyle={{
            maxWidth: SIZES.width / 2,
            gap: SIZES.gapSmall,
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}
        >
          <Typography
            variant='subtitle'
            numberOfLines={1}
            newStyle={{ color: COLORS.TranspLight }}
          >
            @{CurrentFeed.username || ''}
          </Typography>
        </FlexContainer>
      </FlexContainer>
    </TouchableOpacity>
  );
});

export default memo(UserInfo);
