import React from 'react';
import { getPostsProfileUserService } from '../../../services/accounts';
import Main from '../../MyProfile/Components/Tabs/Main';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux';

type Props = {
  username: string;
};

const QUERY_KEY = 'profile-user-posts-username-useQuery';
const MyPosts = (props: Props) => {
  const { location } = useAppSelector((state: RootState) => state.location);
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery({
    queryKey: [
      QUERY_KEY,
      props.username,
      JSON.stringify(location),
    ],
    queryFn: getPostsProfileUserService,
  });

  return (
    <Main
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      username={props.username}
      isRefetching={isRefetching}
    />
  );
};

export default MyPosts;
