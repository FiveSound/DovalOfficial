import React, { useEffect, useState } from 'react';
import { ScrollView, Text, useNavigation } from '../../../components/native';
import {
  Container,
  InputLabel,
  Rating,
  ScreenEmpty,
} from '../../../components/custom';
import { Ilustrations } from '../../../constants';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import styles from '../ConfirmOrder/styles';
import ThreeIcons from '../../../components/custom/Bar/ThreeIcons';
import { closeModalPin } from '../../../redux/slides/modalSlice';
import { useDispatch } from 'react-redux';
import i18next from '../../../Translate';

interface Props {}

const Cancel = (props: Props) => {
  const [counter, setCounter] = useState(3);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleNavegate = () => {
    navigation.navigate('TabsNavigation');
  };
  const handleNavigateToTracking = () => {
    const intervalId = setInterval(() => {
      setCounter(prevCounter => {
        if (prevCounter <= 1) {
          clearInterval(intervalId);
          handleNavegate();
          return 0;
        }
        return prevCounter - 1;
      });
    }, 1000);
  };

  useEffect(() => {
    handleNavigateToTracking();
    dispatch(closeModalPin());
  }, []);

  return (
    <Container
      showFooter={false}
      label={i18next.t('Oops! Your order has been canceled')}
      disabled={false}
      showHeader={true}
    >
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          flex: 1,
          paddingBottom: SIZES.height / 8,
        }}
      >
        <ScreenEmpty
          source={Ilustrations.CharcoPet}
          ImgWidth={SIZES.width}
          ImgHeigth={responsiveFontSize(261)}
          labelPart1={i18next.t('Oops!')}
          labelPart2={i18next.t('Your order has been canceled.')}
          subLabel={i18next.t(
            'We apologize for the inconvenience. Please try again.',
          )}
          labelStylePart1={[
            styles.labelThank,
            {
              color: COLORS.error,
            },
          ]}
          labelStylePart2={[
            styles.labelThank,
            {
              color: COLORS.error,
            },
          ]}
          sublabelStyles={styles.description}
          onPress={handleNavegate}
          labelButton={`${i18next.t('Go to explorar')} ${counter}`}
          ShowButton={true}
        />
      </ScrollView>
    </Container>
  );
};

export default Cancel;
