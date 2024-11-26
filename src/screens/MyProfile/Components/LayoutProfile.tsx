import React from 'react';
import { VirtualizedList, ListRenderItemInfo } from 'react-native';
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
import { FlexContainer } from '@/src/components/custom';

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
    <SafeAreaView>
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
    </SafeAreaView>
  );

  const getItem = (_data: any, index: number) => {
    return index;
  };

  const getItemCount = (_data: any) => {
    return 1;
  };

  const renderItem = ({ item }: ListRenderItemInfo<number>) => (
    <>
      {children}
    </>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: BackgroundMain }]}
    >
      <VirtualizedList
        data={[1]}
        initialNumToRender={1}
        renderItem={renderItem}
        keyExtractor={(item) => item.toString()}
        ListHeaderComponent={renderHeader}
        getItemCount={getItemCount}
        getItem={getItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default LayoutProfile;