import { memo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FlatList, Text } from 'react-native';
import { getTagsService } from '../../../../services/posts';
import { LoadingScreen, Typography } from '../../../../components/custom';

const Tags = memo(() => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['posts-list-tags'],
    queryFn: getTagsService,
  });

  if (isLoading || isFetching) {
    return <LoadingScreen label="Cargando categorias" />;
  }

  if (isError) {
    return <Typography variant="H4title">An occurred error fetch!</Typography>;
  }

  return (
    <FlatList
      data={data.list}
      renderItem={({ item }) => <Text>{JSON.stringify(item, null, 2)}</Text>}
      keyExtractor={item => item.id.toString()}
    />
  );
});

export default Tags;
