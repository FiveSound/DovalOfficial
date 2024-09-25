import React, { useState } from "react";
import { Buttons, IsLoading } from "../../../../components/custom";
import styles from "./styles";
import i18next from "../../../../Translate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../../context/AuthContext";
import {
  getFollowingProfileService,
  handleProfileFollowingService,
} from "../../../../services/follows";
import { Text } from "../../../../components/native";

type Props = {
  showFollows: boolean;
  userID: string;
};

const FollowButtons = (props: Props) => {
  const { showFollows, userID } = props;
  const queryClient = useQueryClient();
  const { user, isLoadingApp } = useAuth();
  const MyUser = userID === user?.userID;
  const [visible, setVisible] = useState(false);

  const { data, isError, isLoading, isFetching } = useQuery({
    queryKey: ["component-cto-public", userID, user?.userID],
    queryFn: getFollowingProfileService,
    enabled: userID && !isLoadingApp ? true : false,
  });

  const mutation = useMutation({
    mutationFn: handleProfileFollowingService,
    onMutate: variables => {
    },
    onSuccess: ({ follow }) => {
      queryClient.setQueryData(
        ["component-cto-public", userID, user?.userID],
        (oldData: any) => {
          const newData = {
            ...oldData,
            followers: follow ? oldData.followers + 1 : oldData.followers - 1,
            followed: follow,
          };
          return newData;
        }
      );
    },
    onError: error => {
      console.error("Mutation error:", error);
    },
    onSettled: (data, error, variables, context) => {
    },
  });

  if (isError) return <Text>Ha ocurrido un error!</Text>;

  if (data) {
    const { followed, following, followers, posts } = data;

    return (
      showFollows &&
      !followed &&
      !MyUser && (
        <Buttons
          label={followed ? i18next.t("Following") : i18next.t("Follow")}
          disabled={false}
          containerButtons={styles.containerButtons}
          onPress={() => {
            if (user) {
              mutation.mutate(userID);
              if (followed) {
                console.log("Unfollowing");
              } else {
                console.log("Following");
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
