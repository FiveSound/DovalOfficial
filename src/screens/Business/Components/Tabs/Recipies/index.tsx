import React from 'react';
import Main from './Main';
import { getRecipesByBusinessIDService } from '../../../../../services/business';
import { useAPI } from '../../../../../hooks';

type Props = {
  businessID: string;
};

const GetRecipiesBusiness = (props: Props) => {
  const { businessID } = props;
  const { data, isLoading, refetch } = useAPI({
    queryKey: ['getRecipesByBusinessIDService', businessID],
    queryFn: () => getRecipesByBusinessIDService(businessID),
  });

  return <Main data={data} isLoading={isLoading} refetch={refetch} />;
};

export default GetRecipiesBusiness;
