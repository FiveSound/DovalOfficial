import React from 'react';
import { StyleSheet, ViewProps } from 'react-native';
import { View } from '../../native';

type Props = {
  variant?: 'row' | 'column';
  newStyle?: ViewProps['style'];
  children: React.ReactNode;
} & ViewProps;

const FlexContainer = ({
  variant = 'column',
  children,
  newStyle,
  ...viewProps
}: Props) => {
  let style;
  switch (variant) {
    case 'row':
      style = [styles.row, newStyle];
      break;
    case 'column':
      style = [styles.column, newStyle];
      break;
    default:
      style = {};
  }

  return (
    <View style={[style, viewProps.style]} {...viewProps}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  column: {
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
});

export default FlexContainer;
