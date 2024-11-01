import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { sharedByUserService } from '../../../services/reactions';
import Main from '../../MyProfile/Components/Tabs/Main';

type Props = {
  username: string;
};

const MyShares = (props: Props) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['shared-By-Username-Service-useQuery', props.username],
    queryFn: ({ queryKey }) => {
      const [, username] = queryKey;
      return sharedByUserService(username);
    },
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

export default MyShares;
