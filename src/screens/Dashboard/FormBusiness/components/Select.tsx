import React, { useState } from 'react';
import {
  Platform,
  StyleSheet,
  TextStyle,
  View,
  Text,
  Modal,
} from 'react-native';
import { Controller, Control, FieldValues } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Button, TouchableOpacity } from '../../../../components/native';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import TextSelector from '../../../../components/custom/Select/TextSelector';
import { FlexContainer, Typography } from '../../../../components/custom';

type SelectProps = {
  control: Control<FieldValues>;
  name: string;
  list?: { label: string; value: string }[];
  defaultValue: string | any[] | Date | null; // Soporta string, array o Date para multi selección y pickers de tiempo
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
  maxSelections?: number; // Nueva prop para la cantidad máxima de selecciones
  onChange?: (value: any) => void; // Callback adicional para manejar cambios externos
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
  inputStyle,
  maxSelections = 2, // Valor por defecto si no se proporciona
  onChange,
}: SelectProps) => {
  const { backgroundMaingrey, Title, BackgroundMain } = useTheme();
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [isDropdownVisible, setDropdownVisible] = useState(false); // Nuevo estado para Picker Dropdown
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleDateChange = (
    event: Event,
    date?: Date,
    onChangeField?: (date: Date | null) => void,
  ) => {
    if (Platform.OS === 'android') {
      if (event.type === 'set' && date) {
        onChangeField?.(date);
        onChange?.(date);
      }
      setPickerVisible(false);
    } else {
      if (date) {
        setSelectedDate(date);
        onChangeField?.(date);
        onChange?.(date);
      }
      // En iOS, no cerrar el picker automáticamente
    }
  };

  const handleConfirm = (onChangeField: (value: any) => void) => {
    if (selectedDate) {
      onChangeField(selectedDate);
      onChange?.(selectedDate);
    }
    setPickerVisible(false);
  };

  const handlePickerClose = () => {
    setPickerVisible(false);
  };

  const handleDropdownClose = () => {
    setDropdownVisible(false);
  };

  return (
    <Controller
      control={control}
      rules={{ required: required }}
      defaultValue={defaultValue}
      name={name}
      render={({
        field: { onChange: onChangeField, onBlur, value },
        fieldState: { error },
      }) => (
        <View style={styles.container}>
          {isMultiSelect ? (
            <TextSelector
              data={listTextSelector}
              value={value || []}
              onChange={items => {
                onChangeField(items);
                if (onChange) {
                  onChange(items);
                }
              }}
              maxSelections={maxSelections}
            />
          ) : isDatePicker ? (
            <>
              <Button
                onPress={() => setPickerVisible(true)}
                title={
                  value
                    ? `Seleccionado: ${new Date(value).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}`
                    : placeholder
                }
              />
              {isPickerVisible &&
                (Platform.OS === 'ios' ? (
                  <Modal
                    transparent={true}
                    animationType="slide"
                    visible={isPickerVisible}
                    onRequestClose={handlePickerClose}
                  >
                    <View style={styles.modalContainer}>
                      <View style={styles.pickerWrapper}>
                        <DateTimePicker
                          value={value ? new Date(value) : selectedDate}
                          mode="time"
                          is24Hour={true}
                          display="spinner"
                          textColor={COLORS.primary}
                          onChange={(event, date) =>
                            handleDateChange(event, date, onChangeField)
                          }
                        />
                        <Button
                          title="Confirmar"
                          onPress={() => handleConfirm(onChangeField)}
                          testID="confirm-button"
                          style={styles.confirmButton}
                        />
                      </View>
                    </View>
                  </Modal>
                ) : (
                  // Sección modificada para Android: Mostrar DateTimePicker directamente sin Modal ni botón de confirmación
                  <DateTimePicker
                    value={value ? new Date(value) : selectedDate}
                    mode="time"
                    is24Hour={true}
                    display="default"
                    onChange={(event, date) =>
                      handleDateChange(event, date, onChangeField)
                    }
                  />
                ))}
            </>
          ) : (
            <>
              {Platform.OS === 'ios' ? (
                <>
                  <TouchableOpacity
                    style={[
                      styles.button,
                      {
                        backgroundColor: backgroundMaingrey,
                      },
                    ]}
                    onPress={() => setDropdownVisible(true)}
                  >
                    <Typography variant="H4title">
                      {value
                        ? list.find(item => item.value === value)?.label ||
                          placeholder
                        : placeholder}
                    </Typography>
                  </TouchableOpacity>
                  {isDropdownVisible && (
                    <Modal
                      transparent={true}
                      animationType="slide"
                      visible={isDropdownVisible}
                      onRequestClose={handleDropdownClose}
                    >
                      <View style={styles.modalContainer}>
                        <View style={styles.pickerWrapper}>
                          <Picker
                            selectedValue={value}
                            onValueChange={itemValue => {
                              onChangeField(itemValue);
                              if (onChange) {
                                onChange(itemValue);
                              }
                            }}
                            style={[
                              styles.picker,
                              {
                                color: Title,
                                ...FONTS.semi14,
                              },
                            ]}
                            itemStyle={{
                              color: Title,
                            }}
                            dropdownIconColor={Title}
                          >
                            <Picker.Item label={placeholder} value="" />
                            {list.map(item => (
                              <Picker.Item
                                key={item.value}
                                label={item.label}
                                value={item.value}
                                color={COLORS.primary}
                                style={{
                                  ...FONTS.semi14,
                                }}
                              />
                            ))}
                          </Picker>
                          <Button
                            title="Confirmar"
                            onPress={handleDropdownClose}
                          />
                        </View>
                      </View>
                    </Modal>
                  )}
                </>
              ) : (
                <FlexContainer newStyle={styles.pickerContainer}>
                  <Picker
                    mode="dropdown"
                    selectedValue={value}
                    onValueChange={itemValue => {
                      onChangeField(itemValue);
                      if (onChange) {
                        onChange(itemValue);
                      }
                    }}
                    itemStyle={{
                      color: Title,
                    }}
                    style={{
                      backgroundColor: backgroundMaingrey,
                      width: '94%',
                      borderRadius: SIZES.radius,
                      color: Title,
                    }}
                    dropdownIconColor={Title}
                  >
                    <Picker.Item label={placeholder} value="" />
                    {list.map(item => (
                      <Picker.Item
                        key={item.value}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </Picker>
                  {error && (
                    <Text style={styles.errorText}>
                      {error.message || 'Este campo es requerido'}
                    </Text>
                  )}
                </FlexContainer>
              )}
              {/* Mostrar error solo para Picker estándar */}
              {!isMultiSelect && !isDatePicker && error && (
                <Typography variant="H4title" newStyle={styles.errorText}>
                  {error.message || 'Este campo es requerido'}
                </Typography>
              )}
            </>
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    width: '100%',
  },
  picker: {
    width: '100%',
  },
  pickerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    textAlign: 'left',
    paddingHorizontal: SIZES.padding,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)', // Fondo semi-transparente
  },
  pickerWrapper: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  button: {
    padding: 12,
    borderRadius: SIZES.radius,
    justifyContent: 'center',
  },
});

export default Select;
