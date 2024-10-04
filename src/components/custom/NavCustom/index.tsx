import React from "react";
import { ImageStyle, ViewStyle } from "react-native";
import { SafeAreaView, TouchableOpacity, useNavigation } from "../../native";
import { FONTS, SIZES } from "../../../constants/theme";
import { ArrowLeft, VerifyIcons } from "../../../constants/IconsPro";
import Typography from "../Typography";
import FlexContainer from "../FlexContainer";
import { useTheme } from "../../../hooks";
import { ArrowBack } from "../Arrows";

type props = {
  ScreenTitle: string;
  TitleStyle?: any;
  icon?: any;
  iconStyle?: ImageStyle;
  onPress?: () => void;
  labelDescription?: string
  Container?: ViewStyle;
  ShowUser?: boolean;
  verify?: boolean
};

const NavCustom = ({
  ScreenTitle,
  TitleStyle,
  icon,
  iconStyle,
  onPress,
  labelDescription,
  Container,
  ShowUser = false,
  verify
}: props) => {
  const { color, borderInput } = useTheme();
  const navigation = useNavigation()
  return (
    <SafeAreaView
      style={{
        width: SIZES.width,
        ...Container
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.goBack()
        }}
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: SIZES.radius2,
        }}
      >
        {!ShowUser && <>
          <ArrowBack/>
          <Typography
            variant='H4title'
            newStyle={{
              ...FONTS.semi18,
            }}
          >
            {ScreenTitle}
          </Typography></>
        }
        {ShowUser &&
          <FlexContainer variant="row" newStyle={{ alignItems: "center", backgroundColor: 'transparent', justifyContent: 'center'  }}>
            <ArrowLeft
              width={SIZES.icons}
              height={SIZES.icons}
              color={color} />
           <FlexContainer variant="row" newStyle={{ alignItems: "center", backgroundColor: 'transparent', width: SIZES.width / 1.2, justifyContent: 'center' }}>
             <Typography
              variant="subtitle"
              numberOfLines={1}
              newStyle={{ maxWidth: SIZES.BtnWidth / 1.2 }}
            >
              @{ScreenTitle}
            </Typography>
            {verify && (
              <VerifyIcons width={SIZES.icons / 1.8} height={SIZES.icons / 1.8} />
            )}</FlexContainer>
          </FlexContainer>}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NavCustom;