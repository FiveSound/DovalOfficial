import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useAuth } from '../../../context/AuthContext';
import { TypeProducts } from '../../../types/products/Product.types';
import RenderItem from './Body/RenderItem';
import LoaderMain from './LoaderMain';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';
import SwipeUpIntro from '../SwipeUpIntro';
import { FlexContainer } from '../../../components/custom';
import { Heading } from './Bar';
import { getTutorialStatus, setTutorialStatus, useRefreshData } from '../../../hooks';
import { getExploreData } from '../../../services/recipes';
import { FlatList } from '../../../components/native';

type MainProps = {
  currentLocation: object | null;
};

const Main = memo(({ currentLocation }: MainProps) => {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<TypeProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [lastFocusedIndex, setLastFocusedIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [localCurrentLocation, setLocalCurrentLocation] = useState<object | null>(currentLocation);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 10 });
  const isFocused = useIsFocused();

  const fetchData = useCallback(async () => {
    try {
      const newData: TypeProducts[] = await getExploreData(
        localCurrentLocation,
        page,
        user?.userID.toString()
      );

      setData((prevData: TypeProducts[]) => [...prevData, ...newData]);
    } catch (error) {
      console.error("Error fetching explore data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [localCurrentLocation, page, user]);

  const { isRefreshing, onRefresh } = useRefreshData([fetchData]);

  useEffect(() => {
    setLocalCurrentLocation(currentLocation);
  }, [currentLocation]);

  const handleEndReached = () => {
    setPage((prevPage) => prevPage + 1);
    fetchData();
  };

  const updateMainTutorialStatus = useCallback(async () => {
    try {
      const tutorialStatus = await getTutorialStatus('main');
      if (tutorialStatus === null) {
        setIsVisible(true);
        await setTutorialStatus('main', 'shown');
      } else if (tutorialStatus === 'shown') {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } catch (error) {
      console.error('Error updating main tutorial status:', error);
    }
  }, []);

  useEffect(() => {
    updateMainTutorialStatus();
  }, [updateMainTutorialStatus]);

  const handleSwipeUp = async () => {
    setIsVisible(false);
    try {
      await setTutorialStatus('main', 'false');
    } catch (error) {
      console.error('Error updating main tutorial status:', error);
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setFocusedIndex(index);
      setLastFocusedIndex(index);
    }
  });

  useEffect(() => {
    if (isFocused) {
      handleEndReached();
    }
  }, [isFocused]);

  useEffect(() => {
    if (!isFocused) {
      setFocusedIndex(null);
    } else {
      setFocusedIndex(lastFocusedIndex);
    }
  }, [isFocused]);

  

  const renderItem = useCallback(({ item, index }) => (
    <RenderItem
      key={item.id}
      item={item}
      focusedIndex={focusedIndex}
      index={index}
    />
  ), [focusedIndex]);


  return (
    <FlexContainer newStyle={styles.container}>
      <Heading isFocused={isFocused} />
      <SwipeUpIntro onSwipeUp={handleSwipeUp} isVisible={isVisible} />
      <FlatList
        data={data}
        snapToInterval={SIZES.height - responsiveFontSize(80)}
        decelerationRate="fast"
        horizontal={false}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={false}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
        onEndReached={handleEndReached}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
      />
    </FlexContainer>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.dark,
    height: SIZES.height,
    width: SIZES.width,
    flex: 1,
  },
});

export default Main;