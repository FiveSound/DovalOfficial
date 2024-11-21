import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  NavigationState,
  SceneMap,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import useTheme from '../../../../hooks/useTheme';
import {
  COLORS,
  FONTS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';
import FlexContainer from '../../FlexContainer';


type Props = {
  routes: { key: string; title: string }[];
  scenes: { [key: string]: React.ComponentType<any> };
};

const TabsMain = ({ routes, scenes }: Props) => {
  const [index, setIndex] = useState(0);
  const { backgroundMaingrey, borderInput, Description } = useTheme();

  const renderScene = SceneMap(scenes);

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<{ key: string; title: string }>;
    },
  ) => (
    <>
      <FlexContainer
        newStyle={[
          styles.flexContainer,
          {
            borderColor: borderInput,
          },
        ]}
      >
        <TabBar
          {...props}
          scrollEnabled={false}
          style={[styles.tabBar, { backgroundColor: backgroundMaingrey }]}
          indicatorContainerStyle={styles.indicatorContainer}
          labelStyle={styles.label}
          inactiveColor={Description}
          indicatorStyle={styles.indicator}
        />
      </FlexContainer>
    </>
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: SIZES.width }}
      renderTabBar={renderTabBar}
      style={styles.tabView}
    />
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    borderWidth: SIZES.borderWidth,
    borderRadius: SIZES.radius,
    padding: SIZES.gapSmall,
  },
  tabBar: {
    width: SIZES.BtnWidth,
    height: responsiveFontSize(40),
    borderRadius: SIZES.radius,
  },
  indicatorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: COLORS.dark,
    ...FONTS.semi14,
    textTransform: 'none',
  },
  indicator: {
    backgroundColor: COLORS.primary,
    maxHeight: responsiveFontSize(40),
    height: responsiveFontSize(40),
    borderRadius: SIZES.radius,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabView: {
    height: SIZES.height / 1,
    flex: 1,
  },
});

export default TabsMain;
