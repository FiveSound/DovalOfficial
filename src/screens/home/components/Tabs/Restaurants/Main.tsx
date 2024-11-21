import React, { lazy, Suspense, useCallback } from 'react';
import { RefreshControl } from 'react-native';
import { useRefreshData } from '../../../../../hooks';
import {
  ButtonAcces,
  FlexContainer,
  IsLoading,
  LoadingScreen,
  ScreenEmpty,
  ToggleFilter,
} from '../../../../../components/custom';
import i18next from '../../../../../Translate';
import { Ilustrations } from '../../../../../constants';
import { FONTS, SIZES } from '../../../../../constants/theme';
import {
  FlashList,
  FlatList,
  ScrollView,
  useNavigation,
  View,
} from '../../../../../components/native';
const LazyCard = lazy(
  () => import('../../../../../components/custom/business/CardBusiness'),
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
  filterStores,
  setFilterStores,
  freeShipping,
  setFreeShipping,
}: Props) => {
  const navigation = useNavigation();
  const { isRefreshing, onRefresh } = useRefreshData([refetchPostData]);

  const toggleFilterStores = useCallback(() => {
    setFilterStores((prev: boolean) => !prev);
  }, [setFilterStores]);

  const toggleFreeShipping = useCallback(() => {
    setFreeShipping((prev: boolean) => !prev);
  }, [setFreeShipping]);

  const emptyComponent = () => (
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
        labelPart1={i18next.t('There are no restaurants nearby yet!')}
        subLabel={i18next.t(
          "We couldn't find any restaurants in your current location. Explore other areas or widen your search!",
        )}
        source={Ilustrations.CharcoPet}
        ImgWidth={SIZES.width}
        ImgHeigth={SIZES.height / 2.4}
        ShowButton={false}
      />
    </ScrollView>
  );

  const renderItem = useCallback(({ item }: { item: any }) => {
    return (
      <Suspense fallback={<IsLoading />}>
        <LazyCard item={item} />
      </Suspense>
    );
  }, []);

  if (isLoading) {
    return <LoadingScreen label={i18next.t('Loading business')} />;
  }

  if (isError) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScreenEmpty
          labelPart1={i18next.t('Error loading data')}
          subLabel={
            error?.message ||
            i18next.t('An unexpected error occurred. Please try again.')
          }
          source={Ilustrations.Error}
          ImgWidth={SIZES.width / 2}
          ImgHeigth={SIZES.height / 4}
          ShowButton={true}
          onPress={refetchPostData}
        />
      </View>
    );
  }

  return !isLoading && filteredData && filteredData.length === 0 ? (
    emptyComponent()
  ) : (
    <FlexContainer
      newStyle={{ gap: SIZES.gapMedium, flex: 1, width: SIZES.width }}
    >
  
      {/* <ToggleFilter
        onPressStores={toggleFilterStores}
        filterStores={filterStores}
        onPressFreeShipping={toggleFreeShipping}
        freeShipping={freeShipping}
      /> */}
      <FlashList
        data={filteredData}
        keyExtractor={item => item.businessID.toString()}
        renderItem={renderItem}
        estimatedItemSize={100}
        onRefresh={onRefresh}
        scrollEnabled={false}
        refreshing={isRefreshing}
        contentContainerStyle={{
          paddingBottom: SIZES.height / 4,
        }}
      />
    </FlexContainer>
  );
};

export default Main;
