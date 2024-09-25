import React from 'react'
import { Text as RNText, TextProps } from 'react-native'
import { useTheme } from '../../../hooks'

type Props = TextProps

const Text = (props: Props) => {
const { Title } = useTheme()
return (
  <RNText style={[props.style, { color: Title }]} {...props} />
)
}

export default Text