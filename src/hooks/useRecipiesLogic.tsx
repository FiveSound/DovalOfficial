import { useState, useEffect, useMemo, useCallback } from 'react';
import { getNearbyRecipesService } from '../services/business';
import useRangeNearbyLocation from './useRangeNearbyLocation';
import useAPI from './useAPI';
import { TypeProducts } from '../types/products/Product.types';

interface useRecipiesLogic {
  Search: string;
  navigateToPermissionScreen: () => void;
}

export function useRecipiesLogic({
  Search,
  navigateToPermissionScreen,
}: useRecipiesLogic) {
  const { currentLocation } = useRangeNearbyLocation(
    navigateToPermissionScreen,
  );
  const [localCurrentLocation, setLocalCurrentLocation] =
    useState(currentLocation);
  const [filteredData, setFilteredData] = useState<TypeProducts[]>([]);
  const [Loader, setLoader] = useState(true);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchPostData,
  } = useAPI({
    queryKey: ['get-Nearby-Recipes-Service', localCurrentLocation],
    queryFn: () => getNearbyRecipesService(localCurrentLocation),
  });

  useEffect(() => {
    setLocalCurrentLocation(currentLocation);
    if (Array.isArray(data)) {
      const filtered = filterData(data, Search);
      setFilteredData(filtered);
      setTimeout(() => {
        setLoader(false);
      }, 300);
    }
  }, [currentLocation, data, Search]);

  const filterData = useCallback(
    (data: TypeProducts[], search: string) => {
      return data.filter((item: TypeProducts) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    },
    [Search],
  );

  return { filteredData, isLoading, isError, error, refetchPostData, Loader };
}
