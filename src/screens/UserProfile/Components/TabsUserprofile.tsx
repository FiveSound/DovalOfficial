import React, { useCallback, useState } from "react";
import { TabBar, TabView } from "react-native-tab-view";
import { StyleSheet } from "react-native";
import MyPosts from "./MyPosts";
import MyMenu from "./MyMenu";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "@/src/constants/theme";
import { useTheme } from "@/src/hooks";

type Props = {
  username: string;
  businessID: string;
} 
const TabsUserprofile = ({ username, businessID }: Props) => {
  const { borderInput , Title} = useTheme();
  const [routes] = useState([
    { key: "Posts", title: "Posts", index: 0 },
    { key: "Menu", title: "Menu", index: 1 },
  ]);
  const [index, setIndex] = useState(0);

  const renderScene = useCallback(({ route }: any) => {
    switch (route.key) {
      case "Posts":
        return <MyPosts username={username}/>;
      case "Menu":
        return <MyMenu businessID={businessID} />;
      default:
        return <MyPosts username={username}/>;
    }
  }, []);

  const renderTabBar = (props: any & {
    navigationState: any
  }) => {
    return <TabBar 
    {...props} 
    style={[styles.tabBar, { borderColor: borderInput,}]}
    indicatorStyle={styles.indicatorStyle}
    labelStyle={styles.labelStyle}
    activeColor={Title}
    scrollEnabled={false}
    />
  }
  return (
    <TabView
      navigationState={{ index, routes }}
      swipeEnabled={true}
      renderScene={renderScene}
      onIndexChange={setIndex}
      renderTabBar={renderTabBar}
      overScrollMode='never'
      lazy
      style={styles.tabView}
    />
  );
}

const styles = StyleSheet.create({
  tabView: {
    flex: 1,
    backgroundColor: "transparent",
  },
  tabBar: {
    backgroundColor: "transparent",
    zIndex: 1,
    borderBottomWidth: responsiveFontSize(1),
    width: SIZES.width,
  },
  indicatorStyle: {
    backgroundColor: COLORS.primary,
    width: SIZES.width / 2,
  },
  labelStyle: {
    ...FONTS.semi18,
    color: COLORS.primary,
  },
});

export default TabsUserprofile;