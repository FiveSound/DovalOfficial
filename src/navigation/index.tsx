import { LoadingScreen } from "../components/custom";
import { useAppSelector } from "../redux";
import { RootState } from "../redux/store";
import MainStackt from "./MainStackt";

const RootNavigation = () => {
  const { isLoadingApp } = useAppSelector((state: RootState) => state.auth);

  if (isLoadingApp) {
    return <LoadingScreen />;
  }

  return <MainStackt />;
};

export default RootNavigation;