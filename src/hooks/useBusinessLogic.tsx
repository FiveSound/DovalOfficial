import { useState, useEffect, useMemo, useCallback } from 'react';
import { getNearbyBusinessService } from '../services/business';
import useRangeNearbyLocation from './useRangeNearbyLocation';
import useAPI from './useAPI';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

interface UseBusinessLogicParams {
  Search: string;
  filterStores: boolean;
  freeShipping: boolean;
  navigateToPermissionScreen: () => void;
}

export function useBusinessLogic({
  Search,
  filterStores,
  freeShipping,
  navigateToPermissionScreen,
}: UseBusinessLogicParams) {
  const { currentLocation } = useRangeNearbyLocation(
    navigateToPermissionScreen,
  );
  const { location } = useSelector((state: RootState) => state.location);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchPostData,
  } = useAPI({
    queryKey: ['get-Nearby-Business-Service-nearbys', location],
    queryFn: () => getNearbyBusinessService(location),
  });

  // Función de filtrado memoizada para mejorar el rendimiento
  const filterData = useCallback(
    (
      data: any[],
      search: string,
      filterStores: boolean,
      freeShipping: boolean,
    ) => {
      if (!Array.isArray(data)) {
        console.error('Datos inválidos recibidos:', data);
        return [];
      }
      return data.filter(item => {
        const matchesSearch = item.business_name
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesStores = !filterStores || item.open === true;
        const matchesFreeShipping = !freeShipping || item.amountSend === 'Free';
        return matchesSearch && matchesStores && matchesFreeShipping;
      });
    },
    [],
  );

  // Memorizando los datos filtrados para evitar recalculaciones innecesarias
  const filteredData = useMemo(() => {
    if (data) {
      return filterData(data, Search, filterStores, freeShipping);
    }
    return [];
  }, [data, Search, filterStores, freeShipping, filterData]);

  // Manejo de efectos secundarios cuando los datos, la ubicación o los filtros cambian
  useEffect(() => {
    if (!isLoading && !isError) {
      // Puedes agregar más lógica aquí si es necesario
    }

    if (isError) {
      console.error('Error al obtener los negocios cercanos:', error);
    }
  }, [isLoading, isError, error]);

  return {
    filteredData,
    isLoading,
    isError,
    error,
    refetchPostData,
  };
}
