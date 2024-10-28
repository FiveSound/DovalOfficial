import { ReactNode, useCallback, useEffect, useState } from 'react';
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from 'react-native-tab-view';
import useTheme from '../../../../hooks/useTheme';
import DarkMode from '../../../../hooks/DarkMode';
import { COLORS, responsiveFontSize, SIZES } from '../../../../constants/theme';
import {
  AllBookmarkIcon,
  AllBookmarkIconStroke,
  StoreAdd02Icon,
  StoreAdd02IconStroke,
  DashboardSquare03IconStroke,
  DashboardSquare03Icon,
  SentIconReaction,
} from '../../../../constants/IconsPro';
import { FlexContainer } from '../../../../components/custom';

type Props = {
  MyPosts: ReactNode;
  MySaves: ReactNode;
  MyMenu: ReactNode;
  Myshares: ReactNode;
  showMyShares?: boolean;
  showStore?: boolean;
};

interface Route {
  key: string;
  icons: any;
}

const TabsMyProfile = (props: Props) => {
  const [index, setIndex] = useState(0);
  const { borderInput } = useTheme();
  const { SecundaryText } = DarkMode();
  const [routes] = useState([
    { key: 'first' },
    { key: 'second' },
    { key: 'five' },
    { key: 'third' },
  ]);

  const renderScene = useCallback(
    ({ route }: { route: Route }) => {
      switch (route.key) {
        case 'first':
          return props.MyPosts;
        case 'second':
          return props.MyMenu;
        case 'third':
          return props.MySaves;
        case 'five':
          return props.Myshares;
        default:
          return null;
      }
    },
    [props.MyPosts, props.MyMenu, props.MySaves, props.Myshares],
  );

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>;
    },
  ) => (
    <TabBar
      {...props}
      scrollEnabled={false}
      style={{
        backgroundColor: 'transparent',
        zIndex: 1,
        borderBottomWidth: responsiveFontSize(1),
        borderColor: borderInput,
        width: SIZES.width,
        shadowColor: 'transparent',
      }}
      indicatorStyle={{
        backgroundColor: COLORS.primary,
        width: SIZES.width / 4,
      }}
      renderLabel={({ route, focused }) => {
        let IconComponent;
        switch (route.key) {
          case 'first':
            IconComponent = focused ? (
              <FlexContainer
                newStyle={{
                  width: SIZES.width / 4,
                }}
              >
                <DashboardSquare03Icon
                  width={SIZES.icons}
                  height={SIZES.icons}
                  color={focused ? COLORS.primary : SecundaryText}
                />
              </FlexContainer>
            ) : (
              <DashboardSquare03IconStroke
                width={SIZES.icons}
                height={SIZES.icons}
                color={focused ? COLORS.primary : SecundaryText}
              />
            );
            break;
          case 'second':
            IconComponent = focused ? (
              <StoreAdd02Icon
                width={SIZES.icons}
                height={SIZES.icons}
                color={focused ? COLORS.primary : SecundaryText}
              />
            ) : (
              <StoreAdd02IconStroke
                width={SIZES.icons}
                height={SIZES.icons}
                color={focused ? COLORS.primary : SecundaryText}
              />
            );
            break;
          case 'five':
            IconComponent = (
              <SentIconReaction
                width={SIZES.icons}
                height={SIZES.icons}
                color={focused ? COLORS.primary : SecundaryText}
              />
            );
            break;
          case 'third':
            IconComponent = focused ? (
              <AllBookmarkIcon
                width={SIZES.icons}
                height={SIZES.icons}
                color={COLORS.primary}
              />
            ) : (
              <AllBookmarkIconStroke
                width={SIZES.icons}
                height={SIZES.icons}
                color={SecundaryText}
              />
            );
            break;
          default:
            IconComponent = null;
        }
        return IconComponent;
      }}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: SIZES.width }}
      renderTabBar={renderTabBar}
      lazy={true}
      lazyPreloadDistance={0}
      style={{
        flex: 1,
      }}
    />
  );
};

export default TabsMyProfile;
