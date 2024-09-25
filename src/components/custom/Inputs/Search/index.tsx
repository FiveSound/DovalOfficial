import React, { ReactNode } from "react";
import { useTheme } from "../../../../hooks";
import FlexContainer from "../../FlexContainer";
import { FONTS, SIZES } from "../../../../constants/theme";
import { Search01Icon } from "../../../../constants/IconsPro";
import { ViewStyle , StyleSheet, TextInput} from "react-native";

type Props = {
  containerStyle?: ViewStyle;
  inputContainerStyle?: object;
  label?: string;
  placeholder?: string;
  inputStyle?: object;
  value?: string;
  prependComponent?: ReactNode;
  appendComponent?: ReactNode;
  onChange?: ((text: string) => void) | undefined;
  secureTextEntry?: boolean;
  keyboardType?:
    | "default"
    | "number-pad"
    | "decimal-pad"
    | "numeric"
    | "email-address"
    | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  errorMsg?: string;
  maxLength?: number;
  autoCompleteType?: undefined;
  onFocus?: () => void;
  onBlur?: () => void;
};

const Search = ({
  containerStyle,
  inputContainerStyle,
  label,
  placeholder,
  inputStyle,
  value = "",
  prependComponent,
  appendComponent,
  onChange,
  secureTextEntry,
  keyboardType,
  autoCompleteType,
  autoCapitalize = "none",
  errorMsg = "",
  maxLength,
  onFocus,
  onBlur,
}: Props) => {
  const { backgroundMaingrey, borderInput, color, Description } = useTheme();
  return (
    <FlexContainer
      newStyle={{

        ...styles.flexContainer,
        backgroundColor: backgroundMaingrey,
        ...containerStyle,
      }}
    >
      <Search01Icon
        width={SIZES.icons / 1.4}
        height={SIZES.icons / 1.4}
        color={onFocus ? Description : Description}
      />
      <TextInput
        numberOfLines={1}
        style={{
          ...styles.textInput,
          color: Description,
          ...inputStyle,
        }}
        value={value}
        placeholder={placeholder}
        placeholderTextColor={Description}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoComplete={autoCompleteType}
        autoCapitalize={autoCapitalize}
        maxLength={maxLength}
        onChangeText={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
    flexContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: SIZES.radius,
      height: SIZES.InputsHeight,
      width: SIZES.BtnWidth,
      borderRadius: SIZES.smallRadius,
      paddingHorizontal: SIZES.margin / 2,
    },
    textInput: {
      height: SIZES.BtnHeight,
      paddingHorizontal: SIZES.margin / 2,
      ...FONTS.text14,
      width: SIZES.BtnWidth,
    },
  });
export default Search;