import { Text } from "react-native";
import { useAppSelector } from "@/src/redux";
import { RootState } from "@/src/redux/store";
import { getAwayFromHomeService } from "@/src/services/locations";
import { useQuery } from "@tanstack/react-query";
import { memo, useEffect } from "react";
import { useToast } from '@/src/components/custom/ToastManager';

const QUERY_KEY = 'awayLocation-component';

const TestAwayLocation = memo(() => {
  const { location } = useAppSelector((state: RootState) => state.location);
  const { user, isAuthenticated } = useAppSelector((state: RootState) => state.auth);
  const enabled = isAuthenticated && user?.userID && location ? true : false;
  const { showToast } = useToast();

  const response = useQuery({
    queryKey: [QUERY_KEY, enabled],
    queryFn: async () => await getAwayFromHomeService(location, user?.userID),
    enabled: enabled,
  });

  useEffect(() => {
    if(response.data && !response.data.hiden){
      showToast('info', 'Estas lejos de casa Wey!');
      console.log('toast');
    }
  }, [response.data, showToast]);

  if (response.isLoading || response.isFetching) {
    return <></>;
  }

  if (response.isError) {
    return <></>;
  }

  return null;
});

export default TestAwayLocation;