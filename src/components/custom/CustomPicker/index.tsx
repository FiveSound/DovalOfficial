import React, { useState } from 'react';
import {
  StyleSheet,
  TextStyle,
  View
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, Modal, Platform, TouchableOpacity } from '../../native';
import Typography from '../Typography';
import { COLORS, FONTS, responsiveFontSize, SIZES } from '../../../constants/theme';


type CustomPickerProps = {
  selectedValue: string | Date;
  onValueChange: (value: string | Date) => void;
  items: { label: string; value: string }[];
  placeholder: string;
  isDatePicker?: boolean;
  mode?: 'date' | 'time';
  isIOS?: boolean;
  style?: TextStyle;
};

const CustomPicker: React.FC<CustomPickerProps> = ({
  selectedValue,
  onValueChange,
  items,
  placeholder,
  isDatePicker = false,
  mode = 'date',
  style,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [tempDate, setTempDate] = useState<Date>(
    selectedValue instanceof Date ? selectedValue : new Date()
  );

  const [showAndroidPicker, setShowAndroidPicker] = useState(false);

  const handleConfirm = () => {
    onValueChange(tempDate);
    setModalVisible(false);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setShowAndroidPicker(false);
  };

  const handlePickerChange = (
    event: DateTimePickerEvent,
    date?: Date,
    itemValue?: string
  ) => {
    if (isDatePicker) {
      if (date) {
        if (Platform.OS === 'android') {
          // On Android, immediately set the date and hide the picker
          onValueChange(date);
          setShowAndroidPicker(false);
        } else {
          setTempDate(date);
        }
      } else {
        if (Platform.OS === 'android') {
          setShowAndroidPicker(false);
        }
      }
    } else {
      if (itemValue !== undefined) {
        onValueChange(itemValue);
        if (Platform.OS === 'ios') {
          setModalVisible(false);
        }
      }
    }
  };

  const showPicker = () => {
    if (isDatePicker && Platform.OS === 'android') {
      setShowAndroidPicker(true);
    } else {
      setModalVisible(true);
    }
  };

  const formatSelectedValue = () => {
    if (isDatePicker) {
      if (!(selectedValue instanceof Date)) return placeholder;
      return mode === 'time'
        ? selectedValue.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : selectedValue.toLocaleDateString();
    } else {
      return items.find(item => item.value === selectedValue)?.label || placeholder;
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, style]}
        onPress={showPicker}
      >
        <Typography variant="H4title">
          {formatSelectedValue()}
        </Typography>
      </TouchableOpacity>

      {isDatePicker ? (
        Platform.OS === 'ios' ? (
          isModalVisible && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={isModalVisible}
              onRequestClose={handleCancel}
            >
              <View style={styles.modalContainer}>
                <View style={styles.pickerWrapper}>
                  <DateTimePicker
                    value={selectedValue instanceof Date ? selectedValue : new Date()}
                    mode={mode}
                    is24Hour={true}
                    display="spinner"
                    textColor={COLORS.primary}
                    onChange={handlePickerChange}
                  />
                  <View style={styles.buttonRow}>
                    <Button
                      title="Confirm"
                      onPress={handleConfirm}
                    />
                  </View>
                </View>
              </View>
            </Modal>
          )
        ) : (
          showAndroidPicker && (
            <DateTimePicker
              value={selectedValue instanceof Date ? selectedValue : new Date()}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={handlePickerChange}
            />
          )
        )
      ) : (
        Platform.OS === 'ios' && isModalVisible && (
          <Modal
            transparent={true}
            animationType="slide"
            visible={isModalVisible}
            onRequestClose={handleCancel}
          >
            <View style={styles.modalContainer}>
              <View style={styles.pickerWrapper}>
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={handlePickerChange}
                  style={styles.picker}
                  dropdownIconColor={COLORS.primary}
                >
                  <Picker.Item label={placeholder} value="" />
                  {items.map(item => (
                    <Picker.Item
                      key={item.value}
                      label={item.label}
                      value={item.value}
                      color={COLORS.primary}
                      style={FONTS.semi14}
                    />
                  ))}
                </Picker>
                <View style={styles.buttonRow}>
                  <Button
                    title="Confirm"
                    onPress={handleConfirm}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )
      )}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
  },
  picker: {
    width: '100%',
    color: COLORS.primary,
  },
  item: {
    ...FONTS.semi14,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pickerWrapper: {
    backgroundColor: 'white',
    padding: responsiveFontSize(20),
    borderTopLeftRadius: responsiveFontSize(20),
    borderTopRightRadius: responsiveFontSize(20)    ,
  },
  buttonRow: {
    justifyContent: 'center',
    marginTop: responsiveFontSize(10),
  },
  modalButton: {
    marginLeft: responsiveFontSize(10),
  },
});

export default CustomPicker;
