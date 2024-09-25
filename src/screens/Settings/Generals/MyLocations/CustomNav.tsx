import { Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { scale } from "react-native-size-matters";
import { Text, View } from "../../constants/ThemeDark";
import { icons } from "../../constants";
import { LineDivider } from "../../components";
import i18next from "../../Translate";

interface PropsNavigation {
  navigate(path: string, options: object): any;
  goBack(): Function;
}

const CustomNav = () => {
  const navigation = useNavigation<PropsNavigation>();
  return (
    <>
      <View
        style={{
          marginTop: scale(30),
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image style={{ width: scale(25), height: scale(25) }} source={icons.ArrowBack} />
        </TouchableOpacity>
        <Text
          style={{
            marginHorizontal: 20,
            fontSize: 20,
            fontWeight: "bold",
            lineHeight: scale(18),
          }}
        >
         {i18next.t('Add or choose an address')}
        </Text>
      </View>
      <View
        style={{
          padding: scale(10),
        }}
      >
        <LineDivider lineStyle={{ marginTop: scale(10), marginBottom: scale(10) }} />
      </View>
    </>
  );
};

export default CustomNav;

