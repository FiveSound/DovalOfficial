import React from 'react';
import { View as RNView, ViewProps } from 'react-native';
import useTheme from '../../../hooks/useTheme';

type Props = ViewProps;

const View = (props: Props) => {
  const { BackgroundMain } = useTheme();
  return (
    <RNView
      {...props}
      style={[{ backgroundColor: BackgroundMain }, props.style]}
    />
  );
};

export default View;
