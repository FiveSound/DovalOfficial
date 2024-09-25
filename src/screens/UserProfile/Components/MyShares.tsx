import useAPI from "../../../hooks/useAPI";
import { sharedByUserService } from "../../../services/reactions";
import Main from "../../MyProfile/Components/Tabs/Main";

type Props = {
  username: string;
};

const MyShares = (props: Props) => {
  const { data, isLoading, isError, error, refetch } = useAPI({
    queryKey: ["shared-By-Username-Service", props.username],
    queryFn: ({ queryKey }) => {
      const [, username ] = queryKey;
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