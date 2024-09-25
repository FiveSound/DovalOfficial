import { NavigationProp, useNavigation } from "@react-navigation/native";

const handleNavigate = (navigation: NavigationProp<any>) => {
  return navigation;
};

export default function useCustomNavigation() {
  const navigation = useNavigation();

  return {
    navigation: handleNavigate(navigation),
  };
}
