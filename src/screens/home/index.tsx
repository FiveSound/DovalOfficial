import React from "react";
import { StyleSheet } from "react-native";
import Signup from "../auth/Signup";
import {
  Layout,
  LiveOrders,
  Categories,
  Restaurants,
} from "./components";
import { View } from "../../components/native";
import { SIZES } from "../../constants/theme";
import { LoadingScreen } from "../../components/custom";
import { useAppSelector } from "../../redux";
import { RootState } from "../../redux/store";

const Home = () => {
  const {
    isLoadingApp,
    isAuthenticated,
  } = useAppSelector((state: RootState) => state.auth);

  if (isLoadingApp) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !isLoadingApp) {
    return <Signup />;
  }


  // const routes = [
  //   { key: "first", title: i18next.t("Restaurants") },
  //   { key: "second", title: i18next.t("Orders") },
  //   { key: "third", title: i18next.t("Recipies") },
  // ];

  // const scenes = {
  //   first: Restaurants,
  //   second: Orders,
  //   third: Recipies,
  // };

  return (
    <Layout
      Append={<LiveOrders />}
    >
        {/* <Promotions
          data={data}
          IsLoading={Loader} /> */}
      <View style={styles.marginBottom} />
      <Categories />
      <View style={styles.marginBottom} />
      <Restaurants />
      {/* <TabsMain routes={routes} scenes={scenes} /> */}
    </Layout>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: SIZES.gapMedium,
  },
});

export default Home;
