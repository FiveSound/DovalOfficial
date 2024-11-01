import React, { useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import * as Location from 'expo-location';
import i18next from '../../../Translate';
import { FONTS, SIZES } from '../../../constants/theme';
import {
  Container,
  FlexContainer,
  Hero,
  Typography,
} from '../../../components/custom';
import { Ilustrations } from '../../../constants';
import features from './features';
import { Image, ScrollView, useNavigation } from '../../../components/native';
import { useAppDispatch } from '../../../redux';
import { closeLocationModal } from '../../../redux/slides/modalSlice';
import { reloadApp } from '../../../redux/slides/appSlice';

const Locations = () => {
  const [permissionGranted, setPermissionGranted] = useState(false);
  const [permissionError, setPermissionError] = useState(true);
  const dispatch = useAppDispatch();
  const requestPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setPermissionGranted(true);
        dispatch(closeLocationModal());
        dispatch(reloadApp());
      } else {
        setPermissionError(false);
      }
    } catch (error) {
      console.error('Error al solicitar permisos de ubicación:', error);
    }
  };

  return (
    <Container
      useSafeArea={true}
      showHeader={false}
      showFooter={true}
      labels={i18next.t('Next')}
      onPressButtons={requestPermission}
      showSkip={true}
      showTwoIconsLabel={false}
      label={i18next.t('Location Permit Required')}
      style={styles.container}
    >
      <ScrollView
        scrollEnabled={false}
        contentContainerStyle={styles.containerScroll}
      >
        <FlexContainer>
          <Image
            source={Ilustrations.CharcoPet}
            server={false}
            style={styles.Img}
            contentFit="cover"
          />
        </FlexContainer>
        <FlexContainer newStyle={styles.flexContainer}>
          <Hero
            label={i18next.t('Location Permit Required')}
            sublabel={i18next.t(
              'We will use your location to improve your experience and improve our delivery services.',
            )}
          />
          {features.map(feature => (
            <FlexContainer
              key={feature.key}
              variant="row"
              newStyle={styles.featureContainer}
            >
              {feature.icon ? feature.icon : null}
              <FlexContainer newStyle={styles.featureTextContainer}>
                <Typography variant="subtitle">{feature.key}</Typography>
                <Typography variant="SubDescription">{feature.text}</Typography>
              </FlexContainer>
            </FlexContainer>
          ))}
          <Typography variant="subtitle">
            {i18next.t(
              'You can change this anytime in Settings and privacy > Privacy > Location > Doval.',
            )}
          </Typography>
        </FlexContainer>
      </ScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: SIZES.gapLarge,
  },
  containerScroll: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelStylePart1: {
    textAlign: 'center',
    ...FONTS.LargeTitle,
  },
  flexContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
  },
  featureContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SIZES.gapMedium,
    gap: SIZES.gapMedium,
  },
  featureTextContainer: {
    width: SIZES.width / 1.2,
  },
  Img: {
    width: SIZES.width,
    height: SIZES.height / 3,
  },
});

export default Locations;
