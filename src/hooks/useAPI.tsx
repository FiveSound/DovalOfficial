import { useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

interface QueryKeyFN {
  queryKey: Array<string>;
}

type Props = {
  queryKey: Array<string>;
  queryFn: (queryKey: QueryKeyFN) => Promise<any>;
  enabled?: boolean;
};

const useAPI = (props: Props) => {
  const { queryKey, queryFn, enabled = true } = props;
  const queryResult = useQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    enabled: enabled,
  });

  useFocusEffect(
    useCallback(() => {
      if (
        enabled &&
        !queryResult.isFetching &&
        Date.now() - queryResult.dataUpdatedAt > 1000 * 60 * 5
      ) {
        queryResult.refetch();
      }
    }, [queryResult]),
  );

  const { isLoading, isError, error, data, refetch, isFetching, isRefetching } =
    queryResult;

  return {
    isLoading,
    isError,
    error,
    data,
    refetch: refetch,
    isFetching,
    isRefetching,
  };
};

export default useAPI;
