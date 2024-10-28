import React, { lazy, Suspense, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import {
  setSearchQuery,
  fetchSearchResults,
  clearSearchResults,
} from '../../redux/slides/searchSlice';
import { initialData } from '../../services/search';
import { useRefreshData, useDebounce } from '../../hooks';
import i18next from '../../Translate';
import {
  IsLoading,
  LoadingScreen,
  SearchLayout,
} from '../../components/custom';
import { FlatList } from '../../components/native';
import { useAPI } from '../../hooks';
const LazyCardUser = lazy(
  () => import('../../components/custom/Cards/CardUsers'),
);

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { query, users, isLoading, isError, error } = useSelector(
    (state: RootState) => state.search,
  );

  const debouncedQuery = useDebounce(query, 500);
  const { refetch: refetchPostData } = useAPI({
    queryKey: ['DataSearch-initial'],
    queryFn: () => initialData(1),
  });

  const { onRefresh, isRefreshing } = useRefreshData([refetchPostData]);

  useEffect(() => {
    if (debouncedQuery.trim() !== '') {
      dispatch(fetchSearchResults(debouncedQuery));
    } else {
      dispatch(clearSearchResults());
    }
  }, [debouncedQuery, dispatch]);

  const handleSearchChange = useCallback(
    (newQuery: string) => {
      dispatch(setSearchQuery(newQuery));
    },
    [dispatch],
  );

  const renderItemFiltered = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <Suspense fallback={<IsLoading />}>
          <LazyCardUser
            key={item.id}
            userID={item.userID}
            name={item.name}
            cover={item.avatar}
            username={item.username || item.name}
            isVerified={item.verify === 1}
            followersCount={item.follower_count || 0}
            onFollow={() =>
              console.log(`[LazyCardUser] User ${item.id} follow state toggled`)
            }
            Follow={item.follow}
            ShowName={true}
            ShowLine={false}
            ShowAccess={true}
            ShowButton={false}
            isLoading={isLoading}
          />
        </Suspense>
      );
    },
    [],
  );

  return (
    <SearchLayout
      placeholder={i18next.t('Search users, restaurants and businesses')}
      onChange={handleSearchChange}
      value={query}
    >
      {(isLoading || isRefreshing) && <IsLoading />}
      {isError && <div>{error}</div>}
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={users}
        keyExtractor={item => `${item.id}`}
        renderItem={renderItemFiltered}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        initialNumToRender={2}
        maxToRenderPerBatch={1}
      />
    </SearchLayout>
  );
};

export default Search;
