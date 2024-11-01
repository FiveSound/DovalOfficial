import { useCallback, useState } from 'react';
import { useNavigation } from '../../../components/native';
import Main from '../../MyProfile/Components/Tabs/MyMenu/Main';
import { getRecipesByBusinessIDService } from '../../../services/business';
import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';

type Props = {
  businessID: string;
};

const MyMenu = (props: Props) => {
  const { location } = useAppSelector((state: RootState) => state.location);
  const businessID = props.businessID;
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
      isError={isError}
      refetch={refetch}
    />
  );
};

export default MyMenu;
