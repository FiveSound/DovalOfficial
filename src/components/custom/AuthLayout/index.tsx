import React, { ReactNode } from "react";
import { KeyboardAwareScrollView, View, Image } from "../../native";
import styles from "./styles";

type AutoLayoutProps = {
  children: ReactNode;
  scrollEnabled?: boolean;
}

const AuthLayout = ({ children, scrollEnabled = true }: AutoLayoutProps) => {
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        horizontal={false}
        scrollEnabled={scrollEnabled}
        enableAutomaticScroll={true}
        showsVerticalScrollIndicator={false}
        viewIsInsideTabBar={false}
        contentContainerStyle={styles.keyboardAvoidingView}
      >
        <View style={styles.logoContainer}>
          <Image
            source={require('../../../../assets/logo.png')}
            contentFit="contain"
            style={styles.logo}
          />
        </View>
        {children}
      </KeyboardAwareScrollView>
    </View>
  );
};

export default AuthLayout;