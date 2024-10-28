import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as MediaLibrary from 'expo-media-library';
import { useTheme } from '../../../../hooks';
import { useAuth } from '../../../../context/AuthContext';
import i18next from '../../../../Translate';
import {
  GridViewIcon,
  LocationUser03Icon,
  UserMultiple02Icon,
} from '../../../../constants/IconsPro';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import Signup from '../../../auth/Signup';
import {
  FlexContainer,
  TextButton,
  Typography,
} from '../../../../components/custom';

const AlbumsPermission = ({ navigation }: any) => {
  const { color, Bg } = useTheme();
  const { user } = useAuth();
  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      navigation.navigate('TabsNavigation');
    } else {
      console.log(i18next.t('Location permission not granted'));
    }
  };

  const features = [
    {
      key: i18next.t('Publish your moments'),
      text: i18next.t(
        'Share your unique experiences through posts on your profile.',
      ),
      icon: (
        <UserMultiple02Icon
          width={SIZES.icons}
          height={SIZES.icons}
          color={COLORS.primary}
        />
      ),
    },
    {
      key: i18next.t('Upload recipes'),
      text: i18next.t(
        'Show your culinary creations, from the process to the final dish.',
      ),
      icon: (
        <LocationUser03Icon
          width={SIZES.icons}
          height={SIZES.icons}
          color={COLORS.primary}
        />
      ),
    },
    {
      key: i18next.t('Customize your content.'),
      text: i18next.t(
        'Bring your posts to life with images and videos that reflect your style.',
      ),
      icon: (
        <GridViewIcon
          width={SIZES.icons}
          height={SIZES.icons}
          color={COLORS.primary}
        />
      ),
    },
  ];

  if (!user) {
    return <Signup />;
  }

  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
        backgroundColor: Bg,
      }}
    >
      {/* <EmptyScreen label={i18next.t('Permission to Access Your Photos and Videos')}
        Lottiew
        sourceLottiew={Animation.EmptyFood}
        width={SIZES.width}
        height={SIZES.height / 3}
        /> */}

      <FlexContainer
        newStyle={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          padding: SIZES.padding,
        }}
      >
        {features.map(feature => (
          <FlexContainer
            key={feature.key}
            variant="row"
            newStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: SIZES.gapMedium,
              gap: SIZES.gapMedium,
            }}
          >
            {feature.icon ? feature.icon : null}
            <FlexContainer>
              <Typography variant="H4title">{feature.key}</Typography>
              <Typography variant="SubDescription">{feature.text}</Typography>
            </FlexContainer>
          </FlexContainer>
        ))}
        <TextButton
          label={i18next.t('Next')}
          sizeVariant="full"
          colorVariant="primary"
          onPress={requestPermission}
          labelStyle={{
            color: COLORS.dark,
            ...FONTS.h3,
          }}
        />
        <Typography variant="H4title">
          {i18next.t('You can change this option later in the Settings app.')}
        </Typography>
        {/* <RequireLegal /> */}
      </FlexContainer>
    </KeyboardAwareScrollView>
  );
};

export default AlbumsPermission;
