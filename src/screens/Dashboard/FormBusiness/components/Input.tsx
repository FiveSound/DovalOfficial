import React, { ReactNode } from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import { KeyboardTypeOptions, TextStyle, StyleSheet, Text } from 'react-native';
import { FlexContainer, InputLabel, Search } from '../../../../components/custom';

type InputProps = {
  control: any;
  name: string;
  placeholder: string;
  required?: boolean;
  maxLength?: number;
  appenComponent?: ReactNode;
  keyboardType?: KeyboardTypeOptions;
  inputStyle?: TextStyle;
  isSearch?: boolean;
  validationRules?: RegisterOptions;
};

const Input: React.FC<InputProps> = ({
  control,
  name,
  placeholder,
  required,
  maxLength,
  appenComponent,
  keyboardType,
  inputStyle,
  isSearch = false,
  validationRules,
}) => {
  return (
    <>
      <Controller
        control={control}
        defaultValue=""
        rules={{
          required: required ? `${placeholder} es requerido` : false,
          maxLength: {
            value: maxLength || 50,
            message: `${placeholder} no puede exceder ${maxLength || 50} caracteres`,
          },
          ...validationRules,
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            {isSearch ? (
              <FlexContainer newStyle={styles.searchContainer}>
                <Search
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  maxLength={maxLength || 50}
                  label={placeholder}
                />
              </FlexContainer>
            ) : (
              <InputLabel
                label={placeholder}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={maxLength || 50}
                orientation='Up'
                appenComponent={appenComponent}
                keyboardType={keyboardType}
                inputStyle={inputStyle}
              />
            )}
            {error && <Text style={styles.errorText}>{error.message}</Text>}
          </>
        )}
        name={name}
      />
    </>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
    marginLeft: 8,
    fontSize: 12,
  },
});

export default Input;