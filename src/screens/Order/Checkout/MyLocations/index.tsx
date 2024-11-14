import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { View, Text, ActivityIndicator } from "react-native";
import { getMyLocations } from "../../../../services/orders";
import EmptyLocations from "./EmptyLocations";
import SavedLocations from "./SavedLocations";

const MyLocations = memo(() => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ["locations-useQuery"],
    queryFn: getMyLocations,
  });

  if (isLoading || isFetching) return <ActivityIndicator />;

  if (isError) return <Text>An ocurred error!</Text>;

  if (data) {
    return (
      <View>
        {data.length === 0 && <EmptyLocations />}

        <SavedLocations data={data} />
      </View>
    );
  }
});

export default MyLocations;
