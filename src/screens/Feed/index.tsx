import { lazy, memo, Suspense, useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { getExploreData } from '../../services/recipes';
import { View, useNavigation, Text, SafeAreaView } from '../../components/native';
import {IsLoading, LoadingScreen, ScreenEmpty, TabList } from '../../components/custom';
import { FeedHeading } from './components';
import React from 'react';
import { TabBarVisibilityContext } from '../../context/TabBarVisibilityContext';
import { useAppDispatch, useAppSelector } from '../../redux';
import { RootState } from '../../redux/store';
import { SIZES } from '../../constants/theme';
import { Ilustrations } from '../../constants';
import i18next from '../../Translate';
import { useIsFocused } from '@react-navigation/native';
import { openOnboardingModal } from '../../redux/slides/modalSlice';
const LazyMansory = lazy(() => import('../../components/custom/Masonry'));

const QUERY_KEY = 'feed-screen-new-location';

const Feed = memo(() => {
  const { location } = useAppSelector((state: RootState) => state.location);

  const { navigate } = useNavigation();
  const [page, setPage] = useState<number>(2);
  const { user, isAuthenticated, isLoadingApp } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch()
  const explore = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getExploreData(location, 1),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (p) => {
      setPage(p + 1);
      return await getExploreData(location, p);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY], (oldData: any[] = []) => [...oldData, ...data]);
    },
  });

  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(true);

    return () => {
      setTabBarVisible(false);
    };
  }, [setTabBarVisible]);

  useEffect(() => {
    if (!isLoadingApp && isAuthenticated && !user?.onboarding) {
     dispatch(openOnboardingModal())
    }
  }, [user]);
  const isFocused = useIsFocused(); 

  const tabsLists = [{
    title: "All",
    status: "all"
  },
  {
    title: "New",
    status: "new"
  },
  {
    title: "Trending",
    status: "trending"
  },
  {
    title: 'Nearby me',
    status: 'nearby'
  },
  {
    title: "Popular",
    status: "popular"
  },
  {
    title: "Recipes",
    status: "recipes"
  },
  {
    title: "Videos",
    status: "videos"
  }
]

  if (explore.isLoading || explore.isFetching) {
    return <LoadingScreen />;
  }

  if (explore.isError) {
    return (
      <SafeAreaView style={styles.container}>
      <ScreenEmpty 
      labelPart1={i18next.t('Oh no!')}
      labelPart2={i18next.t('Something went wrong')}
      ImgHeigth={SIZES.height / 3}
      ImgWidth={SIZES.width}
      source={Ilustrations.Broken}
      onPress={explore.refetch}
      labelButton={i18next.t('Try again')}
      />
      </SafeAreaView>
    );
  }

  if (explore.isLoading || explore.isFetching) {
    return <LoadingScreen />;
  }

    return (
      <SafeAreaView style={styles.container}>
       <FeedHeading />
        {/* <TabList
        isLoading={false}
        list={tabsLists}
        status='nearby'
      /> */}
      <Suspense fallback={<IsLoading />}>
      <LazyMansory
          pins={explore.data}
          onRefresh={explore.refetch}
          refreshing={explore.isRefetching}
          onLoadMore={() => mutation.mutate(page)}
          loading={mutation.isPending}
          isFocused={isFocused}
        />
      </Suspense>
      </SafeAreaView>
    );

});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default React.memo(Feed);
