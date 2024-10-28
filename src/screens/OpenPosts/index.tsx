import React from 'react';
import { useAPI } from '../../hooks';
import { Text } from '../../components/native';

type Props = {};

const OpenPosts = (props: Props) => {
  // const {
  //     data: followersData,
  //     isLoading: isLoadingFollowers,
  //     refetch: refetchFollowers,
  //     error: followersError,
  //   } = useAPI({
  //     queryKey: ["get-Followers-Services"],
  //     queryFn: () => getUserProfilePostService(),
  //   });

  return <Text>OpenPosts</Text>;
};

export default OpenPosts;
