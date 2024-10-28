import { useQuery } from '@tanstack/react-query';
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getOrderIDService } from '../../../services/business';
import Product from '../components/Product';
// import Rating from "../../../components/Rating";
import OrderStatus from '../components/OrderStatus';
import LoaderMain from '../../explorar/components/LoaderMain';
import { Container } from '../../../components/custom';

type Props = {
  route: any;
};

const OrderID = (props: Props) => {
  const order = useQuery({
    queryKey: ['business-order-id'],
    queryFn: async () => getOrderIDService(props.route.params.orderID),
  });

  if (order.isLoading || order.isFetching) return <LoaderMain />;

  if (order.data) {
    return (
      <Container style={styles.container}>
        <ScrollView>
          <View style={styles.container}>
            <View
              style={[styles.group, { alignItems: 'center', marginBottom: 10 }]}
            >
              <Text
                style={{ fontSize: 30, fontWeight: 'bold', color: '#222222' }}
              >
                Orden no.
              </Text>
              <Text
                style={{ fontSize: 30, fontWeight: 'bold', color: '#FF5500' }}
              >
                #{order.data.id}
              </Text>
              <OrderStatus status={order.data.status} />
            </View>

            <View style={styles.box}>
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.title}>Items:</Text>
              </View>

              <FlatList
                data={order.data.items}
                renderItem={({ item }) => (
                  <Product
                    title={item.name}
                    cover={item.cover}
                    variants={item.variants}
                    quantity={item.quantity}
                  />
                )}
                keyExtractor={item => item.id.toString()}
              />

              <View style={styles.group}>
                <TouchableOpacity
                  style={[styles.button, { borderColor: '#4ADE80' }]}
                >
                  <Text style={[styles.textButton, { color: '#4ADE80' }]}>
                    Aceptar orden
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.button,
                    { backgroundColor: '#F41F52', borderColor: '#F41F52' },
                  ]}
                >
                  <Text style={[styles.textButton, { color: '#FFF' }]}>
                    Rechazar orden
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.box}>
              <View style={{ marginBottom: 15 }}>
                <Text style={styles.title}>Informacion cliente:</Text>
                <Text style={styles.text}>{order.data.client}</Text>
              </View>

              <View style={{ marginBottom: 15 }}>
                <Text style={styles.title}>Información del contacto:</Text>
                <Text style={styles.text}>{order.data.clientEmail}</Text>
                <Text style={styles.text}>{order.data.clientPhone}</Text>
              </View>

              {/* <View style={{ marginBottom: 15 }}>
              <Text style={styles.title}>Billing Address:</Text>
              <Text style={styles.text}>{order.data.clientDetailsLocation}</Text>
            </View> */}

              <View>
                <Text style={styles.title}>Dirección de envío:</Text>
                <Text style={styles.text}>
                  {order.data.clientDetailsLocation}
                </Text>
              </View>
            </View>

            <View style={styles.box}>
              <View style={{ marginBottom: 15 }}>
                <Text style={[styles.title]}>Informacion del repartidor:</Text>
                <Text style={styles.text}>
                  {order.data.rider ? order.data.rider : 'No disponible'}
                </Text>
                <Text style={styles.text}>
                  {order.data.riderOrders} Ordenes completadas
                </Text>
                <Text style={styles.text}>{order.data.riderPhone}</Text>
              </View>
              <View>
                <Text style={styles.title}>Clasificación del repartidor:</Text>
                {/* <Rating rating={order.data.riderScore} setRating={() => {}} /> */}
              </View>
            </View>

            <View style={styles.box}>
              <Text style={[styles.title, { marginBottom: 10 }]}>
                Informacion de pago:
              </Text>

              <View style={[styles.group, { justifyContent: 'space-between' }]}>
                <Text style={[styles.text]}>Items</Text>
                <Text style={[styles.text]}>
                  {order.data.resume.items_costs}
                </Text>
              </View>

              <View style={[styles.group, { justifyContent: 'space-between' }]}>
                <Text style={[styles.text]}>Variants</Text>
                <Text style={[styles.text]}>{order.data.resume.variants}</Text>
              </View>

              <View style={[styles.group, { justifyContent: 'space-between' }]}>
                <Text style={[styles.text]}>Delivery</Text>
                <Text style={[styles.text]}>
                  {order.data.resume.delivery_costs}
                </Text>
              </View>

              <View style={[styles.group, { justifyContent: 'space-between' }]}>
                <Text style={[styles.text]}>Service</Text>
                <Text style={[styles.text]}>
                  {order.data.resume.service_costs}
                </Text>
              </View>

              <View style={[styles.group, { justifyContent: 'space-between' }]}>
                <Text style={[styles.text]}>Discount</Text>
                <Text style={[styles.text]}>{order.data.resume.discount}%</Text>
              </View>

              <View
                style={[
                  styles.group,
                  { marginTop: 10, justifyContent: 'space-between' },
                ]}
              >
                <Text style={[styles.text, { fontSize: 18 }]}>
                  Pagado por el cliente
                </Text>
                <Text
                  style={[styles.text, { fontSize: 20, fontWeight: 'bold' }]}
                >
                  {order.data.resume.total}
                </Text>
              </View>
            </View>

            {/* <Text selectable>{JSON.stringify(order.data, null, 2)}</Text> */}
          </View>
        </ScrollView>
      </Container>
    );
  }
};

export default OrderID;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  text: {
    fontSize: 16,
    color: '#444',
  },
  box: {
    backgroundColor: '#FFF',
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  group: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    width: 170,
    padding: 10,
    borderWidth: 2,
    borderRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
