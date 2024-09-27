import React, { BaseSyntheticEvent, memo, ReactNode, useState } from "react";
import {
  ViewStyle,
  TextStyle,
  TextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  StyleSheet
} from "react-native";
import FlexContainer from "../../FlexContainer";
import Typography from "../../Typography";
import { TextInput } from "../../../native";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import LineDivider from "../../LineDivider";
import { useTheme } from "../../../../hooks";

type Props = {
  containerStyle?: ViewStyle;
  label?: string;
  labelStyle?: TextStyle;
  placeholder: string;
  inputStyle?: TextStyle;
  ContainerInput?: TextStyle;
  LabelInput?: TextStyle;
  endComponent?: ReactNode;
  appenComponent?: ReactNode;
  onChange?: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  errorMsg?: string;
  errorStyle?: object;
  onChangeText?: (text: string) => void;
  icon?: any;
  onSubmitEditing?: () => void;
  value?: string;
  disabled?: boolean;
  onBlur?: (e: any) => void;
  maxLength?: number;
  multiline?: boolean;
  onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  lineStyle?: ViewStyle;
  pickerOptions?: { label: string; value: any }[];
  onValueChange?: (itemValue: any, itemIndex: number) => void;
  onContentSizeChange?: (event: BaseSyntheticEvent<TextInputContentSizeChangeEventData>) => void;
  onSize?: boolean;
  orientation?: 'Up' | 'Down';
};

const InputLabel = (props: Props) => {
  const {
    inputStyle,
    appenComponent,
    label,
    placeholder,
    secureTextEntry,
    autoCapitalize,
    keyboardType,
    onChangeText,
    value,
    disabled,
    onBlur,
    maxLength,
    multiline = true,
    onFocus,
    endComponent,
    lineStyle,
    pickerOptions,
    onValueChange,
    labelStyle,
    onContentSizeChange,
    onSize = false,
    orientation = 'Up'
  } = props;
  const { Description, Title , borderInput} = useTheme();
  const [height, setHeight] = useState(SIZES.InputsHeight);

  const handleContentSizeChange = (event: BaseSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    if (onContentSizeChange) {
      onContentSizeChange(event);
    }
    setHeight(event.nativeEvent.contentSize.height);
  };

  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    if (onBlur) {
      onBlur(e);
    }
  };

  return (
    <FlexContainer newStyle={styles.container}>
      {
        orientation === 'Up' &&     <FlexContainer variant="row" newStyle={styles.row}>
        <FlexContainer variant='row' newStyle={styles.innerRow}>
          {appenComponent}
        </FlexContainer>
        {endComponent}
      </FlexContainer>
      }
      <TextInput
          style={[styles.textInput, inputStyle, {color: Title}]}
          placeholderTextColor={Description}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          onChangeText={onChangeText}
          value={value}
          editable={!disabled}
          onBlur={handleBlur}
          maxLength={maxLength}
          multiline={multiline}
          onFocus={handleFocus}
          onContentSizeChange={handleContentSizeChange}
        />
      <LineDivider lineStyle={{...lineStyle, backgroundColor: isFocused ? COLORS.success : borderInput, marginTop: SIZES.gapSmall }}/>
      {
        orientation === 'Down' &&     <FlexContainer variant="row" newStyle={styles.row}>
        <FlexContainer variant='row' newStyle={styles.innerRow}>
          {appenComponent}
        </FlexContainer>
        {endComponent}
      </FlexContainer>
      }
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
    container: {
      backgroundColor: 'transparent',
      width: '100%',
      paddingHorizontal: SIZES.gapLarge,
      marginVertical: SIZES.gapSmall,
    },
    row: {
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: 'transparent'
    },
    innerRow: {
      alignItems: 'center',
      gap: SIZES.gapMedium,
      backgroundColor: 'transparent'
    },
    textInput: {
      maxWidth: SIZES.width,
      ...FONTS.semi14,
      height: SIZES.InputsHeight
    }
  });

export default InputLabel;