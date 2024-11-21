import React, { useContext, useEffect } from 'react';
import Main from './Main';
import { useQuery } from '@tanstack/react-query';
import { getNearbyBusinessService } from '../../../services/business';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux';
import { TabBarVisibilityContext } from '../../../context/TabBarVisibilityContext';

const QUERY_KEY = 'get-Nearby-Business-Services-Search';
const SearchBusiness = () => {
  const { location } = useAppSelector((state: RootState) => state.location);
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchPostData,
  } = useQuery({
    queryKey: [QUERY_KEY, location],
    queryFn: () => getNearbyBusinessService(location),
  });
  
  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);
  
  return (
    <Main
      data={data}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetchPostData={refetchPostData}
    />
  );
};

export default SearchBusiness;
