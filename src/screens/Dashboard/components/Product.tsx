import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { CLOUDFRONT } from '../../../services';
import { Image, Text } from '../../../components/native';
import { COLORS, responsiveFontSize } from '../../../constants/theme';
import { Typography } from '../../../components/custom';

type Props = {
  title: string;
  cover: string;
  variants: string;
  quantity: number;
};

const Product = memo((props: Props) => {
  return (
    <View>
      <View style={styles.body}>
        <Image
          style={styles.cover}
          placeholderSource={`${CLOUDFRONT}${props.cover}`}
        />
        <View style={styles.variants}>
          <Typography variant='title'>{props.title}</Typography>
          <Typography variant='H4title'>{props.variants}</Typography>
        </View>
        <Typography variant='subtitle' newStyle={{
          color: COLORS.primary
        }}>
          Cant. {props.quantity}
        </Typography>
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
    minWidth: responsiveFontSize(160),
    maxWidth: responsiveFontSize(160),
  }
});

export default Product;
