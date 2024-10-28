import React, { BaseSyntheticEvent, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useTheme } from '../../../../hooks';
import {
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from '../../../../components/native';
import { Avatars, FlexContainer } from '../../../../components/custom';
import styles from '../styles';
import i18next from '../../../../Translate';
import { Upload05Icon } from '../../../../constants/IconsPro';
import { CLOUDFRONT } from '../../../../services';

type Props = {
  value: string;
  onChangeText: any;
  onPressChat: () => void;
  source?: string;
  onFocusInput?: () => void;
};

const InputMain = (props: Props) => {
  const { value, onChangeText, onPressChat, source, onFocusInput } = props;
  const emojis = ['😀', '😍', '😂', '😳', '😏', '😅', '🥺'];
  const { user } = useAuth();
  const { backgroundMaingrey, Title, Description } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const handleEmojiPress = (emoji: string) => {
    onChangeText(value + emoji);
  };

  return (
    <>
      <FlexContainer newStyle={styles.emojiContainer}>
        {emojis.map((emoji, index) => (
          <TouchableOpacity key={index} onPress={() => handleEmojiPress(emoji)}>
            <ScrollView horizontal={true}>
              <Text style={styles.emoji}>{emoji}</Text>
            </ScrollView>
          </TouchableOpacity>
        ))}
      </FlexContainer>
      <FlexContainer
        newStyle={[
          styles.inputContainer,
          {
            backgroundColor: backgroundMaingrey,
          },
        ]}
      >
        <Avatars source={`${CLOUDFRONT}${user?.avatar}`} size="small" />
        <TextInput
          style={[
            styles.textInput,
            { color: Description, backgroundColor: backgroundMaingrey },
          ]}
          value={value}
          onChangeText={onChangeText}
          placeholder={i18next.t('Write a message...')}
          multiline
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
        />
        <TouchableOpacity onPress={onPressChat} style={styles.uploadIcon}>
          <Upload05Icon color={Title} />
        </TouchableOpacity>
      </FlexContainer>
    </>
  );
};

export default InputMain;
