import React from 'react'
import { TouchableOpacity as RNTouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps

const TouchableOpacity = (props: Props) => {

  return (
    <RNTouchableOpacity {...props} />
  )
}

export default TouchableOpacity