
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import MainStackt from "./MainStackt";

const queryClient = new QueryClient();

const RootNavigation = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MainStackt />
    </QueryClientProvider>
  );
};

export default RootNavigation;