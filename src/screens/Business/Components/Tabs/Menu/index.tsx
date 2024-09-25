import React from 'react'
import Main from './Main';
import { useAPI } from '../../../../../hooks';
import { getRecipesByBusinessIDService } from '../../../../../services/business';

type Props = {
  businessID: string
}

const GetMenuBusiness = (props: Props) => {
const { businessID } = props;
    const { data, isLoading, refetch } = useAPI({
        queryKey: ["getRecipesByBusinessIDService", businessID],
        queryFn: () => getRecipesByBusinessIDService(businessID),
    });
 
  return (
    <Main 
    data={data}
    isLoading={isLoading}
    refetch={refetch}
    />
  )
}

export default GetMenuBusiness