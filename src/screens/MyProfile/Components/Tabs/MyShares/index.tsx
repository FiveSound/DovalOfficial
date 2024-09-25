import useAPI from "../../../../../hooks/useAPI";
import { mySharedgService } from "../../../../../services/reactions";
import Main from "../Main";

const MyShares = () => {
  const { data, isLoading, isError, refetch } = useAPI({
    queryKey: ["my-Sharedg-Service"],
    queryFn: mySharedgService,
  });

  return (
    <Main
      data={data}
      isLoading={isLoading}
      isError={isError}
      refetch={refetch}
    />
  );
};

export default MyShares;
