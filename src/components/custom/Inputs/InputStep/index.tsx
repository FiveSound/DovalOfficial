import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  StyleSheet,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  TextInput,
  Keyboard,
} from 'react-native';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import Typography from '../../Typography';
import FlexContainer from '../../FlexContainer';

type Props = {
  onCodeFilled: (code: string) => void;
  label?: string;
  sublabel?: string;
  isVerified: boolean;
  hasError: boolean;
};

const InputStep = ({
  onCodeFilled,
  label,
  sublabel,
  isVerified,
  hasError,
}: Props) => {
  const { Title, borderInput } = useTheme();
  const [code, setCode] = useState(Array(6).fill(''));
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const inputsRef = useRef<Array<TextInput | null>>([]);

  const handleChangeText = useCallback(
    (text: string, index: number) => {
      if (!/^\d+$/.test(text)) return;

      const newCode = [...code];
      text.split('').forEach((char, i) => {
        if (i + index < 6) {
          newCode[i + index] = char;
        }
      });
      setCode(newCode);

      if (text.length + index < 6) {
        inputsRef.current[text.length + index]?.focus();
        setActiveIndex(text.length + index);
      }

      if (newCode.every(char => char !== '')) {
        onCodeFilled(newCode.join(''));
      }
    },
    [code, onCodeFilled],
  );

  const handleKeyPress = useCallback(
    (e: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
      if (e.nativeEvent.key === 'Backspace') {
        const newCode = [...code];
        if (index > 0 && !newCode[index]) {
          inputsRef.current[index - 1]?.focus();
          newCode[index - 1] = '';
          setActiveIndex(index - 1);
        } else {
          newCode[index] = '';
        }
        setCode(newCode);
      }
    },
    [code],
  );

  const handleAutoComplete = useCallback(
    (receivedCode: string) => {
      const newCode = receivedCode.split('').slice(0, 6);
      setCode(newCode);
      newCode.forEach((char, i) => {
        if (inputsRef.current[i]) {
          inputsRef.current[i]?.setNativeProps({ text: char });
        }
      });
      if (newCode.length === 6) {
        onCodeFilled(newCode.join(''));
      } else {
        inputsRef.current[newCode.length]?.focus();
        setActiveIndex(newCode.length);
      }
    },
    [onCodeFilled],
  );

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        const receivedCode = code.join('');
        if (receivedCode.length === 6) {
          handleAutoComplete(receivedCode);
        }
      },
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [code, handleAutoComplete]);

  useEffect(() => {
    if (activeIndex !== null) {
      inputsRef.current[activeIndex]?.focus();
    }
  }, [activeIndex]);

  return (
    <FlexContainer newStyle={styles.container}>
      <FlexContainer>
        <Typography variant="title" newStyle={styles.label}>
          {label}
        </Typography>
        <Typography variant="SubDescription" newStyle={styles.sublabel}>
          {sublabel}
        </Typography>
      </FlexContainer>
      <FlexContainer newStyle={styles.subcontainer}>
        {code.map((char, index) => (
          <TextInput
            key={index}
            ref={el => (inputsRef.current[index] = el)}
            style={[
              styles.input,
              {
                borderBottomColor: isVerified
                  ? COLORS.success
                  : hasError
                    ? COLORS.error
                    : char
                      ? COLORS.primary
                      : activeIndex === index
                        ? COLORS.primary
                        : Title,
                color: isVerified
                  ? COLORS.success
                  : hasError
                    ? COLORS.error
                    : char
                      ? COLORS.primary
                      : activeIndex === index
                        ? COLORS.primary
                        : Title,
              },
            ]}
            value={char}
            onChangeText={text => {
              if (text.length === 6) {
                handleAutoComplete(text);
              } else {
                handleChangeText(text, index);
              }
            }}
            maxLength={6}
            keyboardType="numeric"
            onFocus={() => setActiveIndex(index)}
            onBlur={() => setActiveIndex(null)}
            onKeyPress={e => handleKeyPress(e, index)}
          />
        ))}
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    alignItems: 'center',
    gap: SIZES.gapLarge * 2,
  },
  subcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: SIZES.BtnWidth / 1.1,
    paddingHorizontal: SIZES.gapLarge,
  },
  input: {
    borderBottomWidth: SIZES.borderWidth * 2,
    textAlign: 'center',
    ...FONTS.semi21,
    width: responsiveFontSize(46),
    height: responsiveFontSize(46),
  },
  label: {
    ...FONTS.heading24,
    textAlign: 'center',
  },
  sublabel: {
    ...FONTS.text14,
    textAlign: 'center',
    color: COLORS.success,
  },
});

export default InputStep;
