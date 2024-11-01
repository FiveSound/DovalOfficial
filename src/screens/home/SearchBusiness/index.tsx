import React, { useCallback, useState } from 'react';
import { useNavigation } from '../../../components/native';
import Main from './Main';
import { useBusinessLogic } from '../../../hooks/useBusinessLogic';

const SearchBusiness = () => {
  const navigation = useNavigation();
  const navigateToPermissionScreen = useCallback(() => {
    navigation.navigate('LocationPermissionScreen');
  }, [navigation]);

  const [Search, setSearch] = useState('');
  const [filterStores, setFilterStores] = useState(false);
  const [freeShipping, setFreeShipping] = useState(false);
  const { filteredData, isLoading, isError, error, refetchPostData } =
    useBusinessLogic({
      Search,
      filterStores,
      freeShipping,
      navigateToPermissionScreen,
    });

  return (
    <Main
      filteredData={filteredData}
      isLoading={isLoading}
      isError={isError}
      error={error}
      refetchPostData={refetchPostData}
      Search={Search}
      setSearch={setSearch}
      filterStores={filterStores}
      setFilterStores={setFilterStores}
      freeShipping={freeShipping}
      setFreeShipping={setFreeShipping}
      navigateToPermissionScreen={navigateToPermissionScreen}
    />
  );
};

export default SearchBusiness;
