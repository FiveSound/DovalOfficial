import { memo } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { CLOUDFRONT } from "../../../services";

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
        <Image style={styles.cover} source={{ uri: `${CLOUDFRONT}${props.cover}` }} />
        <View style={styles.variants}>
          <Text style={styles.title}>{props.title}</Text>
          <Text>{props.variants}</Text>
        </View>
        <Text style={[styles.title, { color: "#FF5500" }]}>Cant. {props.quantity}</Text>
      </View>
      <View style={styles.separator}></View>
    </View>
  );
});

const styles = StyleSheet.create({
  cover: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  body: {
    flexDirection: "row",
    gap: 20,
  },
  variants: {
    minWidth: 180,
    maxWidth: 180,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  separator: {
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    height: 1,
    backgroundColor: "#E0E0E0",
  },
});

export default Product;