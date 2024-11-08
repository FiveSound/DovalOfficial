import React, { useContext, useEffect } from "react";
import { RouteProp } from '@react-navigation/native';
import { SharedElementStackParamList } from "../../navigation/MainStackt";
import  Main from "./components/Main";
import { TabBarVisibilityContext } from "../../context/TabBarVisibilityContext";

type DetailsScreenRouteProp = RouteProp<SharedElementStackParamList, 'FeedDetails'>;

interface FeedDetailsProps {
  route: DetailsScreenRouteProp
}

const FeedDetails: FeedDetailsProps = ({ route }) => {
  const { item , mediaType } = route.params;
  console.log('mediaType en feedDetails', mediaType);
  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);


  return ( <Main item={item}  /> );
};


export default FeedDetails;