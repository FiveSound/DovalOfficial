import React, { ReactNode } from 'react';
import { KeyboardAwareScrollView, View, Image } from '../../native';
import styles from './styles';
import { useTheme } from '../../../hooks';

type AutoLayoutProps = {
  children: ReactNode;
  scrollEnabled?: boolean;
};

const AuthLayout = ({ children, scrollEnabled = true }: AutoLayoutProps) => {
  const { BackgroundMain } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: BackgroundMain }]}>
      <KeyboardAwareScrollView
        horizontal={false}
        scrollEnabled={scrollEnabled}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
        viewIsInsideTabBar={false}
        contentContainerStyle={styles.keyboardAvoidingView}
      >
        {/* <View style={styles.logoContainer}>
          <Image
            placeholderSource={require('../../../../assets/logo.png')}
            server={false}
            contentFit='contain'
            style={styles.logo}
          />
        </View> */}
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthLayout;
