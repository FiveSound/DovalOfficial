import React, { lazy, Suspense, useCallback, useMemo } from "react";
import { RefreshControl } from "react-native";
import { useRefreshData } from "../../../../../hooks";
import {
  ButtonAcces,
  FlexContainer,
  IsLoading,
  ScreenEmpty,
  ToggleFilter,
} from "../../../../../components/custom";
import i18next from "../../../../../Translate";
import { Ilustrations } from "../../../../../constants";
import { FONTS, SIZES } from "../../../../../constants/theme";
import {
  FlatList,
  ScrollView,
  useNavigation,
  View,
} from "../../../../../components/native";
const LazyCard = lazy(
  () => import("../../../../../components/custom/business/CardBusiness")
);

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
  const navigation = useNavigation();
  const { isRefreshing, onRefresh } = useRefreshData([refetchPostData]);

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

  const emptyComponent = useMemo(
    () => (
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
    ),
    [isRefreshing, onRefresh]
  );

  if (isLoading) {
    return <IsLoading label="Loading business" />;
  }

  return !isLoading && filteredData && filteredData.length === 0 ? (
    emptyComponent
  ) : (
    <FlexContainer
      newStyle={{ marginTop: SIZES.gapMedium, gap: SIZES.gapMedium }}
    >
      <ButtonAcces
        label={i18next.t("Nearby Restaurant")}
        onPress={() => {
          console.log("Navigating to SearchBusiness");
          navigation.navigate("SearchBusiness");
        }}
        ShowLineDivider={true}
        labelPreview={i18next.t("More")}
        labelStyle={{
          ...FONTS.heading18,
        }}
      />
      <ToggleFilter
        onPressStores={toggleFilterStores}
        filterStores={filterStores}
        onPressFreeShipping={toggleFreeShipping}
        freeShipping={freeShipping}
      />
      <FlatList
        data={filteredData}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        nestedScrollEnabled={true}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        contentContainerStyle={{
            paddingBottom: SIZES.height / 1,
        }}
      />
    </FlexContainer>
  );
};

export default React.memo(Main);
