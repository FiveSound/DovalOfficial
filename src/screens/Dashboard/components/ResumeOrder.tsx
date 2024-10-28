import { StyleSheet, Text, View, Image } from 'react-native';
import { RestauranteSearchOrderType } from '../../../types/Restaurant.type';
import OrderStatus from './OrderStatus';

const ResumeOrder = (props: RestauranteSearchOrderType) => (
  <View style={styles.container}>
    {/* {props.status == "PENDING" && <Image style={styles.cover} source={icons.Pending} />}
    {props.status == "CANCELED" && <Image style={styles.cover} source={icons.Canceled} />}
    {props.status == "IN_PROGRESS" && <Image style={styles.cover} source={icons.InProgress} />}
    {props.status == "DELIVERED" && <Image style={styles.cover} source={icons.Delivered} />}
    {props.status == "COMPLETED" && <Image style={styles.cover} source={icons.Completed} />} */}

    <View>
      <Text style={[styles.text, { fontSize: 20, fontWeight: 'bold' }]}>
        ID: #{props.orderID}
      </Text>
      <Text style={[styles.text]}>{props.creation_time}</Text>
      <Text style={[styles.text, { marginVertical: 3, color: '#DDD' }]}>
        Client: {props.client}
      </Text>
    </View>

    <OrderStatus status={props.status} />
  </View>
);
export default ResumeOrder;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    backgroundColor: '#222222',
  },
  cover: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 10,
  },
  text: {
    color: '#FFF',
  },
});
