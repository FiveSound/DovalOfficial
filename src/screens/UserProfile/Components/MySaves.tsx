import React from 'react';
import { getSavedProfileUserService } from '../../../services/accounts';
import Main from '../../MyProfile/Components/Tabs/Main';
import { useQuery } from '@tanstack/react-query';

type Props = {
  username: string;
};

const MySaves = (props: Props) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['profile-user-saved-useQuery', props.username],
    queryFn: getSavedProfileUserService,
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

export default MySaves;
