import React, { useEffect, useState } from 'react';
import { Container, ScreenEmpty } from '../../../components/custom';
import { Ilustrations } from '../../../constants';
import { SIZES } from '../../../constants/theme';
import styles from './styles';
import { useTheme } from '../../../hooks';
import { useNavigation } from '../../../components/native';
import i18next from '../../../Translate';

interface Props {
  route: {
    params: { orderID: number };
  };
}
const ConfirmOrder = ({ route }: Props) => {
  const { orderID } = route.params;
  
  const { Title } = useTheme();
  const navigation = useNavigation();
  const [counter, setCounter] = useState(3);

  const handleNavigateToTracking = () => {
    const intervalId = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter <= 1) {
          clearInterval(intervalId);
          navigation.navigate('Tracking', { orderID: orderID });
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
        labelPart1={i18next.t('Thank you')}
        labelPart2={i18next.t(' for your order')}
        subLabel={i18next.t(
          'We are excited to prepare your meal for you! You can follow the status of your order in real time.',
        )}
        labelStylePart1={styles.labelThank}
        labelStylePart2={[
          styles.label,
          {
            color: Title,
          },
        ]}
        sublabelStyles={styles.description}
        labelButton={`${i18next.t('Go to Tracking')} (${counter})`}
      />
    </Container>
  );
};

export default ConfirmOrder;
