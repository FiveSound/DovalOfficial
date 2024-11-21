import { memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { View, TouchableOpacity, Text, FlatList, StyleSheet } from "react-native";
import { deleteLocationService, setDefaultLocationService } from "../../../../services/orders";
import { useNavigation } from "../../../../components/native";
import { FlexContainer, LineDivider, Typography } from "@/src/components/custom";
import { COLORS, SIZES } from "@/src/constants/theme";
import i18next from "@/src/Translate";
import { MaterialIcons } from "@expo/vector-icons";
import { useTheme } from "@/src/hooks";
import { CheckmarkCircle02Icon } from "@/src/constants/IconsPro";

type Props = {
  data: any[];
};

const SavedLocations = memo((props: Props) => {
  const { backgroundMaingrey, border } = useTheme();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const handleDefault = async (locationID: string) => {
    const response = await setDefaultLocationService(locationID);
    if (response) {
      queryClient.invalidateQueries({ queryKey: ["screen-checkout-orders-useQuery"] });
      navigation.navigate("Checkout");
    }
  };

  const handleDelete = async (locationID: string) => {
    const response = await deleteLocationService(locationID);
    if (response.success) {
      // queryClient.invalidateQueries({ queryKey: ["screen-checkout-orders-useQuery"] });
      // navigation.navigate("Checkout");
    }
  };

  const renderItem = ({ item }: { item: any }) => (
    <>
      <FlexContainer newStyle={[styles.card, { backgroundColor: backgroundMaingrey }]}>
        {/* <FlexContainer style={styles.cardHeader}>
          <Location09Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={item.selected ? "#FF5500" : "#555"}
          />
          <Typography variant='H4title'>{item.tag}</Typography>
        </FlexContainer> */}
        <View style={styles.cardBody}>
          <Typography variant='SubDescription' newStyle={styles.detail}><Typography variant='subtitle'>{i18next.t('City')}:</Typography> {item.city}</Typography>
          <Typography variant='SubDescription' newStyle={styles.detail}><Typography variant='subtitle'>{i18next.t('Apartment')}:</Typography> {item.apartment}</Typography>
          <Typography variant='SubDescription' newStyle={styles.detail}><Typography variant='subtitle'>{i18next.t('Details')}:</Typography> {item.details}</Typography>
        </View>
        <View style={styles.cardFooter}>
          <TouchableOpacity
            onPress={() => handleDefault(item.locationID)}
            style={[styles.setDefaultButton, { backgroundColor: item.selected ? COLORS.success : border }]}
          >
            {
              item.selected && <CheckmarkCircle02Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.dark} />
            }
            <Typography variant='H4title' newStyle={styles.buttonText}>{item.selected ? i18next.t('Default') : i18next.t('Set as default')}</Typography>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={() => handleDelete(item.id)}
            style={styles.deleteButton}
          >
            <MaterialIcons name="delete" size={20} color="#fff" />
            <Text style={styles.buttonText}>Eliminar</Text>
          </TouchableOpacity> */}
        </View>
      </FlexContainer>
      <LineDivider variant='secondary' />
    </>
    );
  
    return (
      <FlexContainer>
        <FlatList
          data={props.data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </FlexContainer>
    );
  });

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: SIZES.gapLarge
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: "#333",
      marginBottom: 20,
      textAlign: "center",
    },
    list: {
      paddingBottom: 20,
    },
    separator: {
      height: 15,
    },
    card: {
      padding: SIZES.gapLarge,
      marginHorizontal: SIZES.gapLarge,
      marginBottom: SIZES.gapLarge,
      borderRadius: SIZES.radius
    },
    cardHeader: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 10,
      backgroundColor: 'transparent'
    },
    tag: {
      fontSize: 18,
      fontWeight: "600",
      color: "#555",
      marginLeft: 8,
      flex: 1,
    },
    defaultLabel: {
      fontSize: 12,
      color: "#FF5500",
      fontWeight: "500",
    },
    cardBody: {
      marginBottom: 15,
    },
    detail: {
    },
    boldText: {
      fontWeight: "600",
      color: "#444",
    },
    cardFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    setDefaultButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#4CAF50",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    deleteButton: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#E53935",
      paddingVertical: 8,
      paddingHorizontal: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: "#fff",
      marginLeft: 6,
      fontSize: 14,
      fontWeight: "500",
    },
  });

export default SavedLocations;
