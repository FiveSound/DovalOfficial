import React from "react";
import { useAPI } from "../../../hooks";
import { getPostsProfileUserService } from "../../../services/accounts";
import Main from "../../MyProfile/Components/Tabs/Main";


type Props = {
  username: string;
  currentLocation: object | null;
};

const MyPosts = (props: Props) => {
  const { data, isLoading, isError, error, refetch } = useAPI({
    queryKey: [
      "profile-user-posts-username",
      props.username,
      JSON.stringify(props.currentLocation),
    ],
    queryFn: getPostsProfileUserService,
    enabled: props.username ? true : false,
  });
    
  return (
    <Main
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetch={refetch}
      username={props.username}
    />
  );
};

export default MyPosts;