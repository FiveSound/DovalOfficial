import React from 'react';
import FlexContainer from '../../FlexContainer';
import IsLoading from '../IsLoading';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks';
import { SafeAreaView } from '@/src/components/native';

type Props = {
  label?: string;
};

const LoadingScreen = (props: Props) => {
  const { label } = props;
  const { Bg } = useTheme();
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: Bg }]}>
      <IsLoading size="large" label={label} showLabel={true} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default LoadingScreen;
