import { lazy, Suspense, useCallback, useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import {
  FlexContainer,
  IsLoading,
  LoadingScreen,
  ScreenEmpty,
  SearchLayout,
  ToggleFilter,
  Typography,
} from '../../../components/custom';
import { useRefreshData, useTheme } from '../../../hooks';
import { responsiveFontSize, SIZES } from '../../../constants/theme';
import i18next from '../../../Translate';
import { Ilustrations } from '../../../constants';
import { FlashList, RefreshControl, ScrollView, View } from '../../../components/native';
const LazyCard = lazy(
  () => import('../../../components/custom/business/CardBusiness'),
);

type Props = {
  data: any[];
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
  data,
  isLoading,
  isError,
  error,
  refetchPostData,
}: Props) => {
  const { isRefreshing, onRefresh } = useRefreshData([refetchPostData]);
  const { backgroundMaingrey, BackgroundMain } = useTheme();
  const [Search, setSearch] = useState('');
  const handleSearch = (text: string) => {
    setSearch(text);
  };

  const filteredData = useMemo(() => {
    if (!Search.trim()) return data;
    return data.filter(item =>
      item.business_name.toLowerCase().includes(Search.toLowerCase())
    );
  }, [data, Search]);
  


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

  return (
    <SearchLayout
      value={Search}
      placeholder={i18next.t('Search for nearby restaurants, and businesses')}
      container={{ backgroundColor: backgroundMaingrey }}
      onChange={handleSearch}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
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
      ) : (
       <>
         <FlashList
          data={filteredData}
          keyExtractor={item => item.businessID.toString()}
          renderItem={renderItem}
          onRefresh={refetchPostData}
          refreshing={isLoading}
          decelerationRate='normal'
          contentContainerStyle={{ paddingBottom: SIZES.height / 2 }}
          estimatedItemSize={300}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 50,
            minimumViewTime: 100,
          }}
        />
       </>
      )}
    </SearchLayout>
  );
};

export default Main;
