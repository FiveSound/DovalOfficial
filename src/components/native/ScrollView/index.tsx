import React from 'react'
import { ScrollView as RNScrollView, ScrollViewProps } from 'react-native'

type Props = ScrollViewProps

const ScrollView = (props: Props) => {
  return (
    <RNScrollView {...props} />
  )
}

export default ScrollView