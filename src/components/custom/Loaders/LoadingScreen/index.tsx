import React from 'react';
import FlexContainer from '../../FlexContainer';
import IsLoading from '../IsLoading';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks';

type Props = {
  label?: string;
};

const LoadingScreen = (props: Props) => {
  const { label } = props;
  const { Bg } = useTheme();
  return (
    <FlexContainer newStyle={[styles.container, { backgroundColor: Bg }]}>
      <IsLoading size="large" label={label} showLabel={true} />
    </FlexContainer>
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
