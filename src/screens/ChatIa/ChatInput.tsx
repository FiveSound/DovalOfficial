import React, { BaseSyntheticEvent, useState } from 'react';
import { TextInputContentSizeChangeEventData, StyleSheet } from 'react-native';
import useTheme from '../../hooks/useTheme';
import DarkMode from '../../hooks/DarkMode';
import { COLORS, responsiveFontSize, SIZES } from '../../constants/theme';
import { CommentAdd02Icon, MessageUpload01Icon } from '../../constants/IconsPro';
import i18next from '../../Translate';
import { FlexContainer } from '../../components/custom';
import { TextInput, TouchableOpacity } from '../../components/native';

export interface ChatInputProps {
  userInput: string;
  isLoading: boolean;
  handleUserInput: (text: string) => void;
  handleSubmit: () => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ userInput, isLoading, handleUserInput, handleSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  const { bgInput, borderInput } = useTheme();
  const { SecundaryText } = DarkMode();
  const [inputHeight, setInputHeight] = useState(responsiveFontSize(24));

  const handleContentSizeChange = (event: BaseSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    const newHeight = event.nativeEvent.contentSize.height;
    const adjustedHeight = newHeight + responsiveFontSize(14);
    setInputHeight(adjustedHeight);
  };

  return (
    <FlexContainer
      newStyle={{
        ...styles.flexContainer,
        backgroundColor: bgInput,
        borderColor: borderInput,
      }}
    >
      <TextInput
        style={{
          ...styles.textInput,
          backgroundColor: bgInput,
          color: SecundaryText,
          height: inputHeight,
        }}
        value={userInput}
        onChangeText={handleUserInput}
        placeholder={i18next.t('Write a message...')}
        placeholderTextColor={SecundaryText}
        multiline
        onContentSizeChange={handleContentSizeChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading}
        style={styles.touchableOpacity}
      >
        <CommentAdd02Icon
          width={SIZES.icons / 1.4}
          height={SIZES.icons / 1.4}
          color={COLORS.dark}
        />
      </TouchableOpacity>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    width: SIZES.width,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: SIZES.borderWidth / 2,
    borderRadius: SIZES.margin / 2,
    marginBottom: SIZES.gapSmall,
    height: 'auto',
    position: 'absolute',
    bottom: responsiveFontSize(80),
  },
  textInput: {
    width: SIZES.BtnWidth / 1.1,
    borderRadius: SIZES.radius,
    paddingHorizontal: SIZES.radius2,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: responsiveFontSize(24),
  },
  touchableOpacity: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: responsiveFontSize(28),
    margin: SIZES.radius2,
    padding: SIZES.radius2,
  },
});

export default ChatInput;