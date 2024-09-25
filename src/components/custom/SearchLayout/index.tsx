import React from "react";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { SafeAreaView, KeyboardAwareScrollView } from "../../native";
import FlexContainer from "../FlexContainer";
import { SIZES } from "../../../constants/theme";
import { Search } from "../Inputs";
import LineDivider from "../LineDivider";
import { ArrowBack } from "../Arrows";
import { useTheme } from "../../../hooks";

type Props = {
  children?: ReactNode;
  onChange?: (text: string) => void;
  container?: ViewStyle;
  Components?: ReactNode; // Corregido typo
  placeholder?: string;
  showChildren?: boolean;
  showLine?: boolean;
  value?: string; // Agregado para controlar el valor
};

const Headers = ({ onChange, placeholder, value }: { onChange?: (text: string) => void; placeholder?: string; value?: string }) => {
  const handleChange = (text: string) => {
    if (onChange) {
      onChange(text);
    }
  };

  return (
    <FlexContainer
      variant="row"
      newStyle={{
        alignItems: "center",
        width: SIZES.width,
      }}
    >
      <ArrowBack />
      <Search
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </FlexContainer>
  );
};

const SearchLayout = ({
  children,
  onChange,
  Components,
  placeholder,
  showChildren = true,
  showLine = true,
  value = "",
}: Props) => {
  const { BackgroundMain } = useTheme();
  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: SIZES.gapLarge,
        backgroundColor: BackgroundMain
      }}
    >
      <Headers
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {showLine && <LineDivider
        lineStyle={{
          marginBottom: SIZES.gapSmall
        }} />}
      {Components}
      {showChildren &&
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