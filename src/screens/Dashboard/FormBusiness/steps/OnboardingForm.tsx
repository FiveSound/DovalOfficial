import React from "react";
import { StyleSheet } from "react-native";
import { Header } from "../components";
import { useNavigation, Image } from "../../../../components/native";
import { useAppDispatch, useAppSelector } from "../../../../redux";
import { RootState } from "../../../../redux/store";
import { Container, FlexContainer, Hero, LoadingScreen, ScreenEmpty } from "../../../../components/custom";
import { Ilustrations } from "../../../../constants";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import { reloadApp } from "../../../../redux/slides/appSlice";
import i18next from "@/src/Translate";

const OnboardingVerified = () => {
  const navigation = useNavigation();
  const { user, isLoadingApp, businessVerified } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  const handleReload = () => {
    dispatch(reloadApp());
  };

  if (isLoadingApp) return <LoadingScreen />;

  if (user?.pending)
    return (
      <Container showBack={true} showHeader={true} label="Onboarding" style={styles.container}>
        <ScreenEmpty
          labelPart1={i18next.t('You are solicitud pendiente de revisión')}
          subLabel={i18next.t('Please wait for the review to be completed by the admin')}
          source={Ilustrations.GoodJob}
          ImgWidth={SIZES.width}
          ImgHeigth={SIZES.height / 3}
          ShowButton={true}
          onPress={handleReload}
          labelButton="Refresh app"
        />
      </Container>
    );

  if (businessVerified)
    return (
      <Container showBack={true} showHeader={true} label="Business Verified" style={styles.container}>
        <ScreenEmpty
          labelPart1={i18next.t('Welcome to the portal')}
          labelPart2={i18next.t('You can now access the portal')}
          subLabel={i18next.t('You can now access the portal')}
          labelStylePart1={styles.label}
          source={Ilustrations.GoodJob}
          ImgWidth={SIZES.width}
          ImgHeigth={SIZES.height / 3}
          ShowButton={true}
          onPress={handleReload}
          labelButton={i18next.t('Access portal')}
        />
      </Container>
    );
  return (
    <Container>
      <Header
        showProgressBar={false}
        currentStep={1}
        label=""
        goBack={() => navigation.goBack()}
        goNext={() => navigation.navigate("FormBusiness/Basic")}
      />

      <FlexContainer newStyle={styles.container}>
        <Image server={false} placeholderSource={Ilustrations.Hello} />
        <Hero
          label={i18next.t('Welcome to the Business Onboarding Process')}
          sublabel={i18next.t('Please fill in the following information to complete the process.')}
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        />
      </FlexContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: COLORS.success,
    ...FONTS.heading32,
  },
});
export default OnboardingVerified;
