import { useReducer, useEffect, useCallback, useMemo } from 'react';
import { TypeProducts } from '../types/products/Product.types';
import { getFollowingAccountsService } from '../services/follows';

interface useFollowsLogic {
  Search: string;
  userID: string;
  username: string;
}

interface State {
  filteredData: TypeProducts[];
  Loader: boolean;
  page: number;
  data: TypeProducts[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

type Action =
  | { type: 'SET_FILTERED_DATA'; payload: TypeProducts[] }
  | { type: 'SET_LOADER'; payload: boolean }
  | { type: 'SET_PAGE'; payload: number }
  | { type: 'SET_DATA'; payload: TypeProducts[] }
  | { type: 'SET_IS_LOADING'; payload: boolean }
  | { type: 'SET_IS_ERROR'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error | null };

const initialState: State = {
  filteredData: [],
  Loader: true,
  page: 1,
  data: [],
  isLoading: true,
  isError: false,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FILTERED_DATA':
      return { ...state, filteredData: action.payload };
    case 'SET_LOADER':
      return { ...state, Loader: action.payload };
    case 'SET_PAGE':
      return { ...state, page: action.payload };
    case 'SET_DATA':
      return { ...state, data: action.payload };
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_IS_ERROR':
      return { ...state, isError: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
}

export function UseFollowing({ Search, userID, username }: useFollowsLogic) {
  const [state, dispatch] = useReducer(reducer, initialState);

  console.log('====================================');
  console.log();
  console.log('====================================');
  const fetchData = useCallback(async () => {
    console.log('fetchData called with:', {
      userID,
      username,
      page: state.page,
    });
    dispatch({ type: 'SET_IS_LOADING', payload: true });
    dispatch({ type: 'SET_IS_ERROR', payload: false });
    dispatch({ type: 'SET_ERROR', payload: null });

    try {
      console.log('Calling getFollowingAccountsService');
      const result = await getFollowingAccountsService(
        userID,
        username,
        state.page,
      );
      console.log('API response:', result);
      if (result) {
        dispatch({ type: 'SET_DATA', payload: result });
      } else {
        throw new Error('No data returned from getFollowingAccountsService');
      }
    } catch (err) {
      console.error('Error fetching data:', err);
      dispatch({ type: 'SET_IS_ERROR', payload: true });
      dispatch({ type: 'SET_ERROR', payload: err as Error });
    } finally {
      dispatch({ type: 'SET_IS_LOADING', payload: false });
    }
  }, [userID, username, state.page]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filterData = useCallback(
    (data: TypeProducts[], search: string) => {
      return data.filter(
        (item: TypeProducts) =>
          item.username.toLowerCase().includes(search.toLowerCase()) ||
          item.name.toLowerCase().includes(search.toLowerCase()),
      );
    },
    [Search],
  );

  useEffect(() => {
    if (Array.isArray(state.data)) {
      const filtered = filterData(state.data, Search);
      dispatch({
        type: 'SET_FILTERED_DATA',
        payload:
          state.page === 1 ? filtered : [...state.filteredData, ...filtered],
      });
      setTimeout(() => {
        dispatch({ type: 'SET_LOADER', payload: false });
      }, 300);
    }
  }, [state.data, Search, filterData, state.page]);

  const nextPage = useCallback(() => {
    dispatch({ type: 'SET_PAGE', payload: state.page + 1 });
  }, [state.page]);

  const prevPage = useCallback(() => {
    dispatch({ type: 'SET_PAGE', payload: Math.max(state.page - 1, 1) });
  }, [state.page]);

  const refetch = useCallback(() => {
    dispatch({ type: 'SET_PAGE', payload: 1 });
    return fetchData();
  }, [fetchData]);

  const memoizedFilteredData = useMemo(() => {
    return state.filteredData;
  }, [state.filteredData]);

  return {
    filteredData: memoizedFilteredData,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
    Loader: state.Loader,
    nextPage,
    prevPage,
    page: state.page,
    setPage: (page: number) => dispatch({ type: 'SET_PAGE', payload: page }),
    refetch,
  };
}
