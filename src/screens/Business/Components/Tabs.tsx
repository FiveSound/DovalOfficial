import React, { useState , ReactNode} from 'react'
import { NavigationState, Route, SceneMap, SceneRendererProps, TabBar, TabView } from 'react-native-tab-view';
import useTheme from '../../../hooks/useTheme';
import DarkMode from '../../../hooks/DarkMode';
import i18next from '../../../Translate';
import { COLORS, FONTS, responsiveFontSize, SIZES } from '../../../constants/theme';
import { FlexContainer } from '../../../components/custom';

type Props = {
    MenuComponent: ReactNode;
    RecipeComponent: ReactNode;
    OverviewComponent: ReactNode;
};

const Tabs = (props: Props) => {
    const [index, setIndex] = useState(0);
    const { Bg, borderInput, color, backgroundMaingrey } = useTheme()
    const { SecundaryText } = DarkMode()
    const [routes] = useState([
        { key: 'first', title: i18next.t('Menu') },
        { key: 'second', title: i18next.t('Recipes') },
        { key: 'third', title: i18next.t('Overview') },
    ]);

    const renderScene = ({ route }: { route: Route }) => {
        switch (route.key) {
            case "first":
                return props.MenuComponent;
            case "second":
                return props.RecipeComponent;
            case "third":
                return props.OverviewComponent;
            default:
                return null;
        }
    };

    const renderTabBar = (props: SceneRendererProps & 
        { navigationState: NavigationState<{ key: string; title: string }> }) => (
          <FlexContainer 
          newStyle={{
            borderWidth: SIZES.borderWidth / 2,
            borderColor: COLORS.BorderInput,
            borderRadius: SIZES.gapLarge,
            padding: SIZES.gapSmall,
            height: responsiveFontSize(48),
          }}>
              <TabBar
            {...props}
            scrollEnabled={false}
            style={{
                backgroundColor: backgroundMaingrey,
                width: SIZES.BtnWidth ,
                maxHeight: responsiveFontSize(36),
                flex: 1,
                borderRadius: SIZES.gapMedium
            }}
            indicatorContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center',
            }}
            labelStyle={{
                color: COLORS.dark,
                ...FONTS.h4,
                margin: 0,
                padding: 0,
                textTransform: 'none'
            }}
            inactiveColor={SecundaryText}
            indicatorStyle={{
                backgroundColor: COLORS.primary,
                maxHeight: responsiveFontSize(36),
                height: responsiveFontSize(36),
                borderRadius: SIZES.gapMedium,
            }}
        />
          </FlexContainer>
    );

    return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: SIZES.width }}
                renderTabBar={renderTabBar}
                style={{
                    height: SIZES.height,
                    flex: 1,
                    marginTop: SIZES.gapSmall
                }}
            />
    );
};

export default Tabs