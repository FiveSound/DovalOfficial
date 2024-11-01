import React from 'react';
import { getMyPostService } from '../../../../../services/posts';
import Main from '../Main';
import { useQuery } from '@tanstack/react-query';

const MyPosts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['get-My-Post-ServiceAll-new-useQuery'],
    queryFn: getMyPostService,
  });

  return (
    <Main
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
    />
  );
};

export default MyPosts;
