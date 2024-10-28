import React from 'react';
import useAPI from '../../../../../hooks/useAPI';
import { getMyPostService } from '../../../../../services/posts';
import Main from '../Main';

const MyPosts = () => {
  const { data, isLoading, isError, error, refetch } = useAPI({
    queryKey: ['get-My-Post-ServiceAll-new'],
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
