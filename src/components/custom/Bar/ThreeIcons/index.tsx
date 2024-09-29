import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "../../../native";
import { StyleSheet } from "react-native";
import { SIZES } from "../../../../constants/theme";
import Typography from "../../Typography";
import {
  ArrowLeft,
  Cancel01Icon,
  Delete03IconStroke,
  HelpCircleIcon,
  HelpSquareIcon,
  Share08Icon,
} from "../../../../constants/IconsPro";
import { ArrowBack } from "../../Arrows";
import Hint from "../../hint";
import Actions from "../../Actions";
import { useTheme } from "../../../../hooks";
import FlexContainer from "../../FlexContainer";

type Props = {
  label?: string;
  showBack?: boolean;
  onPress?: () => void;
  showShare?: boolean;
  onPressShare?: () => void;
  showRightIcons?: boolean;
};

const ThreeIcons = (props: Props) => {
  const { label, showBack = true, onPress, showShare, onPressShare, showRightIcons = true } = props;
  const [show, setShow] = useState(true);
  const {Title } = useTheme()

  const Close = ({onPress}: any) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Cancel01Icon 
        width={SIZES.icons}
        height={SIZES.icons}
        color={Title} />
      </TouchableOpacity>
    );
  };

  const Share = ({onPress}: any) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Share08Icon 
        width={SIZES.icons}
        height={SIZES.icons}
        color={Title} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {showBack && <ArrowBack />}
      {!showBack && <Close onPress={onPress}/>}
      <Typography variant="subtitle">{label}</Typography>
      {showRightIcons &&
       <FlexContainer variant='row' newStyle={styles.subicons}>
       {!showShare && <Share onPress={onPressShare}/>}
       <Actions onPress={() => console.log('Help')
       }>
         <HelpCircleIcon width={SIZES.icons} height={SIZES.icons} color={Title}/>
       </Actions>
       </FlexContainer>}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.BtnWidth,
    paddingHorizontal: SIZES.gapLarge,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: 'transparent'
  },
  subicons: {
    gap: SIZES.gapLarge,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default ThreeIcons;
