import { useEffect, useState } from 'react';
import { TextInput } from 'react-native';
import { scale } from 'react-native-size-matters';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import ShareToContacts from './ShareToContacts';
import { SIZES } from '../../../constants';
import ShareToSocialMedia from './ShareToSocialMedia';
import AdditionalOptions from './AdditionalOptions';
import { COLORS, responsiveFontSize } from '../../../constants/theme';
import { TextButton } from '../../../components';
import useTheme from '../../../hooks/useTheme';

interface Contact {
  id: string;
  name: string;
  avatarUrl: string;
}

const contacts: Contact[] = [
  {
    id: '1',
    name: 'Javier Ruiz',
    avatarUrl:
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '2',
    name: 'Andres Alboleda',
    avatarUrl:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '3',
    name: 'Mabel Jaquez',
    avatarUrl:
      'https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '4',
    name: 'Enrique',
    avatarUrl:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '5',
    name: 'Tony perez',
    avatarUrl:
      'https://images.unsplash.com/photo-1628157588553-5eeea00af15c?q=80&w=1160&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
  {
    id: '6',
    name: 'Christan Vazquez',
    avatarUrl:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  },
];

const ShareVideos = () => {
  const [inputHeight, setInputHeight] = useState(
    Math.min(SIZES.BtnHeight, scale(90)),
  );
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [message, setMessage] = useState('');

  const { color } = useTheme();

  const handleShare = (contactId: string) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter(id => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleContentSizeChange = (event: any) => {
    const newHeight = Math.max(
      SIZES.BtnHeight,
      event.nativeEvent.contentSize.height,
    );
    setInputHeight(newHeight > scale(80) ? scale(40) : newHeight);
  };

  const translateY = useSharedValue(100);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: withTiming(translateY.value, { duration: 500 }) },
      ],
    };
  });

  useEffect(() => {
    if (selectedContacts.length > 0) {
      translateY.value = 0;
    } else {
      translateY.value = 100;
    }
  }, [selectedContacts.length]);

  return (
    <>
      <ShareToContacts
        contacts={contacts}
        selectedContactIds={selectedContacts}
        onShare={handleShare}
      />

      {selectedContacts.length === 0 && (
        <>
          <ShareToSocialMedia />
          <AdditionalOptions />
        </>
      )}

      {selectedContacts.length > 0 && (
        <Animated.View
          style={[
            animatedStyle,
            {
              height: responsiveFontSize(80),
              margin: responsiveFontSize(10),
              justifyContent: 'space-between',
            },
          ]}
        >
          <TextInput
            value={message}
            onChangeText={setMessage}
            placeholder="Escribe un mensaje..."
            placeholderTextColor={color}
            style={{
              height: inputHeight,
              width: SIZES.BtnWidth / 1.1,
              color: color,
            }}
            onContentSizeChange={handleContentSizeChange}
            multiline
          />
          <TextButton
            label="Enviar"
            onPress={() => console.log('Mensaje enviado')}
            sizeVariant="full"
            colorVariant="primary"
            labelStyle={{
              color: COLORS.dark,
            }}
            isSubmitting={false}
            LoaderColor="inherit"
          />
        </Animated.View>
      )}
    </>
  );
};

export default ShareVideos;
