import React, { useEffect, useState } from "react"
import { Container, ScreenEmpty} from "../../../components/custom"
import { Ilustrations } from "../../../constants"
import { SIZES } from "../../../constants/theme"
import styles from "./styles"
import { useTheme } from "../../../hooks"
import { useNavigation } from "../../../components/native"

interface Props {
    route: {
        params: { orderID: number };
      };
    
}
const ConfirmOrder = ({ route }: Props) => {
    const { orderID } = route.params
    const { Title } = useTheme();
    const navigation = useNavigation()
    const [counter, setCounter] = useState(3);


    const handleNavigateToTracking = () => {
      const intervalId = setInterval(() => {
          setCounter((prevCounter) => {
              if (prevCounter <= 1) {
                  clearInterval(intervalId);
                  navigation.navigate("Tracking", {orderID : orderID});
                  return 0;
              }
              return prevCounter - 1;
          });
      }, 1000);
  };

  useEffect(() => {
    handleNavigateToTracking();
}, []);



        return (
            <Container>
                    <ScreenEmpty 
                    source={Ilustrations.GoodJob}
                    ImgWidth={SIZES.width}
                    ImgHeigth={SIZES.height / 2.4}
                    labelPart1="Thank you"
                    labelPart2=" for your order"
                    subLabel="We are excited to prepare your meal for you! You can follow the status of your order in real time."
                    labelStylePart1={styles.labelThank}
                    labelStylePart2={[styles.label,{
                        color: Title
                    }]}
                    sublabelStyles={styles.description}
                    labelButton={`Go to Tracking in (${counter})`}
                />
            </Container>
        )
    }


export default ConfirmOrder