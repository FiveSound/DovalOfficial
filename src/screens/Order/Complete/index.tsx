import React, { useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
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
import { useAppDispatch, useAppSelector } from '../../../redux';
import { closeModalPin } from '../../../redux/slides/modalSlice';
import { useForm, Controller } from 'react-hook-form';
import { setReviewService } from '../../../services/orders';

interface Props {}

interface Review {
  rating: number;
  review: string;
  orderID: number | undefined;
}

  type FormValues = {
  orderID: number | undefined;
  rating: number;
  review: string;
};

const Complete = (props: Props) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { orderID } = useAppSelector(state => state.navigation);
  console.log(orderID, 'orderID from navigation')

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      orderID: orderID,
      rating: 0,
      review: '',
    },
  });

  useEffect(() => {
    dispatch(closeModalPin());
  }, [dispatch]);

  const handlePress = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'MyTabs' }],
    });
  };

  const onSubmit = async (data: FormValues) => {
    try {
      const reviewBody: Review = {
        orderID: orderID,
        rating: data.rating,
        review: data.review
      };
      await setReviewService(reviewBody);
      reset();
      Alert.alert(i18next.t('Success'), i18next.t('Your review has been submitted.'), [{
        text: 'OK',
        onPress: () => {
          handlePress();
        }
      }]);
     
    } catch (error) {
      console.error(error);
      Alert.alert(i18next.t('Error'), i18next.t('There was an issue submitting your review. Please try again.'));
    }
  };

  return (
    <Container
      showFooter={true}
      labels={i18next.t('Submit Review')}
      disabled={isSubmitting}
      loading={isSubmitting}
      onPressButtons={handleSubmit(onSubmit)}
      variant='secondary'
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
          paddingHorizontal: 20,
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
        <Controller
          control={control}
          name="rating"
          rules={{ required: true, min: 1 }}
          render={({ field: { onChange, value } }) => (
            <Rating
              rating={value}
              setRating={onChange}
            />
          )}
        />
        <Controller
          control={control}
          name="review"
          rules={{ required: true, maxLength: 500 }}
          render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
            <>
              <InputLabel
                placeholder={i18next.t('Add a comment')}
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
                multiline
              />
  
            </>
          )}
        />
      </ScrollView>
    </Container>
  );
};

export default Complete;