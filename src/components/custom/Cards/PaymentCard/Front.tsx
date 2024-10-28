import { View, Text, StyleSheet, Image } from 'react-native';
import { iconsNative } from '../../../../constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useTheme } from '../../../../hooks';
import { FONTS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';

type Props = {
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
  namecard: string;
};

const Front = (props: Props) => {
  const { backgroundMaingrey, borderInput, BackgroundMain, Title } = useTheme();
  return (
    <LinearGradient
      style={[styles.background, { borderColor: borderInput }]}
      start={{ x: 0.1, y: -0.3 }}
      colors={[backgroundMaingrey, borderInput, BackgroundMain]}
    >
      <FlexContainer newStyle={styles.container}>
        <View>
          <Typography variant="title" newStyle={styles.title}>
            {props.namecard === '' ? 'Card name' : props.namecard}
          </Typography>
          <Typography variant="subtitle" newStyle={styles.subtitle}>
            #### #### #### {props.last4}
          </Typography>
          <Typography variant="H4title" newStyle={styles.subtitle}>
            {props.expiryMonth} /{props.expiryYear}
          </Typography>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <View
            style={{
              marginBottom: responsiveFontSize(2),
              flexDirection: 'row',
              gap: responsiveFontSize(10),
            }}
          >
            <Image
              style={{
                width: responsiveFontSize(25),
                height: responsiveFontSize(30),
              }}
              source={iconsNative.Contactless}
              tintColor={Title}
            />
            {/* <Image
            style={{ width: 55, height: 30 }}
            source={icons.GooglePay}
          /> */}
          </View>
          <Image
            style={{
              marginBottom: responsiveFontSize(75),
              width: responsiveFontSize(30),
              height: responsiveFontSize(30),
            }}
            source={iconsNative.cardTouch}
            tintColor={Title}
          />
          {props.brand == 'Visa' && (
            <Image
              style={{
                width: responsiveFontSize(130),
                height: responsiveFontSize(40),
              }}
              source={iconsNative.visa}
            />
          )}
          {props.brand == 'MasterCard' && (
            <Image
              style={{
                width: responsiveFontSize(65),
                height: responsiveFontSize(40),
              }}
              source={iconsNative.masterCard}
            />
          )}

          {props.brand == 'AmericanExpress' && (
            <Image
              style={{
                width: responsiveFontSize(40),
                height: responsiveFontSize(40),
              }}
              source={iconsNative.amex}
            />
          )}
          {/* <Text>{props.brand}</Text> */}
        </View>
      </FlexContainer>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SIZES.gapLarge,
  },
  text: {
    marginBottom: SIZES.gapSmall,
  },
  title: {
    ...FONTS.heading24,
  },
  subtitle: {
    ...FONTS.semi18,
  },
  background: {
    borderRadius: SIZES.gapSmall,
  },
});

export default Front;
