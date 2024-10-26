import { StyleSheet, ActivityIndicator, Text, View, FlatList } from "react-native";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getPaymentsHistoryService } from "../../../services/business";
import Transaction from "../components/Transaction";
import { PaginationHeader, Pagination } from "../../../components/custom";

const QUERY_KEY = "payments-history-screen";
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
    queryFn: async () => await getPaymentsHistoryService({ queryKey: [QUERY_KEY, DEFAULT_PAGE] }),
    initialData,
  });

  // Mutation
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async ({ page }: { page: number }) => await getPaymentsHistoryService({ queryKey: [QUERY_KEY, page] }),
    onSuccess: (response) => queryClient.setQueryData([QUERY_KEY], response),
  });

  // Methods
  const onRefetch = () => {
    transactions.refetch();
  };

  if (transactions.isLoading || transactions.isFetching) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <PaginationHeader refetch={onRefetch} />

      <FlatList
        data={transactions.data.list}
        renderItem={({ item }) => <Transaction {...item} />}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={3}
      />

      <Pagination
        currentPage={transactions.data.page}
        onChange={(newPage) => mutation.mutate({ page: newPage })}
        pagination={transactions.data.pagination}
      />
    </View>
  );
};

export default PaymentHistory;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#000",
  },
});