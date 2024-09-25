import React from 'react'
import { RefreshControl as RNRefreshControl, RefreshControlProps } from 'react-native'

type Props = RefreshControlProps

const RefreshControl = (props: Props) => {
  return (
    <RNRefreshControl {...props} />
  )
}

export default RefreshControl