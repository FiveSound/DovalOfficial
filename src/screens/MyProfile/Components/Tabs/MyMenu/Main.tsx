import { ListRenderItem, RefreshControl, StyleSheet } from "react-native";
import { useRefreshData } from "../../../../../hooks/useRefreshData";
import { lazy, Suspense, useCallback, useEffect, useMemo, useState } from "react";
import i18next from "../../../../../Translate";
import { useAuth } from "../../../../../context/AuthContext";
import { FlexContainer, Icons, IsLoading, LoadingScreen, ScreenEmpty, Search } from "../../../../../components/custom";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../../constants/theme";
import { Ilustrations } from "../../../../../constants";
import { FlashList, ScrollView, View } from "../../../../../components/native";
import { GridViewIcon, PlusSignIcon } from "../../../../../constants/IconsPro";
import { useTheme } from "../../../../../hooks";
const LazyCard = lazy(() => import("../../../../../components/custom/business/CardRecipies"))

interface listInterface {
  name: string;
  id: number;
}


const Main = (props: any) => {
  const { data, isLoading, isError, refetch: RefreshData } = props;
  const [view, setView] = useState(false);
  const { Description } = useTheme()
  const { user } = useAuth()
  const userSellers = user?.businessID !== null ? true : false
  const [focus, setFocus] = useState(false)
  const { onRefresh, isRefreshing } = useRefreshData([RefreshData]);
  const [searchText, setSearchText] = useState('');
  const filteredData = data ? data.filter((item: listInterface) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  ) : [];
  const handleSearch = (text: string) => {
    setSearchText(text);
  };
  useEffect(() => {
  }, [data]);


  const renderItem: ListRenderItem<any> = useCallback(
    ({ item, index }) => {
      return (
        <Suspense fallback={<IsLoading />}>
          <LazyCard row={item} />
        </Suspense>
      );
    },
    [data]
  );

  const estimatedItemSize = useMemo(() => {
    return 529;
  }, []);

  if (isLoading) return <LoadingScreen />

  if (data && Array.isArray(data)) {
    return (
      <>
        {data.length === 0 && (
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
                labelPart1={i18next.t("You don't have posts yet")}
                subLabel={i18next.t("Upload your content today")}
                labelButton={i18next.t("Upload posts")}
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
        )}
        <>
          {data.length >= 1 &&
            <FlexContainer newStyle={styles.searchContainer} variant='row'>
              <Search
                value=""
                placeholder={i18next.t('Find recipes from your favorite')}
                onChange={handleSearch}
                onBlur={() => setFocus(false)}
                onFocus={() => setFocus(true)}
                containerStyle={{
                  width: SIZES.width / 1.2,
                }}
              />
              <Icons
                appendIcons={<GridViewIcon width={SIZES.icons} height={SIZES.icons} color={Description}/>}
                onPress={() => console.log('View grid')}
              />
            </FlexContainer>

          }
         <FlashList
            data={data}
            renderItem={renderItem}
            numColumns={3}
            keyExtractor={item => item.id.toString()}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            contentContainerStyle={styles.flatListContent}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ height: responsiveFontSize(100) }} />}
            estimatedItemSize={estimatedItemSize}
            getItemType={(item) => item.mediaType}
          />
        </>
      </>
    );
  }
};

const styles = StyleSheet.create({
  searchContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.gapLarge
  },
  flatListContent: {
    paddingBottom: SIZES.height / 4,
  },
})

export default Main;
