import { memo } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type Props = {
  children: string;
  onPress: () => void;
};

const TitleWithBack = memo((props: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <Text style={styles.back}>Atras</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{props.children}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    alignItems: "center",
  },
  back: {
    fontSize: 16,
    fontWeight: "bold",
  },
  title: {
    fontSize: 19,
  },
});

export default TitleWithBack;
