import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Product from '../../../components/Product';
import { Typography } from '../../../../../components/custom';
import { useTheme } from '../../../../../hooks';
import { SIZES } from '../../../../../constants/theme';


interface Item {
  id: number;
  name: string;
  cover: string;
  description: string[];
  quantity: number;
}

interface OrderItemsProps {
  items: Item[];
}

const OrderItems: React.FC<OrderItemsProps> = ({ items }) => {
const { backgroundMaingrey } = useTheme()
  return (
    <View style={styles.box}>
      <View style={{ marginBottom: 15 }}>
        <Typography variant='title'>Order:</Typography>
      </View>
      <FlatList
        data={items}
        renderItem={({ item }) => (
          <Product
            title={item.name}
            cover={item.cover}
            variants={item.description}
            quantity={item.quantity}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius
  },
});

export default OrderItems;