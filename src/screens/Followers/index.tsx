import { SafeAreaView } from "react-native";
import useTheme from "../../hooks/useTheme";
import { TabFollowers, TabFollowing, Tabs } from "./Components";

type Props = {
  route: any;
};

const Followers = (props: Props) => {
  const { initialIndex, username } = props.route.params;
  const { BackgroundMain } = useTheme();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BackgroundMain }}>
      <Tabs
        username={username}
        initialIndex={initialIndex}
        Followers={<TabFollowers username={username} />}
        Following={<TabFollowing username={username} />}
      />
    </SafeAreaView>
  );
};

export default Followers;