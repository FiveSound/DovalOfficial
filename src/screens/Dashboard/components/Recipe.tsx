import { memo } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CLOUDFRONT } from '../../../services';
import { Chip } from '../../../components/custom';
type Props = {
  id: number;
  onDelete: (id: number, name: string) => void;
  name: string;
  thumbnail: string;
  description: string;
  complete: boolean;
  price: string;
  discount: number;
};

const Recipe = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Image
        style={{
          width: 60,
          height: 60,
          backgroundColor: 'white',
          objectFit: 'cover',
        }}
        source={{
          uri: `${CLOUDFRONT}${props.thumbnail}`,
        }}
      />
      <View>
        <Text style={[styles.text, { fontSize: 15, fontWeight: 'bold' }]}>
          {props.name}
        </Text>

        <Text style={[styles.text, { fontSize: 13, color: '#DDD' }]}>
          {props.description}
        </Text>
        <View
          style={{
            marginTop: 3,
            flexDirection: 'row',
            gap: 10,
          }}
        >
          <Text style={[styles.text, { fontSize: 13, fontWeight: 'bold' }]}>
            {props.price}
          </Text>
          <Text style={[styles.text, { fontSize: 13, fontWeight: 'bold' }]}>
            Discount: {props.discount}%
          </Text>
        </View>
      </View>

      <View>
        {props.complete && <Chip title="Live" color="green" size="small" />}
        {!props.complete && <Chip title="Draft" color="red" size="small" />}
      </View>
    </View>
    <View style={{ marginTop: 5, flexDirection: 'row', gap: 20 }}>
      <TouchableOpacity onPress={() => props.onDelete(props.id, props.name)}>
        <Text style={[styles.text, { fontWeight: 'bold', color: 'red' }]}>
          Eliminar
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ opacity: 0.5 }} disabled>
        <Text style={[styles.text, { fontWeight: 'bold' }]}>Editar</Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default memo(Recipe);

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#222222',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    color: '#FFF',
  },
});
