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
} from '../../../components/custom';

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

  if (orders.isLoading || orders.isFetching) return <LoadingScreen />;

  return (
    <Container style={styles.container}>
      <PaginationHeader
        text={search}
        onChangeText={txt => onSearch(txt)}
        refetch={onRefetch}
      />

      {mutation.isPending && <ActivityIndicator size={20} />}

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

      {/* <Text style={{ color: "#FFF" }}>{JSON.stringify(orders.data, null, 2)}</Text> */}
    </Container>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {},
});
