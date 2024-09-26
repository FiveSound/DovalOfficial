import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LoaderMain from './components/LoaderMain';
import { useAuth } from "../../context/AuthContext";
import useRangeNearbyLocation from "../../hooks/useRangeNearbyLocation";
import { Main } from "./components";
import { useAPI } from "../../hooks";
import { endOnboardingService } from "../../services/personalized";
import { useDispatch } from "react-redux";
import { openOnboardingModal } from "../../redux/slides/modalSlice";

const Home = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const { user, isDataReady, isLoadingApp } = useAuth();
  const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { data: endOnboarding, isLoading: isLoadingEndOnboarding } = useAPI({
    queryKey: ["endOnboardingService"],
    queryFn: () => endOnboardingService(),
  });
  const dispatch = useDispatch();

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

  // useEffect(() => {
  //   if (!isDataReady && !isLoadingApp && user && endOnboarding?.success) {
  //     dispatch(openOnboardingModal());
  //   }
  // }, [endOnboarding, isDataReady, isLoadingApp, user]);

  if (!isLocationLoaded || !locationReady) {
    return <LoaderMain />;
  }

  return <Main currentLocation={currentLocation} />;
};

export default Home;