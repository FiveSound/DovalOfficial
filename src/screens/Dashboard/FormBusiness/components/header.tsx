import React from 'react';
import { SafeAreaView, TouchableOpacity } from '../../../../components/native';
import {
  Buttons,
  LineDivider,
  Typography,
} from '../../../../components/custom';
import { styles } from '../styles';
import { useTheme } from '../../../../hooks';

type Props = {
  label: string;
  disabled?: boolean;
  onPress?: () => void;
  loading?: boolean;
  variant?:
    | 'primary'
    | 'secondary'
    | 'disabled'
    | 'transparent'
    | 'outline'
    | 'error';
  labelButtons: string;
  showDivider?: boolean;
  showBackPersonal?: boolean;
  onPressBack?: () => void;
};

const Header = (props: Props) => {
  const {
    label,
    disabled,
    onPress,
    loading,
    variant,
    labelButtons,
    showDivider = true,
    showBackPersonal = true,
    onPressBack,
  } = props;
  const { backgroundMaingrey } = useTheme();
  return (
    <>
      <SafeAreaView style={styles.header}>
        {showBackPersonal ? (
          <></>
        ) : (
          <TouchableOpacity
            onPress={onPressBack}
            style={[
              styles.backPersonal,
              { backgroundColor: backgroundMaingrey },
            ]}
          >
            <Typography variant="H4title"> Back</Typography>
          </TouchableOpacity>
        )}
        <Typography variant="subtitle" testID="header-label">
          {label}
        </Typography>
        <Buttons
          label={labelButtons}
          disabled={disabled}
          onPress={onPress}
          loading={loading}
          variant={variant}
          containerButtons={styles.containerButtons}
          variantLabel={variant === 'disabled' ? 'Primary' : 'secondary'}
          color={variant === 'disabled' ? 'dark' : 'dark'}
          testID="header-button"
        />
      </SafeAreaView>
      {showDivider && <LineDivider variant="secondary" />}
    </>
  );
};

export default Header;