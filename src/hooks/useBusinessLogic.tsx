import { useState, useEffect, useMemo } from 'react';
import { getNearbyBusinessService } from '../services/business';
import useRangeNearbyLocation from './useRangeNearbyLocation';
import useAPI from './useAPI';

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
    navigateToPermissionScreen
}: UseBusinessLogicParams) {
    const { currentLocation } = useRangeNearbyLocation(navigateToPermissionScreen);
    const [localCurrentLocation, setLocalCurrentLocation] = useState(currentLocation);
    const [filteredData, setFilteredData] = useState([]);
    const [Loader, setLoader] = useState(true);

    const {
        data,
        isLoading,
        isError,
        error,
        refetch: refetchPostData,
    } = useAPI({
        queryKey: ["get-Nearby-Business-Service-nearby", localCurrentLocation],
        queryFn: () => getNearbyBusinessService(localCurrentLocation),
    });

    useEffect(() => {
        setLocalCurrentLocation(currentLocation);
        if (Array.isArray(data)) {
            const filtered = filterData(data, Search, filterStores, freeShipping);
            setFilteredData(filtered);
            setTimeout(() => {
                setLoader(false);
            }, 300); 
        }
    }, [currentLocation, data, Search, filterStores, freeShipping]);

    const filterData = useMemo(() => (data, search: string, filterStores: boolean, freeShipping: boolean) => {
        return data.filter((item) => {
            const matchesSearch = item.business_name.toLowerCase().includes(search.toLowerCase());
            const matchesStores = !filterStores || item.store === true;
            const matchesFreeShipping = !freeShipping || item.amountSend === "Free";
            return matchesSearch && matchesStores && matchesFreeShipping;
        });
    }, [Search, filterStores, freeShipping]);

    return { filteredData, isLoading, isError, error, refetchPostData, Loader };
}