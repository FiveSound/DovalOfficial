import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../constants/theme';
import { RefreshControl, SafeAreaView, ScrollView, View } from '../../../components/native';
import { useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { FlexContainer, IsLoading, LineDivider, MasonryList, Typography } from '../../../components/custom';
import RenderItem from './Body/RenderItem';
import ArrowClosed from '../../../components/custom/Arrows/ArrowClosed';
import FrontCover from './FrontCover';
import i18next from '../../../Translate';
import { getReelationatedPostsService } from '@/src/services/posts';

type MainProps = {};
const QUERY_KEY = 'Feed-details-services-related';

const Main = memo((props: MainProps) => {
  const { postID } = useAppSelector((state: RootState) => state.navigation);
  const [page, setPage] = useState<number>(2);

  const queryClient = useQueryClient();

  const { data, isLoading, isRefetching, refetch } = useQuery({
    queryKey: [QUERY_KEY, { page: 1 }],
    queryFn: async () => {
      return await getReelationatedPostsService(postID, page);
    },
  });

  const mutation = useMutation({
    mutationKey: [QUERY_KEY, { page }],
    mutationFn: async (p: number) => {
      return await getReelationatedPostsService(postID, p);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY, { page: 1 }], (oldData: any[] = []) => [...oldData, ...data]);
      setPage(p => p + 1);
    },
  });


  return (
    <SafeAreaView style={styles.container}>

      <ScrollView contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
      >
        <ArrowClosed />
        <FrontCover />
        <RenderItem />

        {isLoading || isRefetching ? <IsLoading /> :
          <>
            <FlexContainer newStyle={styles.titleContainer}>
              <LineDivider variant='secondary' />
              <Typography variant='title'>{i18next.t('Similar recipes and more')}</Typography>
            </FlexContainer>
            <MasonryList
              pins={data}
              onRefresh={refetch}
              refreshing={isRefetching}
              onLoadMore={() => {
                mutation.mutate(page);
              }}
              loading={mutation.isPending}
            />
          </>
        }
      </ScrollView>
    </SafeAreaView>
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
    paddingHorizontal: SIZES.gapLarge,
    marginTop: SIZES.gapLarge,
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
