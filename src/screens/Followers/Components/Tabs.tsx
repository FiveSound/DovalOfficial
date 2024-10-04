import { ReactNode, useState } from "react";
import { useWindowDimensions } from "react-native";
import { useTheme } from "../../../hooks";
import { TabBar, TabBarProps, TabView } from "react-native-tab-view";
import { COLORS, FONTS, responsiveFontSize } from "../../../constants/theme";
import { SafeAreaView } from "../../../components/native";
import { NavCustom } from "../../../components/custom";

type Props = {
  username: string;
  initialIndex: number;
  Followers: ReactNode;
  Following: ReactNode;
};

const Tabs = ({ Followers, Following, username, initialIndex }: Props) => {
  const [index, setIndex] = useState(initialIndex);
  const [routes] = useState([
    { key: "followers", title: "Followers" },
    { key: "following", title: "Following" },
  ]);

  const { BackgroundMain, Description, borderInput } = useTheme();
  const layout = useWindowDimensions();

  const renderScene = ({ route }: { route: { key: string } }) => {
    switch (route.key) {
      case "followers":
        return Followers;
      case "following":
        return Following;
      default:
        return null;
    }
  };

  const renderTabBar = (props: TabBarProps<any>) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: COLORS.primary }}
      style={{
        backgroundColor: BackgroundMain,
        borderBottomWidth: responsiveFontSize(1),
        borderColor: borderInput,
      }}
      labelStyle={{
        color: COLORS.primary,
        textTransform: "capitalize",
        ...FONTS.h4,
      }}
      inactiveColor={Description}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavCustom
        ShowUser={true}
        ScreenTitle={username}
        verify={false}
      />
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={renderTabBar}
        style={{
          flex: 1,
        }}
      />
    </SafeAreaView>
  );
};

export default Tabs;