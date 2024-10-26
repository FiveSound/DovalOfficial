import React from "react";
import { StyleSheet } from "react-native";
import { Header } from "./components";
import { useNavigation , Image} from "../../../components/native";
import { useAppDispatch, useAppSelector } from "../../../redux";
import { RootState } from "../../../redux/store";
import { Container, FlexContainer, Hero, ScreenEmpty } from "../../../components/custom";
import { Ilustrations } from "../../../constants";
import { SIZES } from "../../../constants/theme";
import { reloadApp } from "../../../redux/slides/appSlice";


const OnboardingVerified = () => {
  const navigation = useNavigation()
  const { user } = useAppSelector((state: RootState) => state.auth)
  const dispatch = useAppDispatch();

  const handleReload = () => {
    dispatch(reloadApp());
  };

  if (user?.pending) return <ScreenEmpty
    labelPart1="You are solicitud pendiente de revisión"
    subLabel="Please wait for the review to be completed by the admin"
    source={Ilustrations.GoodJob}
    ImgWidth={SIZES.width}
    ImgHeigth={SIZES.height / 3}
    ShowButton={true}
    onPress={handleReload}
    labelButton="Refresh"
  />

  return (
    <Container>
      <Header
        label="Onboarding Verified"
        labelButtons="Next"
        onPress={() => navigation.navigate('FormVerified')}
        showBackPersonal={false}
        onPressBack={() => navigation.goBack()}
      />
  <FlexContainer newStyle={styles.container}>
  <Image
        server={false}
        placeholderSource={Ilustrations.Hello}
      />
      <Hero
        label="Welcome to the Business Onboarding Process"
        sublabel="Please fill in the following information to complete the process."
        style={{
          justifyContent: 'center',
          alignItems: 'center'
        }}
      />
  </FlexContainer>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
export default OnboardingVerified;
