import { ReactNode, useCallback, useEffect, useState } from "react";
import {
  NavigationState,
  SceneRendererProps,
  TabBar,
  TabView,
} from "react-native-tab-view";
import { FlexContainer, Typography } from "@/src/components/custom";
import { useTheme } from "@/src/hooks";
import { COLORS, responsiveFontSize, SIZES } from "@/src/constants/theme";
import {
  AllBookmarkIcon,
  AllBookmarkIconStroke,
  DashboardSquare03Icon,
  DashboardSquare03IconStroke,
  SentIconReaction,
  StoreAdd02Icon,
  StoreAdd02IconStroke,
} from "@/src/constants/IconsPro";

type Props = {
  MyPosts: ReactNode;
  MyMenu: ReactNode;
  MySaves?: ReactNode;
  Myshares?: ReactNode;
  showMyShares?: boolean;
  showStore?: boolean;
};

interface Route {
  key: string;
  content: ReactNode;
}

const TabsMyProfile = ({
  MyPosts,
  MyMenu,
  MySaves,
  Myshares,
  showMyShares = false,
  showStore = false,
}: Props) => {
  console.log("TabsMyProfile: Renderizando componente con props:", {
    MyPosts,
    MyMenu,
    MySaves,
    Myshares,
    showMyShares,
    showStore,
  });

  const [index, setIndex] = useState(0);
  const { borderInput, Description } = useTheme();

  // Definir rutas condicionalmente
  const routes: Route[] = [
    { key: "first", content: MyPosts },
    { key: "second", content: MyMenu },
    ...(showStore && MySaves
      ? [{ key: "third", content: MySaves }]
      : []),
    ...(showMyShares && Myshares
      ? [{ key: "five", content: Myshares }]
      : []),
  ];

  console.log("TabsMyProfile: Definidas las rutas:", routes);

  const renderScene = useCallback(
    ({ route }: { route: Route }) => {
      console.log("renderScene: Renderizando escena para la ruta:", route.key);
      return route.content;
    },
    [routes]
  );

  const renderTabBar = useCallback(
    (
      props: SceneRendererProps & {
        navigationState: NavigationState<Route>;
      }
    ) => {
      console.log(
        "renderTabBar: Renderizando TabBar con estado de navegación:",
        props.navigationState
      );
      return (
        <TabBar
          {...props}
          scrollEnabled={true}
          style={{
            backgroundColor: "transparent",
            zIndex: 1,
            borderBottomWidth: responsiveFontSize(1),
            borderColor: borderInput,
            width: SIZES.width,
            height: 60, // Ajuste de altura adecuada
          }}
          indicatorStyle={{
            backgroundColor: COLORS.primary,
            width: SIZES.width / routes.length, // Adaptar al número de pestañas
          }}
          renderLabel={({ route, focused }) => {
            console.log(
              `renderLabel: Ruta ${route.key} está ${
                focused ? "focalizada" : "no focalizada"
              }`
            );
            let IconComponent = null;

            switch (route.key) {
              case "first":
                IconComponent = focused ? (
                  <FlexContainer
                    newStyle={{
                      width: SIZES.width / routes.length,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5, // Sombra para Android
                    }}
                  >
                    <DashboardSquare03Icon
                      width={SIZES.icons / 1.4}
                      height={SIZES.icons / 1.4}
                      color={COLORS.primary}
                    />
                  </FlexContainer>
                ) : (
                  <DashboardSquare03IconStroke
                    width={SIZES.icons / 1.4}
                    height={SIZES.icons / 1.4}
                    color={Description}
                  />
                );
                break;
              case "second":
                IconComponent = focused ? (
                  <FlexContainer
                    newStyle={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <StoreAdd02Icon
                      width={SIZES.icons / 1.4}
                      height={SIZES.icons / 1.4}
                      color={COLORS.primary}
                    />
                  </FlexContainer>
                ) : (
                  <StoreAdd02IconStroke
                    width={SIZES.icons / 1.4}
                    height={SIZES.icons / 1.4}
                    color={Description}
                  />
                );
                break;
              case "third":
                IconComponent = focused ? (
                  <FlexContainer
                    newStyle={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <AllBookmarkIcon
                      width={SIZES.icons / 1.4}
                      height={SIZES.icons / 1.4}
                      color={COLORS.primary}
                    />
                  </FlexContainer>
                ) : (
                  <AllBookmarkIconStroke
                    width={SIZES.icons / 1.4}
                    height={SIZES.icons / 1.4}
                    color={Description}
                  />
                );
                break;
              case "five":
                IconComponent = focused ? (
                  <FlexContainer
                    newStyle={{
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 2 },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                    }}
                  >
                    <SentIconReaction
                      width={SIZES.icons / 1.4}
                      height={SIZES.icons / 1.4}
                      color={COLORS.primary}
                    />
                  </FlexContainer>
                ) : (
                  <SentIconReaction
                    width={SIZES.icons / 1.4}
                    height={SIZES.icons / 1.4}
                    color={Description}
                  />
                );
                break;
              default:
                console.log(
                  "renderLabel: Ruta sin icono asociada:",
                  route.key
                );
                IconComponent = null;
            }

            console.log(
              `renderLabel: IconComponent para ${route.key}:`,
              IconComponent
            );
            return IconComponent;
          }}
        />
      );
    },
    [borderInput, routes, Description]
  );

  useEffect(() => {
    console.log("TabsMyProfile: Índice de pestaña cambiado a:", index);
  }, [index]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={(newIndex) => {
        console.log("TabView: onIndexChange llamado con nuevo índice:", newIndex);
        setIndex(newIndex);
      }}
      initialLayout={{ width: SIZES.width }}
      renderTabBar={renderTabBar}
      style={{
        flex: 1,
      }}
    />
  );
};

export default TabsMyProfile;