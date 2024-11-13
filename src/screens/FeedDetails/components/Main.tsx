import React, { memo, Suspense, useEffect, useState } from 'react';
import { StyleSheet, Image } from 'react-native';
import { responsiveFontSize, SIZES } from '../../../constants/theme';
import { RefreshControl, SafeAreaView, ScrollView, View } from '../../../components/native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRelatedPosts } from '../../../services/recipes';
import { IsLoading, MasonryList, Typography } from '../../../components/custom';
import RenderItem from './Body/RenderItem';
import ArrowClosed from '../../../components/custom/Arrows/ArrowClosed';
import FrontCover from './FrontCover';
import i18next from '../../../Translate';

type MainProps = {
  item: string;
};
const QUERY_KEY = 'Feed-details-services-related';
const Main = memo(({ item }: MainProps) => {
  const [displayHeight, setDisplayHeight] = useState<number>(responsiveFontSize(200));
  const { postID } = useAppSelector((state: RootState) => state.navigation);
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const [page, setPage] = useState<number>(2);

  const queryClient = useQueryClient();

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: [QUERY_KEY, { page: 1 }],
    queryFn: async () => {
      return await getRelatedPosts(postID, page);
    },
  });

  const mutation = useMutation({
    mutationKey: [QUERY_KEY, { page }],
    mutationFn: async (p: number) => {
      return await getRelatedPosts(postID, p);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY, { page: 1 }], (oldData: any[] = []) => [...oldData, ...data]);
      setPage(p => p + 1);
    },
  });


  return (
    <View style={styles.container}>
        <ArrowClosed />

      <ScrollView contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <FrontCover/>
        <Animated.View entering={FadeIn.delay(500)}>
        <RenderItem />
        </Animated.View>
    
        <Animated.View entering={FadeIn.delay(500)} style={styles.titleContainer}>
          <Typography variant='title'>{i18next.t('Similar recipes and more')}</Typography>
        </Animated.View>

        <Animated.View entering={FadeIn.delay(600)}>
          {isLoading || isRefetching ? <IsLoading /> :
            <Suspense fallback={<IsLoading />}>
              <SafeAreaView>
                <MasonryList
                  pins={data}
                  onRefresh={refetch}
                  refreshing={isRefetching}
                  onLoadMore={() => {
                    mutation.mutate(page);
                  }}
                  loading={mutation.isPending}
                />
              </SafeAreaView>
            </Suspense>
          }
        </Animated.View>

      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: SIZES.height / 4
  },
  titleContainer: {
    paddingHorizontal: SIZES.gapMedium,
    paddingVertical: SIZES.gapLarge,
    backgroundColor: 'transparent',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: SIZES.height / 2.72,
    height: '20%',
    borderRadius: SIZES.gapLarge,
  },
});

export default Main;
