import { useCallback, useState } from 'react';
import {
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Recipe from '../components/Recipe';
import {
  deleteMenuOrderIDService,
  getMenuManagementService,
} from '../../../services/business';
import { Container, LoadingScreen, Pagination, PaginationHeader } from '../../../components/custom';
type DataQueryType = {
  list: any[];
  search: string;
  page: number;
  pageSize: number | null;
  totalPages: number | null;
  pagination: number[] | null;
};

const QUERY_KEY = 'menu-management-screen';
const DEFAULT_PAGE = 1;
const DEFAULT_SEARCH = '';

const initialData = {
  list: [],
  search: DEFAULT_SEARCH,
  page: DEFAULT_PAGE,
  pageSize: null,
  totalPages: null,
  pagination: null,
};

const MenuManagement = () => {
  // States
  const [search, setSearch] = useState('');

  const menu = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () =>
      await getMenuManagementService({
        queryKey: [QUERY_KEY, DEFAULT_PAGE, DEFAULT_SEARCH],
      }),
    initialData,
  });

  console.log(menu.data, 'menu.data');
  // Mutate
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (params: { page: number; search: string }) => {
      return await getMenuManagementService({
        queryKey: [QUERY_KEY, params.page, params.search],
      });
    },
    onSuccess: response => queryClient.setQueryData([QUERY_KEY], response),
  });

  // Methods
  const onRefetch = () => {
    menu.refetch();
    setSearch(DEFAULT_SEARCH);
  };

  const onSearch = useCallback((txt: string) => {
    setSearch(txt);
    mutation.mutate({ page: DEFAULT_PAGE, search: txt });
  }, []);

  const onDeleted = useCallback((id: number, name: string) => {
    Alert.alert('Desea eliminar esta receta?', name, [
      {
        text: 'Cancelar',
      },
      {
        text: 'Confirmar',
        onPress: async () => {
          const response = await deleteMenuOrderIDService(id);

          if (response.success) {
            queryClient.setQueryData([QUERY_KEY], (oldData: DataQueryType) => {
              const updatedList = oldData.list.filter(row => row.id !== id);

              if (updatedList.length > 0) {
                return { ...oldData, list: updatedList };
              }

              // Reset
              const newPage = oldData.page === 1 ? 1 : oldData.page - 1;

              mutation.mutate({ page: newPage, search: DEFAULT_SEARCH });

              return oldData;
            });
          }
        },
      },
    ]);
  }, []);

  if (menu.isLoading || menu.isFetching) return <LoadingScreen />;

  return (
    <Container style={styles.container}>
      <PaginationHeader
        text={search}
        onChangeText={txt => onSearch(txt)}
        refetch={onRefetch}
      />

      <FlatList
        data={menu.data.list}
        renderItem={({ item }) => <Recipe onDelete={onDeleted} {...item} />}
        initialNumToRender={3}
        keyExtractor={row => row.id.toString()}
        refreshing={menu.isFetching}
        onRefresh={onRefetch}
      />

      <Pagination
        currentPage={menu.data.page}
        onChange={newPage =>
          mutation.mutate({ page: newPage, search: DEFAULT_SEARCH })
        }
        pagination={menu.data.pagination}
      />
    </Container>
  );
};

export default MenuManagement;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
  },
});
