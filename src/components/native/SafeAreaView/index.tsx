import React from 'react';
import { SafeAreaView as RNSafeAreaView } from 'react-native';
import { SafeAreaViewProps } from 'react-native-safe-area-context';
import useTheme from '../../../hooks/useTheme';

type Props = SafeAreaViewProps;

const SafeAreaView = (props: Props) => {
  const { BackgroundMain } = useTheme();
  return (
    <RNSafeAreaView
      {...props}
      style={[props.style ,{ backgroundColor: BackgroundMain } ]}
    />
  );
};

export default SafeAreaView;
