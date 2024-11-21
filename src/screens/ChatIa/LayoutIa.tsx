import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ChatInput from "./ChatInput";
import { COLORS, SIZES, responsiveFontSize } from "../../constants/theme";
import { scale } from "react-native-size-matters";
import { Delete03IconStroke, PencilEdit02Icon } from "../../constants/IconsPro";
import useTheme from "../../hooks/useTheme";
import { LinearGradient } from 'expo-linear-gradient';
import i18next from "../../Translate";
import { SafeAreaView } from "../../components/native";
import { Avatars, FlexContainer, LineDivider, Typography } from "../../components/custom";

type Props = {
  children: React.ReactNode;
  userInput: string;
  isLoading: boolean;
  handleUserInput: (text: string) => void;
  handleSubmit: () => void;
  labelHeader: string;
  ClearChat: () => void
  ShowAvatar: Boolean;
  source: string;
};

interface HeaderProps {
  labelHeader: string;
  ClearChat: () => void
  ShowAvatar: Boolean;
  source: string;
}
const HeaderIa = ({ labelHeader, ClearChat, ShowAvatar , source}: HeaderProps) => {
  const { color } = useTheme()
  const getGreeting = () => {
    const Hour = new Date().getHours();
    if(Hour < 12) {
      return i18next.t('Good morning,')
    } else if (Hour < 18) {
      return i18next.t('Good afternoon,')
    } else {
      return i18next.t('Good night,')
    }
  }


  return (
  <>
    <SafeAreaView
      style={styles.containerHeader}
    >
      <FlexContainer 
      newStyle={{
        backgroundColor: 'transparent'
      }}>
      <Typography variant='title' 
      newStyle={{
        color: COLORS.primary
      }}>
        {getGreeting()}
      </Typography>
      <Typography variant="subtitle" newStyle={{}}>
        {labelHeader}
      </Typography>
      </FlexContainer>

     {!ShowAvatar && 
      <TouchableOpacity
      onPress={ClearChat}>
        <Delete03IconStroke 
        width={SIZES.icons / 1.2}
        height={SIZES.icons / 1.2}
        color={color}
        />
      </TouchableOpacity>}

      {ShowAvatar && 
      <Avatars 
      source={source}
      size='medium'
      />}
    </SafeAreaView>
    <LineDivider variant='secondary' />
  </>
  );
};

const LayoutIa = ({
  children,
  userInput,
  isLoading,
  handleSubmit,
  handleUserInput,
  labelHeader,
  ClearChat,
  ShowAvatar,
  source
}: Props) => {

  const {Bg , bgInput} = useTheme()
  return (
    <LinearGradient
    colors={[bgInput, Bg, bgInput ]}
    style={{
      flex: 1
    }}
    >
      <HeaderIa 
      labelHeader={labelHeader} 
      ClearChat={ClearChat} 
      ShowAvatar={ShowAvatar}
      source={source}
      />
      <KeyboardAwareScrollView
        contentContainerStyle={{
          flex: 1,
        }}
        horizontal={false}
        scrollEnabled={false} 
        enableAutomaticScroll={true}
        viewIsInsideTabBar={false}
        extraScrollHeight={responsiveFontSize(100)}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {children}
        <ChatInput
          userInput={userInput}
          isLoading={isLoading}
          handleUserInput={handleUserInput}
          handleSubmit={handleSubmit}
        />
      </KeyboardAwareScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    alignItems: "center",
    height: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: SIZES.margin,
    backgroundColor: 'transparent'
  }
});
export default LayoutIa;
