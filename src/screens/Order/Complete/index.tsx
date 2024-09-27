import React, { useEffect, useState } from "react";
import { ScrollView, Text, useNavigation } from "../../../components/native";
import { Container, InputLabel, Rating, ScreenEmpty , } from "../../../components/custom";
import { Ilustrations } from "../../../constants";
import { responsiveFontSize, SIZES } from "../../../constants/theme";
import styles from "../ConfirmOrder/styles";
import ThreeIcons from "../../../components/custom/Bar/ThreeIcons";
import i18next from "../../../Translate";

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
    labels={i18next.t("Submit Review")} 
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
        labelPart1={i18next.t("Congratulations!")}
        labelPart2={i18next.t("Your order has been delivered successfully.")}
        subLabel={i18next.t("We appreciate your preference and hope you enjoy your meal.")}
        labelStylePart1={styles.labelThank}
        labelStylePart2={styles.labelThank}
        sublabelStyles={styles.description}
        onPress={handleNavigateToTracking}
        labelButton={`${i18next.t("Go to Tracking")} (${counter})`}
        ShowButton={false}
      />
      <Rating rating={4}/>
      <InputLabel 
      placeholder={i18next.t("Enter your review")}
      />
      </ScrollView>
    </Container>
  );
};

export default Complete;
