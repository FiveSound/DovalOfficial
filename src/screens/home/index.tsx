import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { useAuth } from "../../context/AuthContext";
import Signup from "../auth/Signup";
import {
  Layout,
  LiveOrders,
  Categories,
  Restaurants,
  Orders,
  Recipies,
  Promotions,
} from "./components";
import { View } from "../../components/native";
import { SIZES } from "../../constants/theme";
import i18next from "../../Translate";
import { LoadingScreen, TabsMain } from "../../components/custom";
import data from "./data";
import { useAppSelector } from "../../redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const {
    isLoadingApp,
    isAuthenticated,
  } = useAppSelector((state: RootState) => state.auth);
  const [ Loader, setLoader] = useState(true)
  const [Offert, setOffert] = useState(false)

  if (isLoadingApp) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !isLoadingApp) {
    return <Signup />;
  }

  useEffect(() => {
    if (data) {
       setLoader(false)
       setOffert(true)
    } else if (!data) {
      setOffert(false)
    }
  },[data])


  const routes = [
    { key: "first", title: i18next.t("Restaurants") },
    { key: "second", title: i18next.t("Orders") },
    { key: "third", title: i18next.t("Recipies") },
  ];

  const scenes = {
    first: Restaurants,
    second: Orders,
    third: Recipies,
  };

  return (
    <Layout
    Append={<LiveOrders />}
    >   
      {Offert &&
       <Promotions 
       data={data}
       IsLoading={Loader}/>}
      <Categories />
      <View style={styles.marginBottom} />
      <TabsMain routes={routes} scenes={scenes} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: SIZES.gapMedium,
  },
});

export default Home;
