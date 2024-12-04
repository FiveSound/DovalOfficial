import { LineDivider, Perks } from "@/src/components/custom";
import { View } from "@/src/components/native";
import { memo } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type Props = {
  id: number;
  name: string;
  description: string;
  selected: boolean;
  onPress: () => void;
};

const ItemCategory = memo((props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{props.name}</Text>
        {props.selected && <Perks label="" status="success" />}
      </View>
      <Text style={styles.subtitle}>{props.description}</Text>

      <LineDivider />
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    paddingHorizontal: 25,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 17,
  },
  subtitle: {
    fontSize: 14,
    color: "#444",
  },
});

export default ItemCategory;
