import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Layout,
  LiveOrders,
  Categories,
  Restaurants,
} from './components';
import { View } from '../../components/native';
import { SIZES } from '../../constants/theme';
import { LoadingScreen, SignupAlert } from '../../components/custom';
import { useAppSelector } from '../../redux';
import { RootState } from '../../redux/store';
import i18next from '../../Translate';

const Home = () => {

  const tabs = [
    {
      key: 'Restaurants',
      title: i18next.t('Restaurants'),
      content: <Restaurants />,
    }
  ];

  const { isLoadingApp, isAuthenticated, business, user } = useAppSelector(
    (state: RootState) => state.auth,
  );

  if (isLoadingApp) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated && !isLoadingApp) {
    return <SignupAlert />;
  }


  return (
    <Layout Append={<LiveOrders />}>
      <View style={styles.marginBottom} />
      <Categories />
      <View style={styles.marginBottom} />
      <Restaurants />
    </Layout>
  );
};

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: SIZES.gapMedium,
  },
});

export default Home;
