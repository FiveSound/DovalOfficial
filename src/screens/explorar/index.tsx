import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LoaderMain from './components/LoaderMain';
import { useAuth } from "../../context/AuthContext";
import useRangeNearbyLocation from "../../hooks/useRangeNearbyLocation";
import { Main } from "./components";

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { isDataReady } = useAuth();
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [locationReady, setLocationReady] = useState(false);

  const navigateToPermissionScreen = useCallback(() => {
    navigation.navigate("Locations");
  }, [navigation]);

  const { currentLocation, permissionGranted, permissionChecked } = useRangeNearbyLocation(navigateToPermissionScreen);

  useEffect(() => {
    const setupLocation = () => {
      if (!isDataReady) {
        if (permissionChecked) {
          if (currentLocation !== null && permissionGranted) {
            setLocationReady(true);
          }
          setIsLocationLoaded(true);
        }
      }
    };

    setupLocation();
  }, [currentLocation, permissionGranted, permissionChecked, isDataReady]);

  if (!isLocationLoaded || !locationReady) {
    return <LoaderMain />;
  }

  return <Main currentLocation={currentLocation} />;
};

export default Home;