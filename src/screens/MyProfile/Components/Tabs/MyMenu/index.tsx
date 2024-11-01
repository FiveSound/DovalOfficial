import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { getMyRecipesService } from '../../../../../services/recipes';
import Main from './Main';

const MyMenu = () => {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['my-recipes_menus-useQuery'],
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
