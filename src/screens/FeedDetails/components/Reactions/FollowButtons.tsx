import React, { useState } from 'react';
import { Buttons, IsLoading } from '../../../../components/custom';
import styles from './styles';
import i18next from '../../../../Translate';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../../../context/AuthContext';
import {
  getFollowingProfileService,
  handleProfileFollowingService,
} from '../../../../services/follows';
import { Text } from '../../../../components/native';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';

type Props = { };
const QUERY_KEY = 'component-cto-public-new';
const FollowButtons = (props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const { user , isLoadingApp, isAuthenticated} = useAppSelector((state: RootState) => state.auth);
  const queryClient = useQueryClient();
  const MyUser = CurrentFeed.userID === user?.userID;
  const [visible, setVisible] = useState(false);

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: [QUERY_KEY,  CurrentFeed.userID, user?.userID],
    queryFn: getFollowingProfileService,
    enabled:  CurrentFeed.userID && !isLoadingApp ? true : false,
  });

  const mutation = useMutation({
    mutationFn: handleProfileFollowingService,
    onMutate: variables => {},
    onSuccess: ({ follow }) => {
      queryClient.setQueryData(
        [QUERY_KEY,  CurrentFeed.userID, user?.userID],
        (oldData: any) => {
          const newData = {
            ...oldData,
            followers: follow ? oldData.followers + 1 : oldData.followers - 1,
            followed: follow,
          };
          return newData;
        },
      );
    },
    onError: error => {
      console.error('Mutation error:', error);
    },
    onSettled: (data, error, variables, context) => {},
  });

  if (isError) return <Text>Ha ocurrido un error!</Text>;

  if (data && isAuthenticated) {
    const { followed, following, followers, posts } = data;

    return (
      !followed &&
      !MyUser && (
        <Buttons
          label={followed ? i18next.t('Following') : i18next.t('Follow')}
          disabled={false}
          containerButtons={styles.containerButtons}
          loading={mutation.isPending}
          onPress={() => {
            if (user) {
              mutation.mutate(CurrentFeed.userID);
              if (followed) {
                console.log('Unfollowing');
              } else {
                console.log('Following');
              }
            } else {
              setVisible(true);
            }
          }}
        />
      )
    );
  }
};

export default FollowButtons;
