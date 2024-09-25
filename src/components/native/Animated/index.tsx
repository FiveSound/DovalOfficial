import React from 'react'
import { Animated as RNSAnimated } from 'react-native'

type Props = {}

const Animated = (props: Props) => {
  return (
    <RNSAnimated.View {...props} />
  )
}

export default Animated