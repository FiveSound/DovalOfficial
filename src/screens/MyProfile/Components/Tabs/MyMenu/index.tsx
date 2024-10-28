import useAPI from '../../../../../hooks/useAPI';
import { getMyRecipesService } from '../../../../../services/recipes';
import Main from './Main';

const MyMenu = () => {
  const { data, isLoading, isError, refetch } = useAPI({
    queryKey: ['my-recipes_menus'],
    queryFn: getMyRecipesService,
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

export default MyMenu;
