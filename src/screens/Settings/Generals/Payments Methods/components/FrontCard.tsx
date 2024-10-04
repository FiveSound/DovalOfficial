import { View, Text, StyleSheet, Image } from "react-native";
import { iconsNative } from "../../../../../constants";

type Props = {
  brand: string;
  last4: string;
  expiryMonth: number;
  expiryYear: number;
};

const FrontCard = (props: Props) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, styles.title]}>{props.brand}</Text>
        <Text style={[styles.text, styles.subtitle]}>
          #### #### #### {props.last4}
        </Text>
        <Text style={[styles.text, styles.subtitle]}>
          {props.expiryMonth} /{props.expiryYear}
        </Text>
      </View>
      <View
        style={{
          alignItems: "flex-end",
        }}
      >
        <View
          style={{
            marginBottom: 20,
            flexDirection: "row",
            gap: 10,
          }}
        >
          <Image
            style={{ width: 25, height: 30 }}
            source={iconsNative.Contactless}
          />
          {/* <Image
            style={{ width: 55, height: 30 }}
            source={icons.GooglePay}
          /> */}
        </View>
        <Image
          style={{ marginBottom: 75, width: 30, height: 30 }}
          source={iconsNative.cardTouch}
        />
        {props.brand == "Visa" && (
          <Image
            style={{ width: 130, height: 40 }}
            source={iconsNative.visa}
          />
        )}
        {props.brand == "MasterCard" && (
          <Image
            style={{ width: 65, height: 40 }}
            source={iconsNative.masterCard}
          />
        )}

        {props.brand == "AmericanExpress" && (
          <Image
            style={{ width: 40, height: 40 }}
            source={iconsNative.amex}
          />
        )}
        {/* <Text>{props.brand}</Text> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    marginBottom: 10,
    color: "#FFFFFF",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 19,
  },
});

export default FrontCard;