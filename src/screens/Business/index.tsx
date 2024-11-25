import React from 'react';
import { getDetailsBusinessIDService } from '../../services/business';
import { Container, LoadingScreen, Tabs } from '../../components/custom';
import { GetMenuBusiness, Overview, ProfileBusiness } from './Components';
import i18next from '../../Translate';
import BannerBusiness from './Components/BannerBusiness';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '@/src/redux';
import { RefreshControl, VirtualizedList } from 'react-native';

const QUERY_KEY = 'business-businessID-query';
const Business: React.FC = () => {
  const { location } = useSelector((state: RootState) => state.location);
  const { businessID } = useAppSelector((state: RootState) => state.navigation);
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: [QUERY_KEY, businessID],
    queryFn: () => getDetailsBusinessIDService(location, businessID),
    enabled: !!businessID,
  });

  const tabs = [
    {
      key: 'Menu',
      title: i18next.t('Menu'),
      content: <GetMenuBusiness businessID={businessID} />,
    },
    {
      key: 'Overview',
      title: i18next.t('Overview'),
      content: <Overview data={data} />,
    },
  ];

  if (isLoading || isFetching) {
    return <LoadingScreen label={i18next.t('Loading')} />;
  }

  if (data) {
    const { banner, avatar, business_name } = data;
    return (
      <Container
        label={business_name}
        useSafeArea={true}
        showBack={true}
        showHeader={true}
        style={{ paddingHorizontal: 0 }}
      >
        <VirtualizedList 
          data={[data]} 
          refreshControl={<RefreshControl refreshing={isFetching} onRefresh={refetch} />}
          getItem={(data, index) => data[index]} 
          getItemCount={(data) => data.length}
          renderItem={({ item }) => (
            <>
              <BannerBusiness banner={banner} avatar={avatar} />
              <ProfileBusiness data={item} />
            </>
          )}
          ListFooterComponent={<Tabs tabs={tabs} isBorder={true} />}
        />
      </Container>
    );
  }

  return null; 
};

export default Business;