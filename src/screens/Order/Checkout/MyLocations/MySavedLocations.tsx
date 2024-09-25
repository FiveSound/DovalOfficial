import React from "react";
import { StyleSheet } from "react-native";
import { TouchableOpacity, useNavigation, View, Text } from "../../../../components/native";
import { getMyLocations, setDefaultLocationService } from "../../../../services/orders";
import { COLORS, SIZES, responsiveFontSize } from "../../../../constants/theme";
import { Location09Icon } from "../../../../constants/IconsPro";
import { useAPI, useTheme } from "../../../../hooks";
import { FlexContainer, IsLoading, LineDivider, ScreenEmpty, Typography } from "../../../../components/custom";
import i18next from "../../../../Translate";
import { Ilustrations } from "../../../../constants";

interface PropsData {
  data: any;
  isLoading: Boolean;
  isFetching: Boolean;
  isRefetching: Boolean;
  refetch: any;
}

const Location = (props: any) => {
  const { tag, details, selected, locationID } = props;
  const { Description , Title} = useTheme();
  const navigation = useNavigation();
  const [loading, setLoading] = React.useState(false); // Add loading state

  const handleSelected = async () => {
    setLoading(true); // Set loading to true when pressed
    await setDefaultLocationService(locationID);
    setLoading(false); // Set loading to false when success
    navigation.navigate("Checkout", {
      locationID,
    });
  };

  return (
    <>
      <TouchableOpacity onPress={handleSelected}>
        <View style={styles.locationContainer}>
          <View style={styles.locationDetails}>
            <Location09Icon color={Description} width={SIZES.icons} height={SIZES.icons} />
            <View>
              <Typography
                variant='subtitle'
                newStyle={{
                  color: selected ? COLORS.primary : Title,
                }}
              >
                {tag}
              </Typography>
              <Typography
                variant='SubDescription'
                numberOfLines={1}
                newStyle={{
                  color: selected ? COLORS.primary : Description,
                  width: SIZES.width / 1.4,
                }}
              >
                {details}
              </Typography>
            </View>
          </View>
          <Text>...</Text>
          {loading && <IsLoading />}
        </View>
      </TouchableOpacity>
      <LineDivider lineStyle={styles.lineDivider} />
    </>
  );
};

const MySavedLocations = () => {
  const { data, isLoading, isFetching, isRefetching }: PropsData = useAPI({
    queryKey: ["locations"],
    queryFn: getMyLocations,
  });

  if (isLoading || isFetching || isRefetching) {
    return <IsLoading />;
  }

  if (data) {
    return (
      <>
        {data.length === 0 && (
          <FlexContainer newStyle={styles.emptyContainer}>
            <ScreenEmpty
              labelPart1={i18next.t("You dont have saved addresses yet.")}
              labelStylePart1={styles.emptyLabel}
              subLabel={i18next.t("Add your addresses...")}
              source={Ilustrations.Map}
              ImgWidth={SIZES.width}
              ImgHeigth={SIZES.height / 3}
              ShowButton={false}
            />
          </FlexContainer>
        )}
        {data.map((row: any) => (
          <Location key={row.id} {...row} />
        ))}
      </>
    );
  }
};

const styles = StyleSheet.create({
  locationContainer: {
    padding: responsiveFontSize(10),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: 'transparent',
  },
  locationDetails: {
    display: "flex",
    gap: responsiveFontSize(10),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: 'transparent',
  },
  lineDivider: {
    marginTop: responsiveFontSize(10),
    marginBottom: responsiveFontSize(10),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: SIZES.height / 2,
  },
  emptyLabel: {
    textAlign: 'center',
  },
});

export default MySavedLocations;