import React, { ReactNode } from 'react';
import { TouchableOpacity } from '../../native';
import * as Haptics from 'expo-haptics';
import { StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../../hooks';
import { SIZES } from '../../../constants/theme';

type Props = {
  appendIcons: ReactNode;
  onPress?: () => void;
  styles?: ViewStyle;
};

const Icons = (props: Props) => {
  const { appendIcons, onPress, styles: customStyles } = props;
  const { backgroundMaingrey } = useTheme();
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: backgroundMaingrey },
        customStyles,
      ]}
      onPress={handlePress}
    >
      {appendIcons}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapMedium,
    borderRadius: SIZES.smallRadius,
    height: SIZES.BtnHeight / 1.2,
  },
});
export default Icons;
