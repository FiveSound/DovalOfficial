import React, { CSSProperties } from 'react';
import { View, ViewStyle, useColorScheme } from 'react-native';
import { useTheme } from '../../../hooks';
import { SIZES } from '../../../constants/theme';

interface LineDividerProps {
  lineStyle?: ViewStyle;
  variant?: 'primary' | 'secondary';
}

const LineDivider: React.FC<LineDividerProps> = ({
  lineStyle,
  variant = 'primary',
}) => {
  const { border } = useTheme();
  const getVariant = () => {
    switch (variant) {
      case 'primary':
        return SIZES.borderWidth;
      case 'secondary':
        return SIZES.gapMedium;
      default:
        return SIZES.borderWidth;
    }
  };

  const style: ViewStyle = {
    height: getVariant(),
    width: '100%',
    backgroundColor: border,
    ...lineStyle,
  };

  return <View style={style} />;
};

export default LineDivider;
