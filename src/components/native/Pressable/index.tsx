import React from 'react'
import { Pressable as RNPressable, PressableProps } from 'react-native'

type Props = PressableProps

const Pressable = (props: Props) => {
  return (
    <RNPressable {...props} />
  )
}

export default Pressable