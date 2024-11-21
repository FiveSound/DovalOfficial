import React from 'react';
import { Switch as RNSwitch, SwitchProps, Platform, StyleSheet, View } from 'react-native';

type Props = SwitchProps;

const Switch = (props: Props) => {
  return (
    <View style={styles.container}>
      <RNSwitch
        {...props}
        style={Platform.OS === 'ios' ? styles.switch : {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  switch: {
    transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
  },
});

export default Switch;