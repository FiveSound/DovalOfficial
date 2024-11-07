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
import { Container, LoadingScreen, Pagination, PaginationHeader, ScreenEmpty } from '../../../components/custom';
import { Ilustrations } from '../../../constants';
import { useAppDispatch } from '../../../redux';
import { useNavigation } from '../../../components/native';
import { SIZES } from '../../../constants/theme';
type DataQueryType = {
  list: any[];
  search: string;
  page: number;
  pageSize: number | null;
  totalPages: number | null;
  pagination: number[] | null;
};

const QUERY_KEY = 'menu-management-screen-new';
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
  const navigation = useNavigation()
  const [search, setSearch] = useState('');

  const menu = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () =>
      await getMenuManagementService({
        queryKey: [QUERY_KEY, DEFAULT_PAGE, DEFAULT_SEARCH],
      }),
    initialData,
  });

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
    Alert.alert('¿Está seguro de que desea eliminar esta receta exquisita?', name, [
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

  console.log(menu.data);
  if (menu.isLoading || menu.isFetching) return <LoadingScreen label='Loading recipes...' />;
  
  if (menu.data.list.length === 0) return (
    <Container style={styles.container}>
   <ScreenEmpty 
   labelPart1='No recipes found' 
   labelPart2='Create your first recipe'
   source={Ilustrations.CharcoPet}
   ShowButton={true}
   labelButton='Create recipe'
   onPress={() => navigation.navigate('MainStackt', {
    screen: 'NewRecipie',
   })}
   ImgHeigth={SIZES.height / 3}
   ImgWidth={SIZES.width}
   />
    </Container>
   )

  return (
    <Container style={styles.container}>
      <PaginationHeader
        text={search}
        onChangeText={txt => onSearch(txt)}
        refetch={onRefetch}
        placeholder='Search recipe list...'
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
