import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import {
  SafeAreaView,
  useNavigation,
  View,
} from '../../../components/native';
import styles from '../styles';
import { useTheme } from '../../../hooks';
import Heading from './Heading';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux';

type Props = {
  children: React.ReactNode;
  data: {
    username?: string;
    verify?: boolean;
    userID?: string;
  };
  isRefreshing: boolean;
  onRefresh: () => void;
};

const LayoutProfile = (props: Props) => {
  const { user } = useAppSelector((state: RootState) => state.auth);
  const { children, data, isRefreshing, onRefresh } = props;
  const { BackgroundMain } = useTheme();
  const navigation = useNavigation();

  const renderHeader = () => (
    <>
      {data.username !== user?.username ? (
        <Heading
          username={data?.username || ''}
          verify={data?.verify || false}
          action={data?.userID === user?.userID}
          Arrowback={false}
          ArrowbackNavigation={true}
          onPressMenu={() => console.log('press')}
        />
      ) : (
        <Heading
          username={data.username}
          verify={data?.verify === true}
          action={data.username === user?.username}
          Arrowback={data.username !== user?.username}
          ArrowbackNavigation={false}
          onPressMenu={() => navigation.navigate('SettingStack')}
        />
      )}
    </>
  );

  const renderItem: ListRenderItem<number> = () => (
    <>
      {children}
    </>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: BackgroundMain }]}
    >
      <FlatList
        data={[1]}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LayoutProfile;