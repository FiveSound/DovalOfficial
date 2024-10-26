import React, { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { StyleSheet, TextStyle, View, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, TouchableOpacity } from '../../../../components/native';
import { FONTS } from '../../../../constants/theme';
import TextSelector from '../../../../components/custom/Select/TextSelector';
import { useTheme } from '../../../../hooks';

type SelectProps = {
  control: any;
  name: string;
  list?: { label: string; value: string }[];
  defaultValue: string | any[]; // Soporta string o array para multi selección
  placeholder: string;
  required: boolean;
  isDatePicker?: boolean;
  isMultiSelect?: boolean; // Nueva prop para multi selección
  IconsendComponent?: React.ReactNode;
  listTextSelector?: {
    category: string;
    list: {
      id: number;
      label: string;
      value: string;
      interest: string;
    }[];
  }[];
  inputStyle?: TextStyle;
};

const Select = ({
  control, 
  name, 
  list = [], 
  defaultValue, 
  placeholder, 
  required, 
  isDatePicker = false, 
  isMultiSelect = false, 
  IconsendComponent, 
  listTextSelector,
  inputStyle
}: SelectProps) => {
  const { backgroundMaingrey } = useTheme();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedItems, setSelectedItems] = useState<any[]>([]); // Para multi selección

  useEffect(() => {
    if (!isMultiSelect) {
      setSelectedItems([]);
    }
  }, [isMultiSelect]);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      control.setValue(name, date);
    }
    setPickerVisible(false);
  };

  const handlePickerClose = () => {
    setPickerVisible(false);
  };

  const renderSelectedValue = () => {
    if (isMultiSelect) {
      return selectedItems.length > 0
        ? selectedItems.map(item => item.label).join(', ')
        : placeholder;
    } else if (isDatePicker) {
      return selectedDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return selectedValue || placeholder;
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.inputContainer, inputStyle, {backgroundColor: backgroundMaingrey}]}
        onPress={() => setPickerVisible(true)}
        activeOpacity={0.7}
      >
        <Text style={[styles.inputText, selectedValue || (isMultiSelect && selectedItems.length > 0) ? styles.selectedText : styles.placeholderText]}>
          {renderSelectedValue()}
        </Text>
        {IconsendComponent && <View style={styles.iconContainer}>{IconsendComponent}</View>}
      </TouchableOpacity>

      {isPickerVisible && (
        isDatePicker ? (
          <View style={styles.pickerContainer} testID="date-picker">
            <DateTimePicker
              value={selectedDate}
              mode="time"
              display="default"
              onChange={handleDateChange}
            />
            <Button
              title='Confirmar'
              onPress={handlePickerClose}
              testID="confirm-button"
              style={styles.confirmButton}
            />
          </View>
        ) : isMultiSelect ? (
          <TextSelector
            data={listTextSelector}
            value={selectedItems}
            onChange={(items) => {
              setSelectedItems(items);
              control.setValue(name, items);
              setPickerVisible(false);
            }}
          />
        ) : (
          <View style={styles.pickerContainer}>
            <Controller
              control={control}
              rules={{ required: required }}
              defaultValue={defaultValue}
              render={({ field: { onChange } }) => (
                <Picker
                  selectedValue={selectedValue}
                  onValueChange={(itemValue) => {
                    setSelectedValue(itemValue);
                    onChange(itemValue);
                    setPickerVisible(false);
                  }}
                  style={styles.picker}
                >
                  {list.map((item) => (
                    <Picker.Item key={item.value} label={item.label} value={item.value} />
                  ))}
                </Picker>
              )}
              name={name}
            />
          </View>
        )
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    justifyContent: 'space-between',
  },
  inputText: {
    flex: 1,
    ...FONTS.text14,
  },
  placeholderText: {
    color: '#999',
  },
  selectedText: {
    color: '#000',
  },
  iconContainer: {
    marginLeft: 10,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 10,
    padding: 10,
    elevation: 2, // Añade sombra para mejor visualización
  },
  picker: {
    width: "100%",
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
});

export default Select;