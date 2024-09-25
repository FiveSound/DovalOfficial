import React, { useEffect, useState } from "react";
import { ScrollView, Text, useNavigation } from "../../../components/native";
import { Container, InputLabel, Rating, ScreenEmpty , } from "../../../components/custom";
import { Ilustrations } from "../../../constants";
import { responsiveFontSize, SIZES } from "../../../constants/theme";
import styles from "../ConfirmOrder/styles";
import ThreeIcons from "../../../components/custom/Bar/ThreeIcons";

interface Props {}

const Complete = (props: Props) => {
  const [counter, setCounter] = useState(3);
  const navigation = useNavigation()

  const handleNavigateToTracking = () => {
    const intervalId = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    handleNavigateToTracking();
  }, []);

  const handleNavegate = () => {
    navigation.navigate('TabsNavigation')
  }

  return (
    <Container 
    showFooter={true} 
    labels="Submit Review" 
    disabled={false}
    >
      <ThreeIcons 
      showBack={false} 
      showRightIcons={false}
      onPress={handleNavegate}
      />
      <ScrollView
      contentContainerStyle={{
        justifyContent: 'center',
        flex: 1,
        paddingBottom: SIZES.height /  8
      }}>
      <ScreenEmpty
        source={Ilustrations.GoodJob}
        ImgWidth={SIZES.width}
        ImgHeigth={responsiveFontSize(261)}
        labelPart1="Congratulations!"
        labelPart2="Your order has been delivered successfully."
        subLabel="We appreciate your preference and hope you enjoy your meal."
        labelStylePart1={styles.labelThank}
        labelStylePart2={styles.labelThank}
        sublabelStyles={styles.description}
        onPress={handleNavigateToTracking}
        labelButton={`Go to Tracking (${counter})`}
        ShowButton={false}
      />
      <Rating rating={4}/>
      <InputLabel 
      placeholder="Enter your review"/>
      </ScrollView>
    </Container>
  );
};

export default Complete;
