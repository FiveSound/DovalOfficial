import React from "react";
import { StyleSheet } from "react-native";
import Container from "../Container";
import { UserIcon, UserIconsStrike } from "../../../constants/IconsPro";
import Typography from "../Typography";
import Buttons from "../Buttons/Buttons";
import { COLORS, responsiveFontSize, SIZES } from "../../../constants/theme";
import { useTheme } from "../../../hooks";
import { useAppDispatch } from "../../../redux";
import { openSignupModal } from "../../../redux/slides/modalSlice";

export const SignupAlert = () => {
  const { Title } = useTheme();
  const dispatch = useAppDispatch();

  const handleSignup = () => {
    dispatch(openSignupModal());
  }

  return (
    <Container style={styles.container}>
      <UserIconsStrike width={responsiveFontSize(80)} height={responsiveFontSize(80)} color={Title}/>
      <Typography variant="H4title">
        Sign up for Doval for the best experience
      </Typography>
      <Buttons label="Sign up" onPress={handleSignup} />
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
});

export default SignupAlert;