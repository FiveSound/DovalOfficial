import React, { useEffect } from 'react';
import { getFollowersService } from '../../services/follows';
import { LoadingScreen, SignupAlert, Tabs, Typography } from '../../components/custom';
import {
  AvatarProfile,
  LayoutProfile,
  Inf,
  Follows,
  TabsMyProfile,
  MyPosts,
  MyShares,
  MySaves,
  MyMenu,
  CtoProfile,
} from './Components';
import { storage, useNavigation } from '../../components/native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import i18next from '../../Translate';
import { useQuery } from '@tanstack/react-query';
import { FOLLOWERS_DATA, USER_PROFILE_DATA } from '@/src/constants/storages';
import { getProfileService } from '@/src/services/auth';
import { AllBookmarkIcon, AllBookmarkIconStroke, DashboardSquare03Icon, DashboardSquare03IconStroke, SentIconReaction, StoreAdd02Icon, StoreAdd02IconStroke } from '@/src/constants/IconsPro';
import { COLORS, SIZES } from '@/src/constants/theme';
import { useTheme } from '@/src/hooks';

type Props = {};

const MyProfile = (props: Props) => {
  const { isAuthenticated, isLoadingApp, business, isConnected } = useSelector(
    (state: RootState) => state.auth
  );
  const navigation = useNavigation();
  const { Title } = useTheme();

  const {
    data: followersData,
    isLoading: isLoadingFollowers,
    refetch: refetchFollowers,
    error: followersError,
    isRefetching: isRefetchingFollowers,
  } = useQuery({
    queryKey: ['get-Followers-Services'],
    queryFn: getFollowersService,
    enabled: isAuthenticated && isConnected,
  });

  const {
    data: userProfileData,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
    error: profileError,
    isRefetching: isRefetchingProfile,
  } = useQuery({
    queryKey: ['get-Profile-Services'],
    queryFn: getProfileService,
    enabled: isAuthenticated && isConnected,
  });

  const loadDataFromStorage = () => {
    try {
      const userProfileString = storage.getString(USER_PROFILE_DATA);
      const followersString = storage.getString(FOLLOWERS_DATA);

      return {
        userProfileData: userProfileString ? JSON.parse(userProfileString) : null,
        followersData: followersString ? JSON.parse(followersString) : null,
      };
    } catch (error) {
      console.error('Error loading data from storage:', error);
      return { userProfileData: null, followersData: null };
    }
  };

  const { data: cachedData, isLoading: isLoadingCachedData } = useQuery({
    queryKey: ['load-cached-data'],
    queryFn: loadDataFromStorage,
    enabled: !isConnected && isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated && followersData && userProfileData) {
      try {
        storage.set(FOLLOWERS_DATA, JSON.stringify(followersData));
        storage.set(USER_PROFILE_DATA, JSON.stringify(userProfileData));
      } catch (error) {
        console.error('Error al guardar datos en almacenamiento:', error);
      }
    }
  }, [isConnected, isAuthenticated, followersData, userProfileData]);

  const isLoading =
    (isConnected &&
      (isLoadingProfile ||
        isRefetchingProfile ||
        isLoadingFollowers ||
        isRefetchingFollowers)) ||
    (!isConnected && isLoadingCachedData);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !isLoadingApp) {
    return <SignupAlert />;
  }

  if ((followersError || profileError) && isConnected) {
    console.error('Error fetching data:', { followersError, profileError });
    return (
      <LayoutProfile>
        <Typography variant="H4title">
          {i18next.t('Error fetching data')}
        </Typography>
      </LayoutProfile>
    );
  }

  const finalFollowersData = isConnected ? followersData : cachedData?.followersData;
  const finalUserProfileData = isConnected ? userProfileData : cachedData?.userProfileData;
  const tabs = [
    {
      key: 'posts',
      content: <MyPosts />,
      activeIcon: <DashboardSquare03Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary}/>,    
      inactiveIcon: <DashboardSquare03IconStroke width={SIZES.icons} height={SIZES.icons} color={Title}/>,       
    },
    {
      key: 'menu',
      content: <MyMenu />,
      activeIcon: <StoreAdd02Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary}/>,
      inactiveIcon: <StoreAdd02IconStroke width={SIZES.icons} height={SIZES.icons} color={Title}/>,
    },
    // {
    //   key: 'shares',
    //   content: <MyShares />,
    //   activeIcon: <SentIconReaction width={SIZES.icons} height={SIZES.icons} color={COLORS.primary}/>,
    //   inactiveIcon: <SentIconReaction width={SIZES.icons} height={SIZES.icons} color={Title}/>,
    // },
    // {
    //   key: 'saves',
    //   content: <MySaves />,
    //   activeIcon: <AllBookmarkIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary}/>,
    //   inactiveIcon: <AllBookmarkIconStroke width={SIZES.icons} height={SIZES.icons} color={Title}/>,
    // }
  ];

  if (finalUserProfileData && finalFollowersData) {
    return (
      <LayoutProfile
        data={finalUserProfileData}
        isRefreshing={isRefetchingFollowers || isRefetchingProfile}
        onRefresh={() => {
          if (isConnected) {
            refetchFollowers();
            refetchProfile();
          }
        }}
      >
        <AvatarProfile data={finalUserProfileData} refetch={refetchProfile} />
        <Inf data={finalUserProfileData} />

        <Follows
          data={finalFollowersData}
          onPressFollowing={() =>
            navigation.navigate('Followers', {
              initialIndex: 1,
              username: finalUserProfileData?.username,
            })
          }
          onPressFollowers={() =>
            navigation.navigate('Followers', {
              initialIndex: 0,
              username: finalUserProfileData?.username,
            })
          }
        />
        <CtoProfile data={finalUserProfileData} isUsers={true} />
        <MyPosts />
      </LayoutProfile>
    );
  }

  return (
    <LayoutProfile>
      <Typography variant="H4title">
        {i18next.t('No data available')}
      </Typography>
    </LayoutProfile>
  );
};

export default MyProfile;