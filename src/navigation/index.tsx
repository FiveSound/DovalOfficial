import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import HomeStack from './HomeStack';
import ProfileStack from './ProfileStack';
import BottomTabBar from './BottomTabBar';
import { FlexContainer } from '../components/custom';
import MainStackt from './MainStack';
import { TabBarVisibilityProvider, TabBarVisibilityContext } from '../context/TabBarVisibilityContext';
import StackChatIa from './StackChatIa';
import { ActiveTabContext } from '../context/ActiveTabContext'

const RootNavigator = () => {
  const { activeTab, setActiveTab } = useContext(ActiveTabContext);
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'Feed':
        return <MainStackt />;
      // case 'ChatIa':
      //   return <StackChatIa />;
      case 'Portal':
        return <HomeStack />;
      case 'Home':
        return <HomeStack />;
      case 'Profile':
        return <ProfileStack />;
      default:
        return <MainStackt />;
    }
  };

  return (
    <TabBarVisibilityProvider>
      <TabBarVisibilityContext.Consumer>
        {({ isTabBarVisible }) => (
          <>
            <FlexContainer newStyle={styles.content}>{renderActiveTab()}</FlexContainer>
            <BottomTabBar activeTab={activeTab} setActiveTab={setActiveTab} />
          </>
        )}
      </TabBarVisibilityContext.Consumer>
    </TabBarVisibilityProvider>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});

export default RootNavigator;