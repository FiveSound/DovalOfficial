import React, { BaseSyntheticEvent, memo, ReactNode, useState } from 'react';
import {
  ViewStyle,
  TextStyle,
  TextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  StyleSheet,
} from 'react-native';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';
import { TextInput } from '../../../native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import LineDivider from '../../LineDivider';
import { useTheme } from '../../../../hooks';

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
  keyboardType?: TextInputProps['keyboardType'];
  autoCapitalize?: TextInputProps['autoCapitalize'];
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
  onContentSizeChange?: (
    event: BaseSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => void;
  showDivider?: boolean;
};

const Input = (props: Props) => {
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
    multiline,
    onFocus,
    endComponent,
    lineStyle,
    pickerOptions,
    onValueChange,
    labelStyle,
    onContentSizeChange,
    showDivider,
  } = props;
  const { Description, Title, borderInput } = useTheme();
  const focus = false;
  const [isFocused, setIsFocused] = useState(focus);
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
    <>
      <FlexContainer variant="row" newStyle={styles.container}>
        <FlexContainer variant="row" newStyle={styles.row}>
          <FlexContainer variant="row" newStyle={styles.innerRow}>
            {appenComponent}
            {/* <Typography variant="H4title" newStyle={{...FONTS.semi14, ...labelStyle}}>{label}</Typography> */}
          </FlexContainer>
        </FlexContainer>
        <TextInput
          style={[styles.textInput, inputStyle, { color: Title }]}
          placeholderTextColor={Title}
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
          onContentSizeChange={onContentSizeChange}
        />
        {endComponent}
      </FlexContainer>
      {showDivider && (
        <LineDivider
          lineStyle={{
            ...lineStyle,
            backgroundColor: isFocused ? COLORS.success : borderInput,
          }}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.margin / 2,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'auto',
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  innerRow: {
    alignItems: 'center',
    gap: SIZES.gapMedium,
    backgroundColor: 'transparent',
  },
  textInput: {
    marginVertical: SIZES.gapSmall,
    maxWidth: SIZES.BtnWidth,
    ...FONTS.semi14,
    height: SIZES.BtnHeight,
    paddingHorizontal: SIZES.gapMedium,
  },
});

export default memo(Input);
