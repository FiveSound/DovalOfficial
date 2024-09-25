import React from 'react'
import FlexContainer from '../FlexContainer'
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { StyleSheet } from 'react-native'
import Typography from '../Typography'
import { useTheme } from '../../../hooks'

type Props = {
    focused: boolean;
    label: string;
    focusedIcon: React.ReactNode;
    unfocusedIcon: React.ReactNode;
}

const MenuItems = (props: Props) => {
const { focused, label, focusedIcon, unfocusedIcon } = props
const { Description } = useTheme()

  return (
    <FlexContainer newStyle={styles.iconContainer}>
    {focused ? (
      focusedIcon
    ) : (
      unfocusedIcon
    )}
    <Typography variant='SubDescription'
      newStyle={{
        ...styles.iconText,
        color: focused ? COLORS.primary : Description,
        ...(focused ? FONTS.semi14 : FONTS.semi14)
      }}>
      {label}
    </Typography>
  </FlexContainer>
  )
}


export const styles = StyleSheet.create({
    tabBarStyle: {
      width: SIZES.width,
      alignItems: "center",
      justifyContent: "center",
      borderTopWidth: 0,
    },
    iconContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginTop: SIZES.margin / 2,
      width: SIZES.width / 5,
      backgroundColor: 'transparent'
    },
    iconText: {
      marginTop: SIZES.radius2,
    },
  });
export default MenuItems