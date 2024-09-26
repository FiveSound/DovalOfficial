import { lazy, Suspense, useCallback, useMemo, memo } from "react";
import { useRefreshData } from "../../../../../hooks";
import i18next from "../../../../../Translate";
import { CLOUDFRONT } from "../../../../../services";
import { useAuth } from "../../../../../context/AuthContext";
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from "../../../../../constants/theme";
import { FlexContainer, IsLoading, LoadingScreen, ScreenEmpty } from "../../../../../components/custom";
import { Ilustrations } from "../../../../../constants";
import {
  RefreshControl,
  ScrollView,
  useNavigation,
} from "../../../../../components/native";
import styles from "../styles";
import { ListRenderItem } from "@shopify/flash-list";
import { PostsList } from "./Components";
const LazyCardPosts = lazy(() => import("../../../../../components/custom/Cards/Posts"));

const Main = (props: any) => {
  const { isOffline, user } = useAuth();
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchPostData,
    username,
  } = props;
  const { isRefreshing, onRefresh } = useRefreshData([refetchPostData]);
  const navigation = useNavigation();

  const renderItem: ListRenderItem<any> = useCallback(
    ({ item, index }) => {
      return (
        <Suspense fallback={<IsLoading />}>
          <FlexContainer newStyle={styles.grid}>
            <LazyCardPosts
              row={item}
              posterHeight={responsiveFontSize(172)}
              posterWidth={SIZES.width / 3.06}
              onPress={() => console.log("item")}
            />
          </FlexContainer>
        </Suspense>
      );
    },
    [data, navigation]
  );

  const estimatedItemSize = useMemo(() => {
    return 158;
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  } else if (data.length > 0) {
    return (
      <FlexContainer newStyle={styles.containerGrid}>
        <PostsList
          data={data}
          renderItem={renderItem}
          isRefreshing={isRefreshing}
          onRefresh={onRefresh}
          estimatedItemSize={estimatedItemSize}
        />
      </FlexContainer>
    );
  } else {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }>
        <FlexContainer newStyle={styles.containerEmpty}>
          <ScreenEmpty
            labelPart1={
              !isOffline
                ? i18next.t("You don't have posts yet")
                : i18next.t("Oh no, weve had problems")
            }
            labelPart2={
              !isOffline
                ? i18next.t("Upload your content today")
                : i18next.t("Please check your internet and try again")
            }
            labelButton={i18next.t("Upload posts")}
            onPress={() => {
              navigation.navigate("TabsUpload");
            }}
            labelStylePart1={{
              ...styles.labelStylePart1,
              color: !isOffline ? COLORS.primary : COLORS.error,
            }}
            labelStylePart2={{
              ...styles.labelStylePart1,
              color: !isOffline ? COLORS.Description : COLORS.error,
            }}
            source={
              !isOffline ? Ilustrations.EmptyMedia : Ilustrations.InternetLose
            }
            ImgWidth={SIZES.width}
            ImgHeigth={SIZES.height / 3.6}
            colorVariant="primary"
            ShowButton={user?.username === username}
          />
        </FlexContainer>
      </ScrollView>
    );
  }
};

export default Main;