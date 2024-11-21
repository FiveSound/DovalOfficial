import { memo } from 'react';
import { StyleSheet, View } from 'react-native';
import { RestauranteOrderType } from '../../../types/Restaurant.type';
import OrderStatus from './OrderStatus';
import { Home01Icon } from '../../../constants/IconsPro';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import { ArrowRight, FlexContainer, LineDivider, Typography } from '../../../components/custom';
import { Platform, TouchableOpacity,  } from '../../../components/native';
import i18next from '../../../Translate';

type Props = RestauranteOrderType & {
  onAccept: (orderID: number) => void;
  onReject: (orderID: number) => void;
  onSend: (orderID: number) => void;
  onAddTime: (orderID: number) => void;
  onComplete: (orderID: number) => void;
  onNavigateTo: (orderID: number) => void;
};

const Order = memo((props: Props) => {
  const { backgroundMaingrey, border } = useTheme();
  console.log(props);
  return (
   <>
    <TouchableOpacity onPress={() => props.onNavigateTo(props.orderID)}>
      <FlexContainer
        newStyle={[
          styles.container,

        ]}
      >
        <FlexContainer variant='row' newStyle={styles.header}>
          <View>
            <View style={[styles.group, { marginBottom: 2 }]}>
              <Typography variant='title'>#{props.orderID}</Typography>
              <View style={styles.point}></View>
              <Typography variant='SubDescription' numberOfLines={2} newStyle={styles.items}>{props.items}</Typography>
            </View>
            <View style={styles.group}>
              <FlexContainer variant='row' newStyle={{gap: SIZES.gapSmall, alignItems: 'center'}}>
              <Typography variant='title'>{props.creation_time}</Typography>
              <View style={styles.point}></View>
              <Typography variant='title'>{props.estimated_time}</Typography>
              </FlexContainer>
              <ArrowRight onPress={() => props.onNavigateTo(props.orderID)} />
            </View>
          </View>
        </FlexContainer>

        <FlexContainer variant='row' newStyle={styles.footer}>
          {props.status == 'PENDING' && (
            <TouchableOpacity
              onPress={() => props.onReject(props.orderID)}
              style={[styles.btn, styles.btnError]}
            >
              <Typography variant="H4title">{i18next.t('Reject')}</Typography>
            </TouchableOpacity>
          )}

          {props.status == 'PENDING' && (
            <TouchableOpacity
              onPress={() => props.onAccept(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Typography variant="H4title">{i18next.t('Accept')}</Typography>
            </TouchableOpacity>
          )}

          {props.riderID && props.status == 'IN_PROGRESS' && (
            <TouchableOpacity
              onPress={() => props.onSend(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Typography variant="H4title" newStyle={styles.btnText}>{i18next.t('Send with Doval')}</Typography>
            </TouchableOpacity>
          )}

          {!props.riderID && props.status == 'IN_PROGRESS' && (
            <TouchableOpacity
              onPress={() => props.onSend(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Typography variant="H4title" newStyle={styles.btnText}>{i18next.t('Send with my rider')}</Typography>
            </TouchableOpacity>
          )}

          {props.status == 'IN_PROGRESS' && (
            <TouchableOpacity
              onPress={() => props.onAddTime(props.orderID)}
              style={[styles.btn]}
            >
              <Typography variant="H4title">{i18next.t('Need more time?')}</Typography>
            </TouchableOpacity>
          )}

          {props.status == 'DELIVERED' && (
            <TouchableOpacity
              onPress={() => props.onComplete(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Typography variant="H4title" newStyle={styles.btnText}>{i18next.t('Verify this order')}</Typography>
            </TouchableOpacity>
          )}
        </FlexContainer>
        <OrderStatus status={props.status} />
      </FlexContainer>

    </TouchableOpacity>
    <LineDivider variant="secondary" lineStyle={styles.divider} />
    </>

  );
});

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapMedium,
    borderRadius: SIZES.gapSmall,
    marginHorizontal: SIZES.gapLarge,
    // borderWidth: SIZES.borderWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.gapSmall,
    justifyContent: 'space-between',
  },
  point: {
    marginHorizontal: SIZES.gapLarge,
    width: responsiveFontSize(8),
    height: responsiveFontSize(8),
    backgroundColor: COLORS.success,
    borderRadius: SIZES.gapMedium,
  },
  btn: {
    paddingVertical: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.radius2,
  },
  btnSuccess: {
    backgroundColor: COLORS.success,
  },
  btnError: {
    backgroundColor: 'rgba(244, 31, 82, 0.38)',
  },
  footer: {
    marginVertical: SIZES.gapSmall,
    flexDirection: 'row',
    gap: SIZES.gapMedium,
  },
  divider: {
    width: SIZES.width,
    alignSelf: 'center',
    marginVertical: SIZES.gapMedium,
  },
  items: {
    width: SIZES.width / 1.4,
  },
  btnText: {
    color: COLORS.dark,
  },
});

export default Order;
