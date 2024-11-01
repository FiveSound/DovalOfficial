import { useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StyleSheet, ActivityIndicator, View, FlatList } from 'react-native';
import ResumeOrder from '../components/ResumeOrder';
import { getAllOrdersService } from '../../../services/business';
import {
  PaginationHeader,
  Pagination,
  LoadingScreen,
  Container,
  IsLoading,
  ScreenEmpty,
} from '../../../components/custom';
import { Ilustrations } from '../../../constants';
import { SIZES } from '../../../constants/theme';

const QUERY_KEY = 'all-orders-dashboard-screen';
const DEFAULT_PAGE = 1;
const DEFAULT_SEARCH = '';

const initialData = {
  page: DEFAULT_PAGE,
  search: DEFAULT_SEARCH,
  pageSize: null,
  totalPages: null,
  pagination: [],
};

const Orders = () => {
  // States
  const [search, setSearch] = useState(DEFAULT_SEARCH);

  // Data
  const orders = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () =>
      await getAllOrdersService({
        queryKey: [QUERY_KEY, DEFAULT_PAGE, DEFAULT_SEARCH],
      }),
    initialData,
  });

  // Mutate
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async (params: { page: number; search: string }) => {
      return await getAllOrdersService({
        queryKey: [QUERY_KEY, params.page, params.search],
      });
    },
    onSuccess: response => queryClient.setQueryData([QUERY_KEY], response),
  });

  // Methods
  const onRefetch = () => {
    orders.refetch();
    setSearch('');
  };

  const onSearch = useCallback((txt: string) => {
    setSearch(txt);
    mutation.mutate({ page: DEFAULT_PAGE, search: txt });
  }, []);

  if (orders.isLoading || orders.isFetching) return <LoadingScreen label='Loading orders...' />;
  if (orders.data.list.length === 0) return (
    <Container style={styles.container}>
   <ScreenEmpty 
   labelPart1='No orders found' 
   labelPart2='Load your first order'
   source={Ilustrations.CharcoPet}
   ShowButton={true}
   labelButton='Load orders'
   onPress={onRefetch}
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
        placeholder='Search orders...'
      />

      {mutation.isPending && <IsLoading />}

      <FlatList
        data={orders.data.list}
        renderItem={({ item }) => <ResumeOrder {...item} />}
        keyExtractor={item => item.orderID.toString()}
        initialNumToRender={3}
      />

      <Pagination
        currentPage={orders.data.page}
        onChange={newPage =>
          mutation.mutate({ page: newPage, search: DEFAULT_SEARCH })
        }
        pagination={orders.data.pagination}
      />

    </Container>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0
  },
});
