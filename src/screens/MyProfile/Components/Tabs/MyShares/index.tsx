import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { mySharedgService } from '../../../../../services/reactions';
import Main from '../Main';

const MyShares = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['my-Sharedg-Service-useQuery'],
    queryFn: mySharedgService,
  });

  return (
    <Main
      data={data}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default MyShares;
