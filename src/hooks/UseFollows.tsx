import { useState, useEffect, useCallback, useMemo, useReducer } from 'react';
import { TypeProducts } from '../types/products/Product.types';
import { getFollowedService } from '../services/follows';

interface useFollowsLogic {
    Search: string;
    user: string | undefined
}

interface State {
    filteredData: TypeProducts[];
    data: TypeProducts[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    page: number;
    Loader: boolean;
}

type Action =
    | { type: 'FETCH_INIT' }
    | { type: 'FETCH_SUCCESS'; payload: TypeProducts[] }
    | { type: 'FETCH_FAILURE'; error: Error }
    | { type: 'SET_PAGE'; page: number }
    | { type: 'SET_FILTERED_DATA'; filteredData: TypeProducts[] }
    | { type: 'SET_LOADER'; loader: boolean };

const initialState: State = {
    filteredData: [],
    data: [],
    isLoading: true,
    isError: false,
    error: null,
    page: 1,
    Loader: true,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'FETCH_INIT':
            return { ...state, isLoading: true, isError: false, error: null };
        case 'FETCH_SUCCESS':
            return { ...state, isLoading: false, data: action.payload };
        case 'FETCH_FAILURE':
            return { ...state, isLoading: false, isError: true, error: action.error };
        case 'SET_PAGE':
            return { ...state, page: action.page };
        case 'SET_FILTERED_DATA':
            return { ...state, filteredData: action.filteredData };
        case 'SET_LOADER':
            return { ...state, Loader: action.loader };
        default:
            throw new Error();
    }
}

export function UseFollows({
    Search,
    user
}: useFollowsLogic) {
    const [state, dispatch] = useReducer(reducer, initialState);

    const fetchData = useCallback(async () => {
        dispatch({ type: 'FETCH_INIT' });
        try {
            const result = await getFollowedService(user, state.page);
            console.log('Fetched Data:', result);
            dispatch({ type: 'FETCH_SUCCESS', payload: result });
        } catch (err) {
            console.error('Error fetching data:', err);
            dispatch({ type: 'FETCH_FAILURE', error: err as Error });
        }
    }, [user, state.page]);

    useEffect(() => {
        console.log('Fetching data for page:', state.page);
        console.log('====================================');
        console.log('userID', user);
        console.log('====================================');
        fetchData();
    }, [fetchData, user, state.page]);

    const filterData = useCallback((data: TypeProducts[], search: string) => {
        return data.filter((item: TypeProducts) => 
            item.username.toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [Search]);

    useEffect(() => {
        if (Array.isArray(state.data)) {
            const filtered = filterData(state.data, Search);
            dispatch({ type: 'SET_FILTERED_DATA', filteredData: state.page === 1 ? filtered : [...state.filteredData, ...filtered] });
            setTimeout(() => {
                dispatch({ type: 'SET_LOADER', loader: false });
            }, 300); 
        }
    }, [state.data, Search, filterData, state.page]);

    const nextPage = useCallback(() => {
        dispatch({ type: 'SET_PAGE', page: state.page + 1 });
    }, [state.page]);

    const prevPage = useCallback(() => {
        dispatch({ type: 'SET_PAGE', page: Math.max(state.page - 1, 1) });
    }, [state.page]);

    const refetch = useCallback(() => {
        dispatch({ type: 'SET_PAGE', page: 1 });
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
        setPage: (page: number) => dispatch({ type: 'SET_PAGE', page }),
        refetch
    };
}