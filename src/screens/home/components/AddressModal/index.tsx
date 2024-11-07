import React from 'react';
import { getMyLocations } from '../../../../services/orders';
import Main from './Main';
import { useQuery } from '@tanstack/react-query';

type Props = {};

const QUERY_KEY = 'get-My-Locations';
const AddressModal = (props: Props) => {
  const {
    data,
    isLoading: Loading,
    isFetching,
    isRefetching,
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getMyLocations,
  });

  return (
    <Main
      data={data}
      Loading={Loading}
      isFetching={isFetching}
      isRefetching={isRefetching}
    />
  );
};

export default AddressModal;
