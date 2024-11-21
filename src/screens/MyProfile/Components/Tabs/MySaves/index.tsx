import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMySavedPostsService } from '../../../../../services/reactions';
import Main from '../Main';

const MySaves = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['get-MySaved-Posts-Service-useQuery'],
    queryFn: getMySavedPostsService,
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

export default MySaves;
