import { memo } from 'react';
import { StyleSheet, Text, Image, View, TouchableOpacity } from 'react-native';
import { RestauranteOrderType } from '../../../types/Restaurant.type';
import OrderStatus from './OrderStatus';
import { Home01Icon } from '../../../constants/IconsPro';
import { responsiveFontSize, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import { LineDivider, LoadingScreen, Typography } from '../../../components/custom';
import { Platform } from '../../../components/native';

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
  return (
    <TouchableOpacity onPress={() => props.onNavigateTo(props.orderID)}>
      <View
        style={[
          styles.container,
          { backgroundColor: backgroundMaingrey, borderColor: border },
        ]}
      >
        <View style={styles.header}>
          <Home01Icon />
          <View>
            <View style={[styles.group, { marginBottom: 2 }]}>
              <Typography variant="H4title">#{props.orderID}</Typography>
              <View style={styles.point}></View>
              <Typography variant="H4title">{props.items}</Typography>
            </View>
            <View style={[styles.group, { marginBottom: 2 }]}>
              <Typography variant="H4title">{props.creation_time}</Typography>
              <View style={styles.point}></View>
              <Typography variant="H4title">{props.estimated_time}</Typography>
            </View>
            {/* <Text style={[styles.text, { marginBottom: 2 }]}>{props.items}</Text> */}
          </View>

          <OrderStatus status={props.status} />
        </View>

        <View style={styles.footer}>
          {props.status == 'PENDING' && (
            <TouchableOpacity
              onPress={() => props.onReject(props.orderID)}
              style={[styles.btn, styles.btnError]}
            >
              <Text style={{ color: '#F41F52', fontWeight: 'bold' }}>
                Rechazar
              </Text>
            </TouchableOpacity>
          )}

          {props.status == 'PENDING' && (
            <TouchableOpacity
              onPress={() => props.onAccept(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Typography variant="H4title">Aceptar</Typography>
            </TouchableOpacity>
          )}

          {props.riderID && props.status == 'IN_PROGRESS' && (
            <TouchableOpacity
              onPress={() => props.onSend(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Text style={{ color: '#4ADE80', fontWeight: 'bold' }}>
                Enviar con Doval
              </Text>
            </TouchableOpacity>
          )}

          {!props.riderID && props.status == 'IN_PROGRESS' && (
            <TouchableOpacity
              onPress={() => props.onSend(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Text style={{ color: '#4ADE80', fontWeight: 'bold' }}>
                Enviar con mi repartidor
              </Text>
            </TouchableOpacity>
          )}

          {props.status == 'IN_PROGRESS' && (
            <TouchableOpacity
              onPress={() => props.onAddTime(props.orderID)}
              style={[styles.btn]}
            >
              <Text style={{ color: '#FFF', fontWeight: 'bold' }}>
                ¿Necesitas mas tiempo?
              </Text>
            </TouchableOpacity>
          )}

          {props.status == 'DELIVERED' && (
            <TouchableOpacity
              onPress={() => props.onComplete(props.orderID)}
              style={[styles.btn, styles.btnSuccess]}
            >
              <Text style={{ color: '#4ADE80', fontWeight: 'bold' }}>
                Verificar esta orden
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <LineDivider variant="secondary" lineStyle={styles.divider} />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapMedium,
    borderRadius: SIZES.gapSmall,
    marginHorizontal: SIZES.gapLarge,
    borderWidth: SIZES.borderWidth,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
  cover: {
    width: 50,
    height: 50,
    objectFit: 'cover',
    borderRadius: 10,
  },
  group: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  point: {
    marginHorizontal: SIZES.gapLarge,
    width: responsiveFontSize(8),
    height: responsiveFontSize(8),
    backgroundColor: '#FF9700',
    borderRadius: SIZES.gapMedium,
  },
  btn: {
    paddingVertical: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.gapMedium,
  },
  btnSuccess: {
    backgroundColor: 'rgba(74, 222, 128, 0.38)',
  },
  btnError: {
    backgroundColor: 'rgba(244, 31, 82, 0.38)',
  },
  footer: {
    marginTop: SIZES.gapSmall,
    flexDirection: 'row',
    gap: SIZES.gapMedium,
  },
  divider: {
    width: SIZES.width,
    alignSelf: 'center',
    marginVertical: SIZES.gapMedium,
  },
});

export default Order;
