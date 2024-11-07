import React, { useCallback } from 'react';
import { getRecipesByBusinessIDService } from '../../../../../services/business';
import Main from '../../../../MyProfile/Components/Tabs/MyMenu/Main';
import { useNavigation } from '../../../../../components/native';
import { useQuery } from '@tanstack/react-query';
import { RootState } from '../../../../../redux/store';
import { useAppSelector } from '../../../../../redux';

type Props = {
  businessID: string;
};

const GetMenuBusiness = (props: Props) => {

  const businessID = props.businessID;
  const { location } = useAppSelector((state: RootState) => state.location);
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [
      'get-Recipes-By-Business-ID-Service-useQuery',
      businessID,
      location,
    ],
    queryFn: getRecipesByBusinessIDService,
  });

  return (
    <Main
      data={data}
      isLoading={isLoading}
      refetch={refetch}
      isError={isError}
    />
  );
};

export default GetMenuBusiness;
