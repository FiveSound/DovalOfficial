import React, { ReactNode } from 'react';
import { TouchableOpacity } from '../../../native';
import { Home01Icon } from '../../../../constants/IconsPro';
import Typography from '../../Typography';
import styles from './styles';
import useTheme from '../../../../hooks/useTheme';
import { COLORS } from '../../../../constants/theme';
import { ViewStyle, StyleSheet, TextProps, TextStyle } from 'react-native';

type Props = {
  label: string;
  orientationsIcons?: 'Left' | 'Right';
  onPress?: () => void;
  Icons?: ReactNode;
  containerButtons?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
};

const ButtonIcons = (props: Props) => {
  const {
    label,
    orientationsIcons = 'Left',
    onPress,
    Icons,
    containerButtons,
    labelStyle,
  } = props;
  const { borderInput } = useTheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={StyleSheet.flatten([
        styles.container,
        containerButtons,
        {
          borderColor: borderInput,
        },
      ])}
    >
      {orientationsIcons === 'Left' && Icons}
      <Typography
        variant="SubDescription"
        numberOfLines={2}
        newStyle={StyleSheet.flatten([styles.text, labelStyle])}
      >
        {label}
      </Typography>
      {orientationsIcons === 'Right' && Icons}
    </TouchableOpacity>
  );
};

export default ButtonIcons;
