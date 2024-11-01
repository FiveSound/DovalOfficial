import React from 'react';
import { StyleSheet } from 'react-native';
import Signup from '../auth/Signup';
import {
  Layout,
  LiveOrders,
  Categories,
  Restaurants,
  Orders,
} from './components';
import { View } from '../../components/native';
import { SIZES } from '../../constants/theme';
import { LoadingScreen, Tabs } from '../../components/custom';
import { useAppSelector } from '../../redux';
import { RootState } from '../../redux/store';
import i18next from '../../Translate';

const Home = () => {
  const tabs = [
    {
      key: 'Restaurants',
      title: i18next.t('Restaurants'),
      content: <Restaurants />,
    },
    { key: 'Orders', title: i18next.t('Orders'), content: <Orders /> },
  ];

  const { isLoadingApp, isAuthenticated, business, user } = useAppSelector(
    (state: RootState) => state.auth,
  );

  if (isLoadingApp) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !isLoadingApp) {
    return <Signup />;
  }


  return (
    <Layout Append={<LiveOrders />}>
      <View style={styles.marginBottom} />
      <Categories />
      <View style={styles.marginBottom} />
      <Tabs tabs={tabs} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: SIZES.gapMedium,
  },
});

export default Home;
