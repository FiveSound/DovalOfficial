import useAPI from "../../../../../hooks/useAPI";
import { getMySavedPostsService } from "../../../../../services/reactions";
import Main from "../Main";

const MySaves = () => {
  const { data, isLoading, isError, refetch } = useAPI({
    queryKey: ["get-MySaved-Posts-Service"],
    queryFn: getMySavedPostsService,
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

export default MySaves;
