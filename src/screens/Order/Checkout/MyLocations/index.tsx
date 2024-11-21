import { memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Text, ActivityIndicator, TouchableOpacity, StyleSheet } from "react-native";
import { getMyLocations } from "../../../../services/orders";
import EmptyLocations from "./EmptyLocations";
import SavedLocations from "./SavedLocations";
import { useNavigation } from "../../../../components/native";
import { Container, LoadingScreen, ScreenEmpty } from "../../../../components/custom";
import i18next from "../../../../Translate";
import { SIZES } from "../../../../constants/theme";
import { Ilustrations } from "../../../../constants";

const QUERY_KEY = 'QUERY_KEY_MY_LOCATIONS';
const MyLocations = memo(() => {
  const navigation = useNavigation();

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: getMyLocations,
  });

  if (isLoading || isFetching) return <LoadingScreen />;

  if (isError) return <Text>An ocurred error!</Text>;

  const handleAddLocation = () => {
    navigation.navigate('ScreenNewLocation');
  };

  if (data) {
    return (
      <Container 
      showHeader={true}
      label={i18next.t('My locations')}
      style={styles.container}
      labels={i18next.t('Add a new location')}
      onPressButtons={handleAddLocation}
      showFooter={true}
      >
        {data.length === 0 && <ScreenEmpty 
        labelPart1={i18next.t('No locations found')}
        labelButton={i18next.t('Add a new location')}
        source={Ilustrations.CharcoPet}
        onPress={handleAddLocation}
        ImgWidth={SIZES.width / 1.5}
        ImgHeigth={SIZES.height / 3}
        ShowButton={false}
        />}

        {data.length > 0 && <SavedLocations data={data} />}
      </Container>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default MyLocations;
