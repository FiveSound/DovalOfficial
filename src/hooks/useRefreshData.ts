import { useState, useCallback } from 'react';

type RefetchFunction = () => Promise<unknown>;

export const useRefreshData = (refetchFunctions: RefetchFunction[]) => {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setIsRefreshing(true);
    Promise.all(refetchFunctions.map(func => func()))
      .then(() => {
        setIsRefreshing(false);
      })
      .catch(() => {
        setIsRefreshing(false);
      });
  }, [refetchFunctions]);

  return { isRefreshing, onRefresh };
};
