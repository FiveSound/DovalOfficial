import React from "react";
import { ReactNode } from "react";
import { ViewStyle } from "react-native";
import { SafeAreaView, KeyboardAwareScrollView, RefreshControl } from "../../native";
import FlexContainer from "../FlexContainer";
import { SIZES } from "../../../constants/theme";
import { Search } from "../Inputs";
import LineDivider from "../LineDivider";
import { ArrowBack } from "../Arrows";
import { useTheme } from "../../../hooks";
import { ScrollView } from 'react-native-virtualized-view'

type Props = {
  children?: ReactNode;
  onChange?: (text: string) => void;
  container?: ViewStyle;
  Components?: ReactNode; 
  placeholder?: string;
  showChildren?: boolean;
  showLine?: boolean;
  value?: string; 
  isRefreshing: boolean;
  onRefresh: () => void;
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
  isRefreshing,
  onRefresh,
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
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
          decelerationRate="fast"
          contentContainerStyle={{
            flex: 1,
            backgroundColor: "transparent",
            paddingHorizontal: SIZES.gapMedium,
            paddingBottom: SIZES.height / 4
          }}
        >
          {children}
        </ScrollView>}
    </SafeAreaView>
  );
};

export default SearchLayout;