import React, { BaseSyntheticEvent, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useTheme } from '../../../../hooks';
import {
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from '../../../../components/native';
import { Avatars, FlexContainer, IsLoading, Typography } from '../../../../components/custom';
import styles from '../styles';
import i18next from '../../../../Translate';
import { Upload05Icon } from '../../../../constants/IconsPro';
import { CLOUDFRONT } from '../../../../services';
import { COLORS, responsiveFontSize, SIZES } from '@/src/constants/theme';
import { useAppSelector } from '@/src/redux';

type Props = {
  value: string;
  onChangeText: any;
  onPressChat: () => void;
  source?: string;
  onFocusInput?: () => void;
  loading?: boolean;
};

const InputMain = (props: Props) => {
  const { value, onChangeText, onPressChat, source, onFocusInput, loading } = props;
  const emojis = ['😀', '😍', '😂', '😳', '😏', '😅', '🥺'];
  const { user } = useAuth();
  const { backgroundMaingrey, Title, Description } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const [inputHeight, setInputHeight] = useState<number>(responsiveFontSize(40));
  const { isAuthenticated } = useAppSelector(state => state.auth);

  const handleEmojiPress = (emoji: string) => {
    onChangeText(value + emoji);
  };

  const handleContentSizeChange = (event: BaseSyntheticEvent) => {
    const newHeight = event.nativeEvent.contentSize.height;
    setInputHeight(newHeight < responsiveFontSize(40) ? responsiveFontSize(40) : newHeight); 
  };

  return (
    <>
      <FlexContainer newStyle={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => handleEmojiPress(emoji)}>
            <ScrollView horizontal={true}>
              <Typography variant='H4title' style={styles.emoji}>{emoji}</Typography>
            </ScrollView>
          </TouchableOpacity>
        ))}
      </FlexContainer>
      <FlexContainer
        newStyle={styles.inputContainer}
      >
        {
          isAuthenticated && <Avatars source={`${CLOUDFRONT}${user?.avatar}`} size='medium' />
        }
        <TextInput
          style={[
            styles.textInput,
            { 
              color: Description, 
              backgroundColor: backgroundMaingrey, 
              height: inputHeight 
            },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={i18next.t('Write a message...')}
          multiline
          onContentSizeChange={handleContentSizeChange}
          onFocus={() => {
            setIsFocused(true);
            if (onFocusInput) {
              onFocusInput();
            }
          }}
          onBlur={() => setIsFocused(false)}
        />
      </FlexContainer>
      <TouchableOpacity onPress={onPressChat} style={styles.uploadIcon}>
        {
          loading ? <IsLoading color='dark'/> : <Upload05Icon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons}/>
        }
      </TouchableOpacity>
    </>
  );
};

export default InputMain;