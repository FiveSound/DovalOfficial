import { useAPI } from "../../../hooks";
import { getRecipesProfileUserService } from "../../../services/accounts";
import Main from "../../MyProfile/Components/Tabs/MyMenu/Main";


type Props = {
  username: string;
};

const MyMenu = (props: Props) => {
  const { data, isLoading, isError, error, refetch } = useAPI({
    queryKey: ["profile-user-recipes-username", props.username],
    queryFn: getRecipesProfileUserService,
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

export default MyMenu;