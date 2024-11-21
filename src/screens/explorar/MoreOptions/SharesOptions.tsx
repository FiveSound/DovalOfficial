import React from 'react';
import { Share, Linking } from 'react-native';
import { FlexContainer, Icons, Typography } from '../../../components/custom';
import styles from './styles';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import {
  Image,
  ScrollView,
  TouchableOpacity,
} from '../../../components/native';
import * as Haptics from 'expo-haptics';
import { iconsNative } from '../../../constants';
import {
  CommentAdd02Icon,
  Download05Icon,
  Link02Icon,
} from '../../../constants/IconsPro';
import { IconsOptions } from './Options';

type Props = {};

const SharesOptions = (props: Props) => {
  const { Description } = useTheme();

  const shareContent = async (message: string) => {
    try {
      const result = await Share.share({
        message: message || 'Check this out!',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared with activity type: ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing content: ', error);
    }
  };

  const openApp = (url: string) => {
    Linking.canOpenURL(url)
      .then(supported => {
        if (supported) {
          Linking.openURL(url);
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      })
      .catch(err => console.error('An error occurred', err));
  };

  const IconsOptionsImg = (props: any) => {
    const { label, source, error, onPress } = props;
    const handlePress = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      onPress && onPress();
    };

    return (
      <TouchableOpacity
        style={styles.containerOptionsIcons}
        onPress={handlePress}
      >
        <Image source={source} style={styles.image} />
        <Typography
          variant="H4title"
          numberOfLines={1}
          newStyle={{
            color: error ? COLORS.error : Description,
            ...FONTS.semi12,
          }}
        >
          {label}
        </Typography>
      </TouchableOpacity>
    );
  };

  const availableOptions = [
    {
      label: 'WhatsApp',
      source: iconsNative.whatsapp,
      onPress: () => openApp('https://wa.me/?text=Check%20this%20out!'),
    },
    {
      label: 'Facebook',
      source: iconsNative.facebook,
      onPress: () => openApp('fb://feed'),
    },
    {
      label: 'Instagram',
      source: iconsNative.instagram,
      onPress: () => openApp('https://www.instagram.com/create/story'),
    },
    {
      label: 'Messenger',
      source: iconsNative.facebook,
      onPress: () => openApp('fb-messenger://share?link=https://example.com'),
    },
    {
      label: 'X',
      source: iconsNative.twitter,
      onPress: () =>
        openApp(
          'https://twitter.com/intent/tweet?text=Check%20this%20out!&url=https%3A%2F%2Fexample.com%2F&hashtags=nature,sunset&via=twitterdev&related=twitter%3ATwitter%20News,twitterapi%3ATwitter%20API%20News',
        ),
    },
  ];

  return (
    <FlexContainer newStyle={styles.containerOptions}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerOptionsIcons}
        horizontal={true}
      >
        <IconsOptions
          label="Download"
          icon={
            <Download05Icon
              color={Description}
              width={SIZES.icons * 1.6}
              height={SIZES.icons * 1.6}
            />
          }
          onPress={() => shareContent('Downloading content')}
        />
        <IconsOptions
          label="Copy link"
          icon={
            <Link02Icon
              color={Description}
              width={SIZES.icons * 1.2}
              height={SIZES.icons * 1.2}
            />
          }
          onPress={() => shareContent('Copying link')}
        />
        {availableOptions.map((option, index) => (
          <IconsOptionsImg
            key={index}
            label={option.label}
            source={option.source}
            onPress={option.onPress}
          />
        ))}
      </ScrollView>
    </FlexContainer>
  );
};

export default SharesOptions;
