import React from 'react';
import * as Haptics from 'expo-haptics';
import { StyleProp, TextStyle, ViewStyle } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { TouchableOpacity } from '../../../native';
import Typography from '../../Typography';
import IsLoading from '../../Loaders/IsLoading';

type ColorVariant = 'primary' | 'secondary' | 'default';
type SizeVariant = 'small' | 'medium' | 'full';

interface TextButtonProps {
  buttonContainerStyle?: StyleProp<ViewStyle>;
  label: string;
  disabled?: boolean;
  onPress: () => void;
  colorVariant?: ColorVariant;
  sizeVariant?: SizeVariant;
  labelStyle?: TextStyle;
  isSubmitting?: boolean;
  LoaderColor?: string;
}

const TextButton: React.FC<TextButtonProps> = ({
  buttonContainerStyle,
  label,
  disabled,
  onPress,
  colorVariant = 'default',
  sizeVariant = 'medium',
  labelStyle,
  isSubmitting = false,
  LoaderColor,
}) => {
  const { borderInput, color, bgInput } = useTheme();

  const colorStyles = {
    primary: { backgroundColor: COLORS.primary, textColor: COLORS.dark },
    secondary: {
      backgroundColor: borderInput,
      textColor: COLORS.primaryDark700,
    },
    default: {
      backgroundColor: COLORS.primaryDark950,
      textColor: COLORS.primary,
    },
  };

  const sizeStyles = {
    small: { width: SIZES.BtnWidth / 3, height: SIZES.BtnHeight / 3 },
    medium: { width: SIZES.BtnWidth / 2, height: SIZES.BtnHeight / 2 },
    full: { width: SIZES.BtnWidth, height: SIZES.BtnHeight },
  };

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={[
        {
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: SIZES.gapMedium,
        },
        colorStyles[colorVariant],
        sizeStyles[sizeVariant],
        buttonContainerStyle,
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      {!isSubmitting && (
        <Typography
          newStyle={{
            ...labelStyle,
            color: colorStyles[colorVariant].textColor,
          }}
          variant="H4title"
        >
          {label}
        </Typography>
      )}
      {isSubmitting && <IsLoading />}
    </TouchableOpacity>
  );
};

export default TextButton;
