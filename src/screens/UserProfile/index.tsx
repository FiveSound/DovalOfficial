import { useContext, useEffect, useState } from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { getProfileUserByUsernameService } from '../../services/accounts';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../hooks';
import { LoadingScreen, Typography } from '../../components/custom';
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
  MySaves,
  MyShares,
  CtoUserProfile,
} from './Components';
import i18next from '../../Translate';
import { useQuery } from '@tanstack/react-query';
import { TabBarVisibilityContext } from '../../context/TabBarVisibilityContext';

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

  const { data, isError, isLoading, isFetching, isRefetching, refetch } =
    useQuery({
      queryKey: ['getProfileUserByUsernameService-useQuery', username],
      queryFn: getProfileUserByUsernameService,
    });

    const { setTabBarVisible } = useContext(TabBarVisibilityContext);
    useEffect(() => {
      setTabBarVisible(false);
  
      return () => {
        setTabBarVisible(true);
      };
    }, [setTabBarVisible]);

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
      <TabsMyProfile 
        MyPosts={<MyPosts username={username} />}
        MySaves={<MySaves username={username} />}
        Myshares={<MyShares username={username} />}
        MyMenu={<MyMenu businessID={businessID} />}
      />
    </LayoutProfile>
  );
};

export default UserProfile;
