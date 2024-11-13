import { StyleSheet } from 'react-native';
import { TypeCart } from '../../../../types/cart/Cart.types';
import {
  Avatars,
  Box,
  FlexContainer,
  Icons,
  LineDivider,
  Typography,
} from '../../../../components/custom';
import { View, Image, Text, ScrollView } from '../../../../components/native';
import { responsiveFontSize, SIZES } from '../../../../constants/theme';
import { CLOUDFRONT } from '../../../../services';
import { useTheme } from '../../../../hooks';
import i18next from '../../../../Translate';

interface PropsOrderList {
  data: TypeCart[][];
}

type OrderType = {
  title: string;
  cover: string;
  recipe: string;
  row: TypeCart[];
  variants: string;
};

const Order = (props: OrderType) => {
  const { border } = useTheme();
  return (
    <Box title={props.title} sucess={true}>
      <FlexContainer style={styles.header}>
        <FlexContainer newStyle={styles.subheader}>
          <Avatars size="medium" source={`${CLOUDFRONT}${props.cover}`} />
          <View style={{
            backgroundColor: 'transparent',
          }}>
            <Typography variant="H4title" newStyle={styles.title}>
              {props.recipe}
            </Typography>
            <Typography variant="H4title" newStyle={styles.title}>
              {props.variants}
            </Typography>
          </View>
        </FlexContainer>
        {/* <Icons
          appendIcons={
            <Typography variant="H4title">{i18next.t('Change')}</Typography>
          }
        /> */}
      </FlexContainer>

      <LineDivider lineStyle={{ marginVertical: responsiveFontSize(10) }} />
    </Box>
  );
};

const OrderList = (props: PropsOrderList) => {
  return (
    <>
      {props.data.map((row, index) => (
        <Order
          key={row.cartID}
          title={index === 0 ? 'Details order' : ''}
          recipe={row.recipe}
          cover={row.cover}
          variants={row.variants}
          row={row}
        />
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  subheader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapLarge,
    backgroundColor: 'transparent',
  },
  title: {
    width: SIZES.width / 2,
  },
  subtitle: {
    width: SIZES.width / 2,
  },
});

export default OrderList;
