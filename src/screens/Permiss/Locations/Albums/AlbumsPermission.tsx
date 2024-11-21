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
  Buttons,
  Container,
  FlexContainer,
  ScreenEmpty,
  TextButton,
  Typography,
} from '../../../../components/custom';
import { RootState } from '../../../../redux/store';
import { useAppDispatch, useAppSelector } from '../../../../redux';
import { Ilustrations } from '../../../../constants';
import { Image } from '../../../../components/native';
import styles from '../../../../components/custom/AuthLayout/styles';
import { closeUploadPermissionModal } from '../../../../redux/slides/modalSlice';

const AlbumsPermission = () => {

  const { isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();
  const requestPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status === 'granted') {
      dispatch(closeUploadPermissionModal())
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

  if (!isAuthenticated) {
    return <Signup />;
  }

  return (
    <Container
    label='Permission to Access Your Photos and Videos'
    style={styles.container}
    >
    <Image 
      placeholderSource={Ilustrations.CharcoPet}
      server={false}
      style={{
        width: SIZES.width,
        height: SIZES.height / 3,
      }}
      />

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
            newStyle={styles.row}
          >
            {feature.icon ? feature.icon : null}
            <FlexContainer>
              <Typography variant='subtitle'>{feature.key}</Typography>
              <Typography variant='H4title'>{feature.text}</Typography>
            </FlexContainer>
          </FlexContainer>
        ))}
        <Buttons
          label={i18next.t('Next')}
          color='primary'
          onPress={requestPermission}
        />
        <Typography variant="H4title">
          {i18next.t('You can change this option later in the Settings app.')}
        </Typography>
        {/* <RequireLegal /> */}
      </FlexContainer>
    </Container>
  );
};

export default AlbumsPermission;
