import React from 'react'
import { useColorScheme } from 'react-native'
import { COLORS, ErrorDark, ErrorLight, GreyDark, GreyLight, SuccessDark, SuccessLight } from '../constants/theme'

type Props = {}

const DarkMode = () => {
    const theme = useColorScheme()
    const Background = theme === 'dark' ? COLORS.dark : COLORS.light
    const Grey = theme === 'dark' ? GreyDark : GreyLight
    const Error = theme === 'dark' ? ErrorDark : ErrorLight
    const Success = theme === 'dark' ? SuccessDark : SuccessLight
    const InputBg = Grey.grey100
    const InputBorder = Grey.grey200
    const SecundaryText = Grey.grey500
    const Primarytext = theme === 'dark' ? COLORS.light : COLORS.dark

    return {
        Background,
        Grey,
        Error,
        Success,
        InputBg,
        InputBorder,
        SecundaryText,
        Primarytext
    }
}

export default DarkMode