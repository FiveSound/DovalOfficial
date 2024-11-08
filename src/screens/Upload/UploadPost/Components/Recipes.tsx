import { useQuery } from '@tanstack/react-query';
import { memo } from 'react';
import { FlatList, Text } from 'react-native';
import { getMyRecipesService } from '../../../../services/recipes';
import { LoadingScreen, Typography } from '../../../../components/custom';

const Recipes = memo(() => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['posts-list-my-recipes'],
    queryFn: getMyRecipesService,
  });

  if (isLoading || isFetching) {
    return <LoadingScreen label="Cargando categorias" />;
  }

  if (isError) {
    return <Typography variant="H4title">An occurred error fetch!</Typography>;
  }

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}
      keyExtractor={item => item.id}
      ListEmptyComponent={<Text>No hay items!</Text>}
    />
  );
});

export default Recipes;
