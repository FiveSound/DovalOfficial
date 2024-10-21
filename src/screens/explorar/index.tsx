import { useCallback, useEffect, useState } from "react";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import LoaderMain from './components/LoaderMain';
import useRangeNearbyLocation from "../../hooks/useRangeNearbyLocation";
import { Main } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setLocationData } from "../../redux/slides/locationSlice";
import { MasonryFlashList } from "@shopify/flash-list";
import { Text } from "react-native";
import { FlexContainer } from "../../components/custom";
import { SafeAreaView } from "../../components/native";
import { responsiveFontSize, SIZES } from "../../constants/theme";
const Home = () => {
  //   const navigation = useNavigation<NavigationProp<any>>();
  //   const { isLoadingApp } = useSelector((state: RootState) => state.auth);
  //   const [isLocationLoaded, setIsLocationLoaded] = useState(false);
  //   const [locationReady, setLocationReady] = useState(false);

  //   const navigateToPermissionScreen = useCallback(() => {
  //     navigation.navigate("Locations");
  //   }, [navigation]);


  //   const { currentLocation, permissionGranted, permissionChecked } = useRangeNearbyLocation(navigateToPermissionScreen);
  //   const dispatch = useDispatch()


  //   useEffect(() => {
  //     if (currentLocation) {
  //       dispatch(setLocationData(currentLocation));
  //     }
  //   }, [currentLocation, dispatch]);

  //   console.log('currentLocation', currentLocation);

  //   useEffect(() => {
  //     const setupLocation = () => {
  //       if (isLoadingApp) {
  //         setIsLocationLoaded(true);
  //         setLocationReady(currentLocation !== null && permissionGranted);
  //       } else {
  //         if (permissionChecked) {
  //           if (currentLocation !== null && permissionGranted) {
  //             setLocationReady(true);
  //           }
  //           setIsLocationLoaded(true);
  //         }
  //       }
  //     };

  //     setupLocation();
  //   }, [currentLocation, permissionGranted, permissionChecked, isLoadingApp]);

  //   if (isLoadingApp) {
  //     return <LoaderMain />;
  //   }

  //   return <Main currentLocation={currentLocation} />;
  const generateRandomHeight = (min: number = responsiveFontSize(180), max: number = responsiveFontSize(300)) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  const INITIAL_DATA = [
    { title: 'Item 1' },
    { title: 'Item 2' },
    { title: 'Item 3' },
    { title: 'Item 4' },
    { title: 'Item 5' },
    { title: 'Item 6' },
    { title: 'Item 7' },
    { title: 'Item 8' },
    { title: 'Item 9' },
    { title: 'Item 10' },
    { title: 'Item 11' },
    { title: 'Item 12' },
  ];
  const [data, setData] = useState<{ title: string; height: number }[]>([]);
  useEffect(() => {
    const dataWithHeights = INITIAL_DATA.map(item => ({
      ...item,
      height: generateRandomHeight(),
    }));
    setData(dataWithHeights);
  }, []);

  
  const overrideItemLayout = (item, index) => ({
    length: item.height,
    offset: index * (item.height + 20),
    index,
  });
  
  const getColumnFlex = useCallback((items, index, maxColumns, extraData) => {
    return index === 1 ? 1 : 1; // Crea una relación de ancho de columna 1:2
  }, []);

  return (
   <SafeAreaView style={{ flex: 1 }}>
      <MasonryFlashList
        data={data}
        numColumns={2}
        optimizeItemArrangement={true}
        overrideItemLayout={overrideItemLayout}
        getColumnFlex={getColumnFlex}
        renderItem={({ item, columnIndex }) => (
          <FlexContainer style={{ padding: 8, borderRadius: SIZES.radius }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                backgroundColor: 'red',
                padding: 10,
                borderRadius: 10,
                height: item.height, // Altura dinámica para el efecto masonry
              }}
            >
              {item.title}
            </Text>
          </FlexContainer>
        )}
        estimatedItemSize={200}
      />
    </SafeAreaView>
  );
};

export default Home;