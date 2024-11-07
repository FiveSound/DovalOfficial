import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CLOUDFRONT } from '../../../services';
import { Image, Text } from '../../../components/native';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { Typography } from '../../../components/custom';

type Props = {
  title: string;
  cover: string;
  variants: string;
  quantity: number;
};

const Product = memo((props: Props) => {
  console.log('props', props);
  return (
    <View>
      <Typography variant='subtitle' newStyle={{
        color: COLORS.primary
      }}>
        Cant. {props.quantity}
      </Typography>
      <View style={styles.body}>
        <Image
          style={styles.cover}
          placeholderSource={`${CLOUDFRONT}${props.cover}`}
        />
        <View style={styles.variants}>
          <Typography variant='title'>{props.title}</Typography>
          <Typography variant='H4title'>{props.variants}</Typography>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  cover: {
    width: responsiveFontSize(80),
    height: responsiveFontSize(80),
    borderRadius: responsiveFontSize(10),
  },
  body: {
    flexDirection: 'row',
    gap: responsiveFontSize(10),
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  variants: {
    // minWidth: responsiveFontSize(160),
    maxWidth: SIZES.width / 1.4,
  }
});

export default Product;
