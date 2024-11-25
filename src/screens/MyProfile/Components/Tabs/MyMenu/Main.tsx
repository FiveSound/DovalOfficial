import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { RefreshControl, StyleSheet } from 'react-native';
import i18next from '../../../../../Translate';
import {
  Buttons,
  FlexContainer,
  IsLoading,
  LoadingScreen,
  ScreenEmpty,
  Typography,
} from '../../../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../../../constants/theme';
import { Ilustrations } from '../../../../../constants';
import { ScrollView } from '../../../../../components/native';
import { RecipeList, SearchBar } from './Components';
import { useAppSelector } from '../../../../../redux';
import { RootState } from '../../../../../redux/store';
import CardRecipies from '@/src/components/custom/business/CardRecipies';

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
  const { user } = useAppSelector((state: RootState) => state.auth);
  const userSellers = user?.businessID !== null;
  const [focus, setFocus] = useState(false);
  const [searchText, setSearchText] = useState('');
  const PLACEHOLDER_TEXT = i18next.t('Find recipes from your favorite');
  const EMPTY_STATE_LABEL = i18next.t("We don't have recipes yet");
  const EMPTY_STATE_SUBLABEL = i18next.t('Upload your recipes today');
  const EMPTY_STATE_BUTTON_LABEL = i18next.t('Upload recipes');

  const filteredData = useMemo(() => {
    return Array.isArray(data)
      ? data.filter((item: Recipe) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()),
        )
      : [];
  }, [data, searchText]);

  const handleSearch = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Recipe }) => (
      <Suspense fallback={<IsLoading />}>
        <CardRecipies row={item} isBusiness={false} />
      </Suspense>
    ),
    [],
  );

  const onViewGrid = useCallback(() => {
    console.log('View grid');
  }, []);

  if (isLoading) return <LoadingScreen />;

  if (isError) {
    return (
      <FlexContainer newStyle={styles.errorContainer}>
        <Typography variant="H4title" newStyle={styles.errorText}>
          Ocurrió un error al cargar los datos.
        </Typography>
        <Buttons label="Reintentar" onPress={refetch} />
      </FlexContainer>
    );
  }

  if (data && Array.isArray(data)) {
    return (
      <FlexContainer>
        {data.length === 0 ? (
          <ScrollView
            // refreshControl={
            //   <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
            // }
          >
            <FlexContainer
              newStyle={{
                width: SIZES.width,
                alignItems: 'center',
                backgroundColor: 'transparent',
              }}
            >
              <ScreenEmpty
                labelPart1={EMPTY_STATE_LABEL}
                labelPart2={EMPTY_STATE_SUBLABEL}
                labelButton={EMPTY_STATE_BUTTON_LABEL}
                onPress={() => console.log('')}
                labelStylePart1={{
                  ...FONTS.LargeTitle,
                  textAlign: 'center',
                }}
                source={Ilustrations.CharcoPet}
                ImgWidth={SIZES.width}
                ImgHeigth={SIZES.height / 3}
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
              
              // isRefreshing={isRefreshing}
              // onRefresh={onRefresh}
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.gapLarge,
  },
  errorText: {
    ...FONTS.semi16,
    color: COLORS.error,
    marginBottom: SIZES.gapMedium,
  },
});

export default Main;
