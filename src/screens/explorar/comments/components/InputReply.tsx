import {
  View,
  TextInput,
  Button,
  TextInputContentSizeChangeEventData,
  TouchableOpacity,
} from 'react-native';
import useTheme from '../../../../hooks/useTheme';
import { BaseSyntheticEvent, useState } from 'react';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import { MessageUpload01Icon } from '../../../../constants/IconsPro';
import i18next from '../../../../Translate';
import { FlexContainer } from '../../../../components/custom';

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
};

const InputReply = (props: Props) => {
  const { backgroundMaingrey, borderInput, Description } = useTheme();
  const [inputHeight, setInputHeight] = useState(responsiveFontSize(18));

  const handleContentSizeChange = (
    event: BaseSyntheticEvent<TextInputContentSizeChangeEventData>,
  ) => {
    const newHeight = event.nativeEvent.contentSize.height;
    setInputHeight(newHeight);
  };
  return (
    <FlexContainer
      newStyle={{
        backgroundColor: backgroundMaingrey,
        width: SIZES.width,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: SIZES.borderWidth / 2,
        borderColor: borderInput,
        borderRadius: SIZES.margin / 2,
        marginBottom: SIZES.gapSmall,
        height: 'auto',
      }}
    >
      <TextInput
        style={{
          width: SIZES.BtnWidth / 1.1,
          backgroundColor: backgroundMaingrey,
          borderRadius: SIZES.radius,
          height: inputHeight,
          color: Description,
          paddingHorizontal: SIZES.radius,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        value={props.value}
        onChangeText={text => props.onChange(text)}
        placeholder={i18next.t('Write a message...')}
        placeholderTextColor={Description}
        multiline
        onContentSizeChange={handleContentSizeChange}
      />
      <TouchableOpacity
        onPress={props.onSubmit}
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: COLORS.primary,
          borderRadius: responsiveFontSize(28),
          height: responsiveFontSize(18),
          width: responsiveFontSize(18),
          margin: SIZES.radius,
        }}
      >
        <MessageUpload01Icon
          width={SIZES.icons / 1.4}
          height={SIZES.icons / 1.4}
          color={COLORS.dark}
        />
      </TouchableOpacity>
    </FlexContainer>
  );
};

export default InputReply;
