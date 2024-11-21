import React, { memo } from 'react';
import FlexContainer from '../FlexContainer';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { StyleSheet } from 'react-native';
import Typography from '../Typography';
import { useTheme } from '../../../hooks';
import { Pressable, TouchableOpacity } from '../../native';

type Props = {
  focused: boolean;
  label: string;
  focusedIcon: React.ReactNode;
  unfocusedIcon: React.ReactNode;
  isDrawer?: boolean;
  onPress?: () => void;
};

const MenuItems = memo((props: Props) => {
  const { focused, label, focusedIcon, unfocusedIcon, isDrawer = false, onPress } = props;
  const { Description } = useTheme();

  if (isDrawer) {
    return (
      <TouchableOpacity 
      onPress={onPress}
      style={styles.drawerContainer}
      >
        {focused ? focusedIcon : unfocusedIcon}
        <Typography
          variant="SubDescription"
          newStyle={{
            ...styles.iconText,
            color: focused ? COLORS.primary : Description,
            ...(FONTS.semi16),
          }}
        >
          {label}
        </Typography>
      </TouchableOpacity>
    );
  }

  if (!isDrawer) {
    return (
      <Pressable onPress={onPress} style={styles.iconContainer}>
        {focused ? focusedIcon : unfocusedIcon}
        <Typography
          variant="SubDescription"
          newStyle={{
            ...styles.iconText,
            color: focused ? COLORS.primary : Description,
            ...(focused ? FONTS.semi14 : FONTS.semi14),
          }}
        >
          {label}
        </Typography>
      </Pressable>
    );
  }
});

export const styles = StyleSheet.create({
  tabBarStyle: {
    width: SIZES.width,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 0,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: SIZES.margin / 2,
    width: SIZES.width / 5,
    backgroundColor: 'transparent',
  },
  iconText: {},
  drawerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
export default MenuItems;
