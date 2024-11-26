import React, { useState } from 'react';
import { StyleSheet, Modal, View } from 'react-native';
import { Container, Hero, Typography } from '@/src/components/custom';
import i18next from '@/src/Translate';
import { COLORS, SIZES } from '@/src/constants/theme';
import { SafeAreaView, TouchableOpacity } from '@/src/components/native';
import WebView from 'react-native-webview';

type Props = {};

const Support = (props: Props) => {
  const [isWebViewVisible, setIsWebViewVisible] = useState(false);
  const uri = 'https://tawk.to/chat/6745db914304e3196ae90120/1idke3bq0';
  const handleContactPress = () => {
    setIsWebViewVisible(true);
  };

  const handleCloseWebView = () => {
    setIsWebViewVisible(false);
  };

  return (
    <Container 
      label={i18next.t('Support')}
      showHeader={true}
      style={styles.container}
    >
      <Hero 
        label='Hola! ¿Cómo podemos ayudarte?'
        sublabel='Estamos aquí para ayudarte con cualquier pregunta o problema que puedas tener.'
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleContactPress}
      >
        <Typography variant='subtitle' newStyle={styles.buttonText}>
            {i18next.t('Chatea con nosotros')}
        </Typography>
      </TouchableOpacity>

      {isWebViewVisible && (
        <Modal
          animationType="slide"
          transparent={false}
          visible={isWebViewVisible}
          onRequestClose={handleCloseWebView}
        >
          <SafeAreaView style={styles.webViewContainer}>
            <TouchableOpacity onPress={handleCloseWebView} style={styles.closeButton}>
              <Typography variant='subtitle'>{i18next.t('Cerrar')}</Typography>
            </TouchableOpacity>
            <WebView
              source={{ uri: uri}}
              style={styles.webView}
            />
          </SafeAreaView>
        </Modal>
      )}
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
    alignItems: 'center',
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SIZES.gapSmall,
    borderRadius: SIZES.radius,
    marginTop: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
  },
  buttonText: {
    textAlign: 'center',
    color: COLORS.dark,
  },
  webViewContainer: {
    flex: 1,
  },
  closeButton: {
    padding: SIZES.gapSmall,
    alignItems: 'center',
  },
  webView: {
    flex: 1,
  },
});

export default Support;