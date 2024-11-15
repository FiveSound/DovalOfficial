import { memo, useContext, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import { Platform, SafeAreaView } from '../../components/native';
import { ScreenEmpty } from '../../components/custom';
import { FeedHeading } from './components';
import React from 'react';
import { TabBarVisibilityContext } from '../../context/TabBarVisibilityContext';
import { useAppDispatch, useAppSelector } from '../../redux';
import { RootState } from '../../redux/store';
import { SIZES } from '../../constants/theme';
import { Ilustrations } from '../../constants';
import i18next from '../../Translate';
import { openOnboardingModal } from '../../redux/slides/modalSlice';
import Masonry from '../../components/custom/Masonry';
import MansorySkeleton from '../../components/custom/Masonry/MansorySkeleton';
import { feedService } from '../../services/feed';

const QUERY_KEY = 'QUERY_KEY_FEED';

const Feed = memo(() => {
  const [page, setPage] = useState<number>(1);
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { location } = useAppSelector((state: RootState) => state.location);
  const queryClient = useQueryClient();
  const { setTabBarVisible } = useContext(TabBarVisibilityContext);

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
      queryClient.setQueryData([QUERY_KEY], (oldData: any[] = []) => [...oldData, ...data]);
      setPage(nextPage);
    },
  });

  useEffect(() => {
    setTabBarVisible(true);
    return () => {
      setTabBarVisible(false);
    };
  }, [setTabBarVisible]);

  if (explore.isLoading || explore.isFetching) {
    return <MansorySkeleton showHeader={true} />;
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

  return (
    <SafeAreaView style={styles.container}>
      <FeedHeading />
      <Masonry
        pins={explore.data}
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