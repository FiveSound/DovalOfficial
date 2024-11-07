import React, { ReactNode } from 'react';
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  useNavigation,
  View,
} from '../../../components/native';
import styles from '../styles';
import { useTheme } from '../../../hooks';
import Heading from './Heading';
import { useAuth } from '../../../context/AuthContext';
import { RootState } from '../../../redux/store';
import { useAppSelector } from '../../../redux';

type Props = {
  children: ReactNode;
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: BackgroundMain }]}
    >
      {data.username !== user?.username ? (
        <Heading
          username={data?.username || ''}
          verify={data?.verify || false}
          action={data?.userID === user?.userID ? true : false}
          Arrowback={false}
          ArrowbackNavigation={true}
          onPressMenu={() => console.log('press')}
        />
      ) : (
        <Heading
          username={data.username}
          verify={data?.verify === true ? true : false}
          action={data.username == user?.username ? true : false}
          Arrowback={data.username !== user?.username ? true : false}
          ArrowbackNavigation={false}
          onPressMenu={() => navigation.navigate('SettingStack')}
        />
      )}
      <View style={[styles.flexContainer, { backgroundColor: BackgroundMain }]}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          refreshControl={
            <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
          }
        >
          {children}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default LayoutProfile;
