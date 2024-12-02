import { memo } from "react";
import { ActivityIndicator, StyleSheet, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRoute } from "@react-navigation/native";
import { getAvailableProgrammableService } from "../services/programmable";
import { SafeAreaView, useNavigation } from "../components/native";
import { LineDivider } from "../components/custom";

const ProgramOrder = memo(() => {
  const { params } = useRoute<any>();
  const navigation = useNavigation();

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["programmable-screen"],
    queryFn: getAvailableProgrammableService,
  });

  const handleSelectedDay = () => {};

  const handleSelectedHour = (id: number) => {
    // navigation.navigate("Checkout", {
    //   cartID: params?.cartID,
    //   ...row,
    // });
  };

  if (isLoading || isFetching) return <ActivityIndicator />;
  if (isError) return <Text>An ocurred error!</Text>;

  if (data) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.subtitle}>Programa tu pedido!</Text>
          <Text style={styles.title}>Elige un horario de entrega</Text>
        </View>

        {data.days && data.days.length > 0 && (
          <ScrollView
            style={{
              maxHeight: 100,
            }}
            horizontal
          >
            {data.days.map((row: { active?: boolean; title: string; date: string | null }) => (
              <TouchableOpacity
                onPress={() => handleSelectedDay()}
                style={[styles.item_hour, row.active && styles.active2]}
                key={row.title}
                focusable
              >
                <Text style={[styles.item_hour_title, row.active && styles.active]}>{row.title}</Text>
                <Text style={[styles.item_hour_subtitle, row.active && styles.active]}>{row.date}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        <LineDivider
          lineStyle={{
            marginBottom: 10,
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.3,
            shadowRadius: 3,
          }}
        />

        {data.hours && data.hours.length > 0 && (
          <ScrollView style={styles.body}>
            {data.hours.map((row: { id: number; title: string; aprox: string | null }) => (
              <TouchableOpacity onPress={() => handleSelectedHour(row.id)} style={styles.body_item} key={row.title}>
                <View>
                  {row.title && <Text style={styles.body_item_title}>{row.title}</Text>}
                  {row.aprox && <Text style={styles.body_item_aprox}>{row.aprox}</Text>}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        {/* <Text>{JSON.stringify(data, null, 2)}</Text> */}
      </SafeAreaView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 33,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
  },
  item_hour: {
    flexDirection: "column",
    alignItems: "center",
    minWidth: 100,
    height: 150,
    padding: 10,
  },
  item_hour_title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  item_hour_subtitle: {
    fontSize: 28,
    fontWeight: "bold",
  },
  active: {
    color: "green",
  },
  active2: {
    backgroundColor: "rgba(38, 255, 118, 0.43)",
  },
  body: {
    paddingHorizontal: 20,
  },
  body_item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 14,
    borderBottomWidth: 2,
    borderBottomColor: "#DDD",
  },
  body_item_title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 5,
  },
  body_item_aprox: {
    color: "green",
  },
});

export default ProgramOrder;
