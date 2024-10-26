import { StyleSheet, Text, View } from "react-native";
import { Chip } from "../../../components/custom";

type Props = {
  id: number;
  title: string;
  amount: string;
  week_start_date: string;
  orders: number;
  status: string;
};

const Transaction = (props: Props) => (
  <View style={styles.container}>
    <View style={styles.header}>
      <Text style={[styles.title]}>ID #{props.id}</Text>

      <Text style={[styles.title]}>{props.amount}</Text>

      <Text style={[styles.title]}>{props.week_start_date}</Text>
      <Text style={[styles.title]}>{props.orders}</Text>
      {props.status == "Pending" && <Chip title="Pending" color="red" size="small" />}
      {props.status == "Payment" && <Chip title="Payment" color="green" size="small" />}
    </View>
  </View>
);

export default Transaction;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: "#222222",
  },
  header: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 14,
    color: "#FFF",
  },
});