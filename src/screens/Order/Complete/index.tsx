import React, { useEffect, useState } from 'react';
import { ScrollView, Text, useNavigation } from '../../../components/native';
import {
  Container,
  InputLabel,
  Rating,
  ScreenEmpty,
} from '../../../components/custom';
import { Ilustrations } from '../../../constants';
import { responsiveFontSize, SIZES } from '../../../constants/theme';
import styles from '../ConfirmOrder/styles';
import ThreeIcons from '../../../components/custom/Bar/ThreeIcons';
import i18next from '../../../Translate';
import { useAppDispatch } from '../../../redux';
import { closeModalPin } from '../../../redux/slides/modalSlice';

interface Props {}

const Complete = (props: Props) => {
  const [counter, setCounter] = useState(3);
  const [rating, setRating] = useState(0);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(closeModalPin());
  }, [dispatch]);

  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    });
  };

  return (
    <Container
      showFooter={true}
      labels={i18next.t('Submit Review')}
      disabled={false}
      onPress={handlePress}
    >
      <ThreeIcons
        showBack={false}
        showRightIcons={false}
        onPress={handlePress}
      />
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'center',
          flex: 1,
          paddingBottom: SIZES.height / 8,
        }}
      >
        <ScreenEmpty
          source={Ilustrations.GoodJob}
          ImgWidth={SIZES.width}
          ImgHeigth={SIZES.height / 3}
          labelPart1={i18next.t('Congratulations!')}
          labelPart2={i18next.t('Your order has been delivered successfully.')}
          subLabel={i18next.t(
            'We appreciate your preference and hope you enjoy your meal.',
          )}
          labelStylePart1={styles.labelThank}
          labelStylePart2={styles.labelThank}
          ShowButton={false}
        />
        <Rating rating={rating} setRating={setRating} />
        <InputLabel placeholder={i18next.t('Add a comment')} />
      </ScrollView>
    </Container>
  );
};

export default Complete;
