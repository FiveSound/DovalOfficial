import React from "react";
import { StyleSheet } from "react-native";
import Container from "../Container";
import { ShieldUserIcon, UserIcon, UserIconsStrike } from "../../../constants/IconsPro";
import Typography from "../Typography";
import Buttons from "../Buttons/Buttons";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../constants/theme";
import { useTheme } from "../../../hooks";
import { useAppDispatch } from "../../../redux";
import { openSignupModal } from "../../../redux/slides/modalSlice";
import i18next from "@/src/Translate";

export const SignupAlert = () => {
  const { Title } = useTheme();
  const dispatch = useAppDispatch();

  const handleSignup = () => {
    dispatch(openSignupModal());
  }

  return (
    <Container style={styles.container}>
      <ShieldUserIcon width={responsiveFontSize(80)} height={responsiveFontSize(80)} color={Title}/>
      <Typography variant='title' newStyle={styles.title}>
        {i18next.t('Sign up or login for Doval for the best experience')}
      </Typography>
      <Buttons label={i18next.t('Sign up or login')} onPress={handleSignup} />
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
  title: {
    textAlign: 'center',
    ...FONTS.heading24,
    width: '90%'
  }
});

export default SignupAlert;