import { useEffect } from 'react';
import { getFollowersService } from '../../services/follows';
import { getProfileService } from '../../services/auth';
import useAPI from '../../hooks/useAPI';
import { useRefreshData } from '../../hooks/useRefreshData';
import { LoadingScreen, Typography } from '../../components/custom';
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
import { useNavigation } from '../../components/native';
import Signup from '../auth/Signup';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import i18next from '../../Translate';
import { useQuery } from '@tanstack/react-query';

type Props = {};

const MyProfile = (props: Props) => {
  const { isAuthenticated, isLoadingApp, business } = useSelector(
    (state: RootState) => state.auth,
  );
  const navigation = useNavigation();

  const {
    data: followersData,
    isLoading: isLoadingFollowers,
    refetch: refetchFollowers,
    error: followersError,
  } = useQuery({
    queryKey: ['get-Followers-Services-useQuery'],
    queryFn: () => getFollowersService(),
  });

  const {
    data: userProfileData,
    isLoading: isLoadingProfile,
    refetch: refetchProfile,
    error: profileError,
  } = useQuery({
    queryKey: ['get-Profile-Services-useQuery'],
    queryFn: () => getProfileService(),
  });

  const { isRefreshing, onRefresh } = useRefreshData([
    refetchProfile,
    refetchFollowers,
  ]);

  useEffect(() => {}, [business]);

  useEffect(() => {
    if (isAuthenticated) {
      refetchProfile();
      refetchFollowers();
    }
  }, [isAuthenticated, refetchProfile, refetchFollowers]);

  useEffect(() => {
    if (!isLoadingApp && !isLoadingFollowers && !isLoadingProfile) {
      if (isAuthenticated) {
        refetchProfile();
        refetchFollowers();
      }
    }
  }, [
    isLoadingApp,
    isLoadingFollowers,
    isLoadingProfile,
    isAuthenticated,
    refetchProfile,
    refetchFollowers,
  ]);

  if (isLoadingApp || isLoadingFollowers || isLoadingProfile) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !isLoadingApp) {
    return <Signup />;
  }

  if (followersError || profileError) {
    console.error('Error fetching data:', { followersError, profileError });
    return (
      <LayoutProfile
        data={null}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      >
        <Typography variant="H4title">
          {i18next.t('Error fetching data')}
        </Typography>
      </LayoutProfile>
    );
  }

  if (userProfileData && followersData) {
    return (
      <LayoutProfile
        data={userProfileData}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      >
        <AvatarProfile data={userProfileData} refetch={refetchProfile} />
        <Inf data={userProfileData} />
        <CtoProfile data={userProfileData} />
        <Follows
          data={followersData}
          onPressFollowing={() =>
            navigation.navigate('Followers', {
              initialIndex: 1,
              username: userProfileData?.username,
            })
          }
          onPressFollowers={() =>
            navigation.navigate('Followers', {
              initialIndex: 0,
              username: userProfileData?.username,
            })
          }
        />
        {/* <IncompleteInfo visible={true} /> */}
        <TabsMyProfile
          MyPosts={<MyPosts />}
          Myshares={<MyShares />}
          MySaves={<MySaves />}
          MyMenu={<MyMenu />}
        />
      </LayoutProfile>
    );
  }
};

export default MyProfile;
