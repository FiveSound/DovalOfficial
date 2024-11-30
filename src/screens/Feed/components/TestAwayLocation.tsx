import { Text } from "react-native";
import { useAppSelector } from "@/src/redux";
import { RootState } from "@/src/redux/store";
import { getAwayFromHomeService } from "@/src/services/locations";
import { useQuery } from "@tanstack/react-query";
import { memo } from "react";

const TestAwayLocation = memo(() => {
  const { location } = useAppSelector((state: RootState) => state.location);
  const { user } = useAppSelector((state: RootState) => state.auth);

  const response = useQuery({
    queryKey: ["awayLocation-component"],
    queryFn: async () => await getAwayFromHomeService(location, user?.userID),
    enabled: user?.userID && location ? true : false,
  });

  if (response.isLoading || response.isFetching) {
    return <Text>Loading...</Text>;
  }

  if (response.isError) {
    return <Text>Error...</Text>;
  }

  if (response.data && !response.data.hiden) {
    return <Text style={{ fontSize: 20 }}>Estas lejos de casa Wey!</Text>;
  }

  return null;
});

export default TestAwayLocation;
