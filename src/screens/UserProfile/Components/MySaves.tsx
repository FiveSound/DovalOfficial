import React from "react";
import { useAPI } from "../../../hooks";
import { getSavedProfileUserService } from "../../../services/accounts";
import Main from "../../MyProfile/Components/Tabs/Main";

type Props = {
  username: string;
};

const MySaves = (props: Props) => {
  const { data, isLoading, isError, error, refetch } = useAPI({
    queryKey: ["profile-user-saved", props.username],
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