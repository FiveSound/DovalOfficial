import {
  StyleSheet,
  ActivityIndicator,
  Text,
  View,
  FlatList,
} from 'react-native';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { getPaymentsHistoryService } from '../../../services/business';
import Transaction from '../components/Transaction';
import { PaginationHeader, Pagination, LoadingScreen, ScreenEmpty, Container, IsLoading } from '../../../components/custom';
import { Ilustrations } from '../../../constants';
import { SIZES } from '../../../constants/theme';
import { FlashList } from '../../../components/native';

const QUERY_KEY = 'payments-history-screen';
const DEFAULT_PAGE = 1;

const initialData = {
  page: DEFAULT_PAGE,
  pageSize: null,
  totalPages: null,
  pagination: [],
};

const PaymentHistory = () => {
  const transactions = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () =>
      await getPaymentsHistoryService({ queryKey: [QUERY_KEY, DEFAULT_PAGE] }),
    initialData,
  });

  // Mutation
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async ({ page }: { page: number }) =>
      await getPaymentsHistoryService({ queryKey: [QUERY_KEY, page] }),
    onSuccess: response => queryClient.setQueryData([QUERY_KEY], response),
  });

  // Methods
  const onRefetch = () => {
    transactions.refetch();
  };

  if (transactions.isLoading || transactions.isFetching)
    return <LoadingScreen label='Loading payments...' />;
  if (transactions.data.list.length === 0) return (
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
    <View style={styles.container}>
      <PaginationHeader 
      refetch={onRefetch}
      placeholder='Search payments...'
       />

      <FlashList
        data={transactions.data.list}
        renderItem={({ item }) => <Transaction {...item} />}
        keyExtractor={item => item.id.toString()}
        estimatedItemSize={100}
        onRefresh={onRefetch}
        refreshing={transactions.isFetching}
        ListFooterComponent={transactions.isFetching ? <IsLoading /> : null}
      />

      <Pagination
        currentPage={transactions.data.page}
        onChange={newPage => mutation.mutate({ page: newPage })}
        pagination={transactions.data.pagination}
      />
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 0,
  },
});
