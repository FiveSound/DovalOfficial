import { memo, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import React from 'react';
import { FEED_DATA } from '@/src/constants/storages';
import { useScrollToTop } from '@react-navigation/native';
import MasonrySkeleton from '@/src/components/custom/Masonry/MansorySkeleton';
import Masonry from '@/src/components/custom/Masonry';
import { useAppSelector } from '@/src/redux';
import { feedService } from '@/src/services/feed';
import { RootState } from '@/src/redux/store';
import { Platform, SafeAreaView, storage } from '@/src/components/native';
import { FeedHeading } from './components';
import { ScreenEmpty } from '@/src/components/custom';
import i18next from '@/src/Translate';
import { SIZES } from '@/src/constants/theme';
import { Ilustrations } from '@/src/constants';

const FEED_QUERY_KEY = 'FEED_QUERY';
const LOAD_MORE_MUTATION_KEY = 'LOAD_MORE_MUTATION';
const QUERY_KEY_WITHOUT_INTERNET = 'feed-Data-without-internet';

const Feed = memo(() => {
  const [page, setPage] = useState<number>(1);
  const { user, isConnected, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { location } = useAppSelector((state: RootState) => state.location);
  const queryClient = useQueryClient();

  const masonryScrollRef = useRef<ScrollView>(null);
  useScrollToTop(masonryScrollRef);

  const explore = useQuery({
    queryKey: [FEED_QUERY_KEY],
    queryFn: async () => {
      return await feedService(location, user?.userID, page);
    }
  });


  const mutation = useMutation({
    mutationKey: [LOAD_MORE_MUTATION_KEY],
    mutationFn: async () => {
      const nextPage = page + 1;
      const data = await feedService(location, user?.userID, nextPage);
      return { data, nextPage };
    },
    onSuccess: ({ data, nextPage }) => {
      queryClient.setQueryData([FEED_QUERY_KEY], (oldData: any[] = []) => [...oldData, ...data]);
      setPage(nextPage);
    },
  });

  const loadDataFromStorage = async () => {
    try {
      const feedString = storage.getString(FEED_DATA);
      return feedString ? JSON.parse(feedString) : [];
    } catch (error) {
      console.error('Error loading data from storage:', error);
      return [];
    }
  };

  const { data: feedData, isLoading: isLoadingFeedData } = useQuery({
    queryKey: [QUERY_KEY_WITHOUT_INTERNET],
    queryFn: loadDataFromStorage,
    enabled: !isConnected,
  });

  useEffect(() => {
    if (isAuthenticated && explore.data) {
      try {
        storage.set(FEED_DATA, JSON.stringify(explore.data));
      } catch (error) {
        console.error('Error al guardar datos en almacenamiento:', error);
      }
    }
  }, [isConnected, isAuthenticated, explore.data]);

  const isLoading = (isConnected && (explore.isLoading || explore.isFetching)) || (!isConnected && isLoadingFeedData);

  if (isLoading) {
    return <MasonrySkeleton showHeader={true} />;
  }

  if (explore.isError) {
    return (
      <SafeAreaView style={styles.container}>
        <FeedHeading />
        <ScreenEmpty
          labelPart1={i18next.t('Oh no!')}
          labelPart2={i18next.t('Something went wrong')}
          ImgHeigth={SIZES.height / 3}
          ImgWidth={SIZES.width}
          source={Ilustrations.Broken}
          onPress={() => {
            explore.refetch();
          }}
          labelButton={i18next.t('Try again')}
        />
      </SafeAreaView>
    );
  }

  const finalFeedData = isConnected ? explore.data : feedData;

  return (
    <SafeAreaView style={styles.container}>
      <FeedHeading />
      <Masonry
        pins={finalFeedData}
        onRefresh={() => {
          explore.refetch();
        }}
        refreshing={explore.isRefetching}
        onLoadMore={() => {
          mutation.mutate();
        }}
        loading={mutation.isPending}
      />
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Platform.OS === 'ios' ? SIZES.gapLarge : SIZES.gapSmall,
  },
});

export default React.memo(Feed);