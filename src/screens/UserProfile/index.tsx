import { useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getProfileUserByUsernameService } from '../../services/accounts';
import { useTheme } from '../../hooks';
import { LoadingScreen, Tabs, Typography } from '../../components/custom';
import { useNavigation } from '../../components/native';
import {
  AvatarProfile,
  Follows,
  Inf,
  LayoutProfile,
  TabsMyProfile,
} from '../MyProfile/Components';
import {
  MyMenu,
  MyPosts,
  CtoUserProfile,
} from './Components';
import i18next from '../../Translate';
import { useQuery } from '@tanstack/react-query';
import { DashboardSquare03Icon, DashboardSquare03IconStroke, StoreAdd02Icon, StoreAdd02IconStroke } from '@/src/constants/IconsPro';
import { COLORS, SIZES } from '@/src/constants/theme';

interface RouteParams {
  username: string;
  businessID: string;
}

type Props = {};

const UserProfile = (props: Props) => {
  const route = useRoute<RouteProp<{ params: RouteParams }, 'params'>>();
  const { username, businessID } = route.params;
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { Title } = useTheme();
  const { data, isError, isLoading, isFetching, isRefetching, refetch } =
    useQuery({
      queryKey: ['getProfileUserByUsernameService-useQuery', username],
      queryFn: getProfileUserByUsernameService,
    });

  useEffect(() => {
    if (refreshing) {
      refetch();
      setRefreshing(false);
    }
  }, [refreshing]);

  if (isLoading || isFetching || isRefetching) {
    return <LoadingScreen />;
  }

  if (isError) {
    console.error('Error fetching data:', { isError });
    return (
      <LayoutProfile
        data={null}
        isRefreshing={isRefetching}
        onRefresh={refetch}
      >
        <Typography variant="H4title">
          {i18next.t('Error fetching data')}
        </Typography>
      </LayoutProfile>
    );
  }

  // const tabs = [
  //   {
  //     key: 'posts',
  //     content: <MyPosts username={username} />,
  //     activeIcon: <DashboardSquare03Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary}/>,    
  //     inactiveIcon: <DashboardSquare03IconStroke width={SIZES.icons} height={SIZES.icons} color={Title}/>,       
  //   },
  //   {
  //     key: 'menu',
  //     content: <MyMenu businessID={businessID} />,
  //     activeIcon: <StoreAdd02Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary}/>,
  //     inactiveIcon: <StoreAdd02IconStroke width={SIZES.icons} height={SIZES.icons} color={Title}/>,
  //   },
  // ];

  return (
    <LayoutProfile data={data} isRefreshing={refreshing} onRefresh={refetch}>
      <AvatarProfile data={data} refetch={refetch} Upload={false} />
      <Inf data={data} />
      <Follows
        data={data}
        onPressFollowing={() =>
          navigation.navigate('Followers', {
            initialIndex: 1,
            username: data.username,
          })
        }
        onPressFollowers={() =>
          navigation.navigate('Followers', {
            initialIndex: 0,
            username: data.username,
          })
        }
      />
      <CtoUserProfile data={data} />
      <MyPosts username={username}/>
      {/* <MyMenu businessID={businessID} /> */}
    </LayoutProfile>
  );
};

export default UserProfile;
