import React, { BaseSyntheticEvent, memo, ReactNode, useState } from "react";
import {
  ViewStyle,
  TextStyle,
  TextInputProps,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  TextInputContentSizeChangeEventData,
  StyleSheet,
  View,
  Text,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList
} from "react-native";
import FlexContainer from "../../FlexContainer";
import { FONTS, SIZES } from "../../../../constants/theme";
import LineDivider from "../../LineDivider";
import { useTheme } from "../../../../hooks";
import Typography from "../../Typography";

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
  onEndComponentPress?: () => void;
};

const InputPicker = (props: Props) => {
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
    onEndComponentPress
  } = props;
  const { Description, Title } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleValueChange = (value: any) => {
    onValueChange && onValueChange(value, pickerOptions.findIndex(option => option.value === value));
    setModalVisible(false);
  };

  return (
    <FlexContainer newStyle={styles.container}>
      <FlexContainer variant="row" newStyle={styles.row}>
        <FlexContainer variant='row' newStyle={styles.innerRow}>
          {appenComponent}
          {label && <Typography variant='subtitle' newStyle={StyleSheet.flatten([styles.label, labelStyle, {color: Title}])}>{label}</Typography>}
        </FlexContainer>
        {endComponent && (
          <TouchableOpacity onPress={onEndComponentPress}>
            {endComponent}
          </TouchableOpacity>
        )}
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
        onBlur={onBlur}
        maxLength={maxLength}
        multiline={multiline}
        onFocus={() => pickerOptions && setModalVisible(true)}
        onContentSizeChange={onContentSizeChange}
      />
      {pickerOptions && (
        <Modal
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <FlatList
              data={pickerOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleValueChange(item.value)}>
                  <Text style={styles.pickerItem}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      )}
      <LineDivider lineStyle={lineStyle} />
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.margin / 2,
    backgroundColor: 'transparent'
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
    marginVertical: SIZES.gapSmall,
    maxWidth: SIZES.BtnWidth,
    ...FONTS.semi14,
    height: SIZES.InputsHeight
  },
  label: {
    ...FONTS.semi14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerItem: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  }
});

export default memo(InputPicker);