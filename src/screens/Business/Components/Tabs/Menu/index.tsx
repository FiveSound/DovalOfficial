import React, { useCallback } from 'react';
import { useAPI, useRangeNearbyLocation } from '../../../../../hooks';
import { getRecipesByBusinessIDService } from '../../../../../services/business';
import Main from '../../../../MyProfile/Components/Tabs/MyMenu/Main';
import { useNavigation } from '../../../../../components/native';

type Props = {
  businessID: string;
};

const GetMenuBusiness = (props: Props) => {
  const navigation = useNavigation();
  const navigateToPermissionScreen = useCallback(() => {
    navigation.navigate('LocationPermissionScreen');
  }, []);
  const { currentLocation } = useRangeNearbyLocation(
    navigateToPermissionScreen,
  );
  const businessID = props.businessID;
  const { data, isLoading, isError, error, refetch } = useAPI({
    queryKey: [
      'get-Recipes-By-Business-ID-Service',
      businessID,
      currentLocation,
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
