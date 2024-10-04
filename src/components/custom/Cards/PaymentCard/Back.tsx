import { View, Text, StyleSheet, Image } from "react-native";
import { iconsNative } from "../../../../constants";

type Props = {
  validCVC: string;
};

const Back = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Image
          style={{
            width: 30,
            height: 30,
          }}
          source={iconsNative.cardTouch}
        />
      </View>
      <View style={styles.footer}>
        <View style={styles.cvc}>
          <Image source={iconsNative.dot} />
          <Text style={styles.text}>{props.validCVC == "Valid" && "****"}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  box: {
    marginTop: 30,
    padding: 10,
    marginHorizontal: -10,
    marginBottom: 60,
    alignItems: "flex-end",
    backgroundColor: "#2C2C2E",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cvc: {
    marginBottom: 10,
    width: 120,
    padding: 10,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 2,
  },
  text: {
    fontSize: 18,
  },
});

export default Back;