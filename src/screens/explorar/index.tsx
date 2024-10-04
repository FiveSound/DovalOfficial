import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LoaderMain from './components/LoaderMain';
import useRangeNearbyLocation from "../../hooks/useRangeNearbyLocation";
import { Main } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLocationData } from "../../redux/slides/locationSlice";

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { isLoadingApp } = useSelector((state: RootState) => state.auth);
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [locationReady, setLocationReady] = useState(false);

  const navigateToPermissionScreen = useCallback(() => {
    navigation.navigate("Locations");
  }, [navigation]);
  

  const { currentLocation, permissionGranted, permissionChecked } = useRangeNearbyLocation(navigateToPermissionScreen);
  const dispatch = useDispatch()


  useEffect(() => {
    if (currentLocation) {
      dispatch(setLocationData(currentLocation));
    }
  }, [currentLocation, dispatch]);

  console.log('currentLocation', currentLocation);
  
  useEffect(() => {
    const setupLocation = () => {
      if (isLoadingApp) {
        setIsLocationLoaded(true);
        setLocationReady(currentLocation !== null && permissionGranted);
      } else {
        if (permissionChecked) {
          if (currentLocation !== null && permissionGranted) {
            setLocationReady(true);
          }
          setIsLocationLoaded(true);
        }
      }
    };

    setupLocation();
  }, [currentLocation, permissionGranted, permissionChecked, isLoadingApp]);

  if (isLoadingApp) {
    return <LoaderMain />;
  }

  return <Main currentLocation={currentLocation} />;
};

export default Home;