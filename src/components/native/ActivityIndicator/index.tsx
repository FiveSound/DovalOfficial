import React from 'react'
import { ActivityIndicator as RNActivityIndicator, ActivityIndicatorProps } from 'react-native'

type Props = ActivityIndicatorProps

const ActivityIndicator = (props: Props) => {
  return (
    <RNActivityIndicator {...props} />
  )
}

export default ActivityIndicator