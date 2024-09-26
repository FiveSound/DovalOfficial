import { useCallback, useState } from "react";
import { useNavigation } from "../../../components/native";
import { useAPI, useRangeNearbyLocation } from "../../../hooks";
import Main from "../../MyProfile/Components/Tabs/MyMenu/Main";
import { getRecipesByBusinessIDService } from "../../../services/business";


type Props = {
  businessID: string;
};

const MyMenu = (props: Props) => {
  const navigation = useNavigation()
    const navigateToPermissionScreen = useCallback(() => {navigation.navigate("LocationPermissionScreen");}, []);
    const { currentLocation } = useRangeNearbyLocation(navigateToPermissionScreen);
    const businessID = props.businessID
  const { data, isLoading, isError, error, refetch } = useAPI({
    queryKey: ["get-Recipes-By-Business-ID-Service", businessID, currentLocation],
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