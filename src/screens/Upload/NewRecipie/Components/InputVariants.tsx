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
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { FlexContainer, LineDivider } from '@/src/components/custom';
import { TextInput } from '@/src/components/native';

type Props = {
    testID?: string;
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
    onSize?: boolean;
    orientation?: 'Up' | 'Down';
    returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
    ShowDivider?: boolean;
    readOnly?: boolean;
    editable?: boolean;
};

const InputVariants = (props: Props) => {
    const {
        inputStyle,
        appenComponent,
        label,
        placeholder,
        secureTextEntry = false,
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
        orientation = 'Up',
        returnKeyType,
        testID,
        ShowDivider = true,
        readOnly = false,
        editable = true,
        containerStyle
    } = props;
    const { Description, Title, borderInput } = useTheme();
    const [height, setHeight] = useState(SIZES.InputsHeight);

    const handleContentSizeChange = (
        event: BaseSyntheticEvent<TextInputContentSizeChangeEventData>,
    ) => {
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
        <FlexContainer newStyle={[{ ...containerStyle }]}>
            <FlexContainer variant="row" newStyle={styles.row}>
                {appenComponent}
                {endComponent}
            </FlexContainer>
            <TextInput
                readOnly={readOnly}
                testID={testID}
                style={[styles.textInput, inputStyle, { color: Title }]}
                placeholderTextColor={Description}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onChangeText={onChangeText}
                value={value}
                editable={editable}
                onBlur={handleBlur}
                maxLength={maxLength}
                multiline={multiline}
                onFocus={handleFocus}
                onContentSizeChange={handleContentSizeChange}
                returnKeyType={returnKeyType}
            />
            {ShowDivider && (
                <LineDivider
                    lineStyle={{
                        ...lineStyle,
                        backgroundColor: isFocused ? COLORS.success : borderInput,
                        marginTop: SIZES.gapSmall,
                    }}
                />
            )}
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
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'transparent',
        width: '100%',
    },
    innerRow: {
        alignItems: 'center',
        gap: SIZES.gapMedium,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        width: '90%',
    },
    textInput: {
        maxWidth: SIZES.width,
        ...FONTS.semi14,
        height: SIZES.InputsHeight,
    },
});

export default InputVariants;