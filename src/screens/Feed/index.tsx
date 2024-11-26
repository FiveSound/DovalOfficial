import { memo, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { FEED_DATA } from '@/src/constants/storages';
import { useScrollToTop } from '@react-navigation/native';
import MasonrySkeleton from '@/src/components/custom/Masonry/MansorySkeleton';
import { getCachedImage, getCachedVideo } from '../../utils/cacheMMKV';
import { CLOUDFRONT } from '@/src/services';
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
const QUERY_KEY = 'QUERY_KEY_FEED';

const Feed = memo(() => {
  const [page, setPage] = useState<number>(1);
  const { user, isConnected, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const { location } = useAppSelector((state: RootState) => state.location);
  const queryClient = useQueryClient();

  const masonryScrollRef = useRef<ScrollView>(null);
  useScrollToTop(masonryScrollRef);

  const explore = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await feedService(location, user?.userID, page),
  });
  
  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async () => {
      const nextPage = page + 1;
      const data = await feedService(location, user?.userID, nextPage);
      return { data, nextPage };
    },
    onSuccess: ({ data, nextPage }) => {
      data.forEach(async (item: any) => {
        try {
          if (item.thumbnail && typeof item.thumbnail === 'string') {
            const imageUrl = `${CLOUDFRONT}${item.thumbnail}`;
            await getCachedImage(imageUrl);
          }
        } catch (error) {
          console.error(`Error al cachear la imagen con URL "${item.thumbnail}":`, error);
        }

        try {
          if (item.videos && item.videos.key && typeof item.videos.key === 'string') {
            const videoUrl = `${CLOUDFRONT}${item.videos.key}`;
            await getCachedVideo(videoUrl);
          }
        } catch (error) {
          console.error(`Error al cachear el video con URL "${item.videos.key}":`, error);
        }
      });

      queryClient.setQueryData([QUERY_KEY], (oldData: any[] = []) => [...oldData, ...data]);
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
    queryKey: ['feed-Data'],
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
          onPress={explore.refetch}
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
          onRefresh={explore.refetch}
          refreshing={explore.isRefetching}
          onLoadMore={() => mutation.mutate()}
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