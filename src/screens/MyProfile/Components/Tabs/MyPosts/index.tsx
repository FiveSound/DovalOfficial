import React, { useEffect, useState } from 'react';
import { getMyPostService } from '../../../../../services/posts';
import Main from '../Main';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MY_POSTS_DATA } from '@/src/constants/storages';
import { storage } from '@/src/components/native';
import { useAppSelector } from '@/src/redux';
import { RootState } from '@/src/redux/store';
import { FlexContainer } from '@/src/components/custom';

const QUERY_KEY = 'get-My-Post-ServiceAll-new-useQuery';
const MY_POSTS_QUERY_KEY = 'myPostsData';

const MyPosts = () => {
  const [page, setPage] = useState<number>(1);
  const queryClient = useQueryClient();
  const { isConnected, isAuthenticated } = useAppSelector((state: RootState) => state.auth);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: [QUERY_KEY, page],
    queryFn: async () => {
      return await getMyPostService(page);
    },
  });

  const loadDataFromStorage = async () => {
    try {
      const feedString = storage.getString(MY_POSTS_DATA);
      return feedString ? JSON.parse(feedString) : [];
    } catch (error) {
      console.error('Error loading data from storage:', error);
      return [];
    }
  };

  const {
    data: myPostsData,
    isLoading: isLoadingMyPostsData,
    isFetching: IsFetchingPost,
  } = useQuery({
    queryKey: [MY_POSTS_QUERY_KEY],
    queryFn: loadDataFromStorage,
    enabled: !isConnected,
  });

  const mutation = useMutation({
    mutationKey: [QUERY_KEY, page],
    mutationFn: async (p: number) => {
      return await getMyPostService(p);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([QUERY_KEY, page], (oldData: any[] = []) => [...oldData, ...data]);
      setPage((prevPage) => prevPage + 1);
    },
  });

  useEffect(() => {
    if (isAuthenticated && data) {
      try {
        storage.set(MY_POSTS_DATA, JSON.stringify(data));
      } catch (error) {
        console.error('Error saving data to storage:', error);
      }
    }
  }, [isConnected, isAuthenticated, data]);

  const isLoadingMain = isConnected && (isLoading || isRefetching);
  const finalFeedData = isConnected ? data : myPostsData;

  return (
      <Main
      data={finalFeedData}
      isLoading={isLoadingMain}
      isError={isError}
      error={error}
      refetch={refetch}
      isRefetching={isRefetching}
      onLoadMore={() => {
        mutation.mutate(page);
      }}
      loading={mutation.isPending}
    />
  );
};

export default MyPosts;