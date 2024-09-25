import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { useTheme } from "../../../hooks";
import { getFollowersAccountsService, handleProfileFollowingService, handleSearchFollowersService } from "../../../services/follows";
import { LoadingScreen } from "../../../components/custom";
import Layout from "./Layout";
import mutate from "./mutate";

type Props = {
  username: string;
};

const Followers = ({ username }: Props) => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { BackgroundMain: Bg } = useTheme();

  const [page] = useState(1);

  let queryKey = "component-followers";

  const { data, isLoading, isFetching } = useQuery({
    queryKey: [queryKey, user?.userID, username],
    queryFn: ({ queryKey }) =>
      getFollowersAccountsService(queryKey[1], queryKey[2], page),
  });

  const mutation = useMutation({
    mutationFn: handleProfileFollowingService,
    onSuccess: (result) => {
      queryClient.setQueryData(
        [queryKey, user?.userID, username],
        (oldData: any[]) => mutate(oldData, result)
      );

      queryClient.setQueryData(
        ["component-following", user?.userID, username],
        (oldData: any[]) => mutate(oldData, result)
      );
    },
  });

  const mutationSearch = useMutation({
    mutationFn: handleSearchFollowersService,
    onSuccess: (result) =>
      queryClient.setQueryData(
        [queryKey, user?.userID, username],
        () => result
      ),
  });

  const handleSearch = (text: string) => {
    mutationSearch.mutate({ text, userID: user?.userID, username });
  };

  if (isLoading || isFetching)
    return <LoadingScreen />;

  if (data) {
    return (
      <Layout
        userID={user?.userID}
        data={data}
        onFollow={(userID) => mutation.mutate(userID)}
        onShearch={(text) => handleSearch(text)}
        searching={mutationSearch.isPending}
      />
    );
  }
};

export default Followers;