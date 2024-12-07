import React, { ReactNode } from 'react';
import { ActivityIndicator, TouchableOpacity } from '../../../native';
import { StyleSheet, TextStyle, ViewStyle } from 'react-native';
import Typography from '../../Typography';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import IsLoading from '../../Loaders/IsLoading';
import * as Haptics from 'expo-haptics';

type VariantLabel =
  | 'primary'
  | 'secondary'
  | 'disabled'
  | 'Primary'
  | 'error'
  | undefined;

type Props = {
  label: string;
  onPress?: () => void;
  loading?: boolean;
  disabled?: boolean;
  containerButtons?: ViewStyle | ViewStyle[];
  labelStyle?: TextStyle;
  Icons?: ReactNode;
  orientationsIcons?: 'Left' | 'Right';
  variant?: 'primary' | 'secondary' | 'disabled' | 'transparent' | 'error';
  color?: 'primary' | 'dark';
  showLabel?: boolean;
  variantLabel?: VariantLabel;
};

const Buttons = (props: Props) => {
  const {
    onPress,
    disabled,
    label,
    loading,
    containerButtons,
    labelStyle,
    Icons,
    orientationsIcons,
    variant = 'primary',
    color = 'dark',
    showLabel = true,
    variantLabel,
  } = props;
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress && onPress();
  };
  const { backgroundMaingrey, Description, Title } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.primary;
      case 'disabled':
        return backgroundMaingrey;
      case 'transparent':
        return 'transparent';
      case 'error':
        return COLORS.backError;
      default:
        return COLORS.primary;
    }
  };

  const getLabelColor = () => {
    switch (variantLabel) {
      case 'primary':
        return COLORS.primary;
      case 'secondary':
        return COLORS.dark;
      case 'disabled':
        return Description;
      case 'error':
        return COLORS.error;
      default:
        return COLORS.dark;
    }
  };


  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[
        styles.container,
        containerButtons,
        { backgroundColor: getBackgroundColor() },
      ]}
      disabled={disabled}
    >
      {loading && (
        <IsLoading color={color} size="medium" sizesActivityIndicator="small" />
      )}
      {orientationsIcons === 'Left' && Icons}
      {showLabel && (
        <Typography
          variant="SubDescription"
          newStyle={[
            styles.label,
            {
              ...labelStyle,
              color: getLabelColor(),
            },
          ]}
        >
          {label}
        </Typography>
      )}
      {orientationsIcons === 'Right' && Icons}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZES.BtnWidth,
    height: SIZES.BtnHeight / 1.2,
    borderRadius: SIZES.smallRadius,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row-reverse',
  },
  label: {
    ...FONTS.semi14,
    marginHorizontal: SIZES.gapLarge,
  },
});

export default Buttons;
