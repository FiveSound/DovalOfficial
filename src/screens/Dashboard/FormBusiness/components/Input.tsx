import React, { ReactNode } from 'react';
import { Controller, RegisterOptions } from 'react-hook-form';
import { KeyboardTypeOptions, TextStyle, StyleSheet, Text } from 'react-native';
import {
  FlexContainer,
  InputLabel,
  Search,
  Typography,
} from '../../../../components/custom';
import { SIZES } from '../../../../constants/theme';

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
  testID?: string;
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
  testID
}) => {
  return (
    <>
      <Controller
        control={control}
        defaultValue=""
        rules={{
          required: required ? `${placeholder} es requerido` : false,
          maxLength: {
            value: maxLength || 100,
            message: `${placeholder} no puede exceder ${maxLength || 50} caracteres`,
          },
          ...validationRules,
        }}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            {isSearch ? (
              <FlexContainer newStyle={styles.searchContainer}>
                <Search
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value}
                  maxLength={maxLength || 100}
                  label={placeholder}
                />
              </FlexContainer>
            ) : (
              <InputLabel
                testID={testID}
                label={placeholder}
                placeholder={placeholder}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                maxLength={maxLength || 100}
                orientation="Up"
                appenComponent={appenComponent}
                keyboardType={keyboardType}
                inputStyle={inputStyle}
              />
            )}
            {error && (
              <Typography variant="H4title" newStyle={styles.errorText}>
                {error.message}
              </Typography>
            )}
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
    paddingHorizontal: SIZES.gapLarge,
  },
});

export default Input;
