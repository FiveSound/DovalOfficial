import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { TouchableOpacity } from '../../native';
import FlexContainer from '../FlexContainer';
import Typography from '../Typography';
import styles from './styles';
import { COLORS, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';

type Tab = {
  key: string;
  title: string;
  content: React.ReactNode;
};

type Props = {
  tabs: Tab[];
  isBorder?: boolean;
};

const Tabs: React.FC<Props> = ({ tabs, isBorder = false  }) => {
  const { borderInput } = useTheme();
  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const screenWidth = Dimensions.get('window').width;
  const scrollX = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef<ScrollView>(null);
  const tabWidth = screenWidth / tabs.length;
  const tabTranslateX = scrollX.interpolate({
    inputRange: [0, screenWidth * (tabs.length - 1)],
    outputRange: [0, tabWidth * (tabs.length - 1)],
  });

  const handleMomentumScrollEnd = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
  ) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / screenWidth);
    setActiveTab(tabs[index].key);
  };

  const handleTabPress = useCallback(
    (key: string, index: number) => {
      if (activeTab !== key) {
        setActiveTab(key);
      }
    },
    [activeTab],
  );

  useEffect(() => {
    const index = tabs.findIndex(tab => tab.key === activeTab);
    scrollViewRef.current?.scrollTo({ x: index * screenWidth, animated: true });
  }, [activeTab, screenWidth, tabs]);

  return (
    <FlexContainer newStyle={styles.container}>
      <FlexContainer newStyle={[styles.tabHeaders, {
        borderBottomWidth: isBorder ? SIZES.borderWidth : 0,
        borderColor: isBorder ? borderInput : 'transparent',
      }]}>
        {tabs.map((tab, index) => (
          <TouchableOpacity
            key={tab.key}
            style={styles.tabHeader}
            onPress={() => handleTabPress(tab.key, index)}
          >
            <Typography
              variant="H4title"
              newStyle={StyleSheet.flatten([
                styles.tabTitle,
                activeTab === tab.key && styles.activeTabTitle,
              ])}
            >
              {tab.title}
            </Typography>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.activeTabIndicator,
            { width: tabWidth, transform: [{ translateX: tabTranslateX }] },
          ]}
        />
      </FlexContainer>
      <Animated.ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true },
        )}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        style={styles.tabContent}
      >
        {tabs.map(tab => (
          <FlexContainer key={tab.key} newStyle={{ width: screenWidth }}>
            {tab.content}
          </FlexContainer>
        ))}
      </Animated.ScrollView>
    </FlexContainer>
  );
};

export default Tabs;
