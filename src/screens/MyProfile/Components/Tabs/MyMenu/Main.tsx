import React, { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import { RefreshControl, StyleSheet } from "react-native";
import { useRefreshData } from "../../../../../hooks/useRefreshData";
import i18next from "../../../../../Translate";
import { useAuth } from "../../../../../context/AuthContext";
import { Buttons, FlexContainer, IsLoading, LoadingScreen, ScreenEmpty, Typography } from "../../../../../components/custom";
import { COLORS, FONTS, SIZES } from "../../../../../constants/theme";
import { Ilustrations } from "../../../../../constants";
import { ScrollView } from "../../../../../components/native";
import { RecipeList, SearchBar } from "./Components";
const LazyCard = lazy(() => import("../../../../../components/custom/business/CardRecipies"));

interface Recipe {
  name: string;
  description: string;
  thumbnail: string;
  price: string;
  id: number;
  businessID: number;
  cover: string;
  ordenable: boolean;
}

interface MainProps {
  data: Recipe[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}


const Main: React.FC<MainProps> = (props: MainProps) => {
  const { data, isLoading, isError, refetch } = props;
  const { user } = useAuth();
  const userSellers = user?.businessID !== null;
  const [focus, setFocus] = useState(false);
  const { onRefresh, isRefreshing } = useRefreshData([refetch]);
  const [searchText, setSearchText] = useState('');
  const PLACEHOLDER_TEXT = i18next.t("Find recipes from your favorite");
  const EMPTY_STATE_LABEL = i18next.t("You don't have posts yet");
  const EMPTY_STATE_SUBLABEL = i18next.t("Upload your content today");
  const EMPTY_STATE_BUTTON_LABEL = i18next.t("Upload posts");

  const filteredData = useMemo(() => {
    return Array.isArray(data) ? data.filter((item: Recipe) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    ) : [];
  }, [data, searchText]);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Recipe }) => (
      <Suspense fallback={<IsLoading />}>
        <LazyCard row={item} />
      </Suspense>
    ),
    []
  );

  const onViewGrid = useCallback(() => {
    console.log('View grid');
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    return (
      <FlexContainer newStyle={styles.errorContainer}>
        <Typography variant='H4title' newStyle={styles.errorText}>Ocurrió un error al cargar los datos.</Typography>
        <Buttons label="Reintentar" onPress={refetch} />
      </FlexContainer>
    );
  }


  if (data && Array.isArray(data)) {
    return (
       <FlexContainer>
        {data.length === 0 ? (
          <ScrollView
            refreshControl={
              <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            }
          >
            <FlexContainer
              newStyle={{
                width: SIZES.width,
                alignItems: "center",
                backgroundColor: "transparent",
              }}
            >
              <ScreenEmpty
                labelPart1={EMPTY_STATE_LABEL}
                subLabel={EMPTY_STATE_SUBLABEL}
                labelButton={EMPTY_STATE_BUTTON_LABEL}
                onPress={() => console.log('')}
                labelStylePart1={{
                  ...FONTS.LargeTitle,
                  textAlign: "center",
                }}
                source={Ilustrations.FoodStores}
                ImgWidth={SIZES.width}
                ImgHeigth={SIZES.height / 3.6}
                colorVariant="primary"
                ShowButton={userSellers}
              />
            </FlexContainer>
          </ScrollView>
        ) : (
         <>
            <SearchBar
              searchText={searchText}
              placeholder={PLACEHOLDER_TEXT}
              handleSearch={handleSearch}
              onViewGrid={onViewGrid}
              focus={focus}
              setFocus={setFocus}
            />
            <RecipeList
              data={filteredData}
              renderItem={renderItem}
              isRefreshing={isRefreshing}
              onRefresh={onRefresh}
            />
          </>
        )}
      </FlexContainer>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: SIZES.gapLarge,
  },
  errorText: {
    ...FONTS.semi16,
    color: COLORS.error,
    marginBottom: SIZES.gapMedium,
  },
});

export default Main;