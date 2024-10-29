import React from 'react';
import { IsLoading } from '../../components/custom';
import { COLORS } from '../../constants/theme';
import { View } from '../../components/native';
type Props = {};

const Splash = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.dark,
      }}
    >
      <IsLoading
        label="IsLoading app"
        showLabel={true}
        style={{ borderColor: COLORS.primary }}
      />
    </View>
  );
};

export default Splash;