import React from 'react';
import FlexContainer from '../FlexContainer';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { StyleSheet } from 'react-native';
import Typography from '../Typography';
import { useTheme } from '../../../hooks';
import { TouchableOpacity } from '../../native';

type Props = {
  focused: boolean;
  label: string;
  focusedIcon: React.ReactNode;
  unfocusedIcon: React.ReactNode;
  isDrawer?: boolean;
  onPress?: () => void;
};

const MenuItems = (props: Props) => {
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
      <FlexContainer newStyle={styles.iconContainer}>
        {focused ? focusedIcon : unfocusedIcon}
        <Typography
          variant="SubDescription"
          newStyle={{
            ...styles.iconText,
            color: focused ? COLORS.primary : Description,
            ...(focused ? FONTS.semi14 : FONTS.text14),
          }}
        >
          {label}
        </Typography>
      </FlexContainer>
    );
  }
};

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
