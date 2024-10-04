import {
  lazy,
  Suspense,
  useCallback,
} from "react";
import { FlatList } from "react-native";
import {
  IsLoading,
  LoadingScreen,
  ScreenEmpty,
  SearchLayout,
  ToggleFilter,
  Typography,
} from "../../../components/custom";
import { useRefreshData, useTheme } from "../../../hooks";
import { responsiveFontSize, SIZES } from "../../../constants/theme";
import i18next from "../../../Translate";
import { Ilustrations } from "../../../constants";
import { RefreshControl, ScrollView, View } from "../../../components/native";
const LazyCard = lazy(() => import("../../../components/custom/business/CardBusiness"));

type Props = {
  filteredData: any[];
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetchPostData: () => void;
  Search: string;
  setSearch: (value: string) => void;
  filterStores: boolean;
  setFilterStores: (value: boolean) => void;
  freeShipping: boolean;
  setFreeShipping: (value: boolean) => void;
  navigateToPermissionScreen: () => void;
};

const Main = ({
  filteredData,
  isLoading,
  isError,
  error,
  refetchPostData,
  Search,
  setSearch,
  filterStores,
  setFilterStores,
  freeShipping,
  setFreeShipping,
  navigateToPermissionScreen,
}: Props) => {
  const { isRefreshing, onRefresh } = useRefreshData([refetchPostData]);
  const { backgroundMaingrey, BackgroundMain } = useTheme();

  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const toggleFilterStores = useCallback(() => {
    console.log("toggleFilterStores clicked");
    setFilterStores((prev) => !prev);
  }, [setFilterStores]);

  const toggleFreeShipping = useCallback(() => {
    console.log("toggleFreeShipping clicked");
    setFreeShipping((prev) => !prev);
  }, [setFreeShipping]);

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <Suspense fallback={<IsLoading />}>
        <LazyCard item={item} />
      </Suspense>
    );
  }, []);

  if (isLoading) {
    return <LoadingScreen label={i18next.t("Loading business")}/>;
  }

  return (
    <SearchLayout
      placeholder={i18next.t("Search for nearby restaurants, and businesses")}
      container={{ backgroundColor: backgroundMaingrey }}
      onChange={handleSearch}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      Compenents={
        <ToggleFilter
          onPressStores={toggleFilterStores}
          filterStores={filterStores}
          onPressFreeShipping={toggleFreeShipping}
          freeShipping={freeShipping}
        />
      }
    >
      {filteredData.length === 0 && !IsLoading ? (
              <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            marginTop: SIZES.gapLarge,
          }}
        />
        <ScreenEmpty
          labelPart1={i18next.t("There are no restaurants nearby yet!")}
          subLabel={i18next.t(
            "We couldn't find any restaurants in your current location. Explore other areas or widen your search!"
          )}
          source={Ilustrations.CharcoPet}
          ImgWidth={SIZES.width}
          ImgHeigth={SIZES.height / 2.4}
          ShowButton={false}
        />
      </ScrollView>
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.businessID.toString()}
          renderItem={renderItem}
          onRefresh={refetchPostData}
          refreshing={isLoading}
          contentContainerStyle={{ paddingBottom: responsiveFontSize(100) }}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
        />
      )}

    </SearchLayout>
  );
};

export default Main;
