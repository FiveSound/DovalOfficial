import React, { ReactNode, useState } from "react";
import { Image, TouchableOpacity, View, ViewStyle } from "react-native";
import useTheme from "../../hooks/useTheme";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView, useNavigation } from "../../components/native";
import { FlexContainer, LineDivider, Search } from "../../components/custom";
import { COLORS, SIZES } from "../../constants/theme";
import { iconsNative } from "../../constants";


type Props = {
  children?: ReactNode;
  onChange?: ((text: string) => void) | undefined;
  container?: ViewStyle;
  Compenents?: ReactNode;
  placeholder?: string | undefined
  ShowChildren?: boolean;
  Showline?: boolean;
};

interface PropsH {
  onChange?: ((text: string) => void) | undefined;
  placeholder?: string | undefined
}

const Headers = ({ onChange, placeholder }: PropsH) => {
  const { borderInput, color } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();
  return (
    <FlexContainer
      variant="row"
      newStyle={{
        alignItems: "center",
        width: SIZES.width,
      }}
    >
      <TouchableOpacity
        style={{
          marginLeft: SIZES.gapMedium / 2,
        }}
        onPress={() => {
          navigation.goBack();
        }}
      >
        <Image
          source={iconsNative.arrowBack}
          resizeMode="contain"
          style={{
            width: SIZES.icons / 1.6,
            height: SIZES.icons / 1.6,
            tintColor: color
          }}
        />
      </TouchableOpacity>
      <Search
        placeholder={placeholder}
        onChange={onChange}
        containerStyle={{
          borderColor: isFocused ? COLORS.primary : borderInput,
          height: SIZES.InputsHeight / 1.2
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </FlexContainer>
  );
};

const SearchLayout = ({ children, onChange, container , Compenents, placeholder, ShowChildren = true, Showline = true}: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: SIZES.gapMedium,
        ...container
      }}
    >
      <Headers 
      placeholder={placeholder}
      onChange={onChange} />
    { Showline &&  <LineDivider 
      lineStyle={{
        marginBottom: SIZES.gapSmall
      }}/>  }  
      {Compenents}
     {ShowChildren && 
           <KeyboardAwareScrollView
           decelerationRate="fast"
           contentContainerStyle={{
             flex: 1,
             backgroundColor: "transparent",
             paddingHorizontal: SIZES.gapMedium
           }}
         >
           {children}
         </KeyboardAwareScrollView>}
    </SafeAreaView>
  );
};

export default SearchLayout;