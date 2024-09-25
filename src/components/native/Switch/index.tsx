import React from 'react'
import { Switch as RNSwitch, SwitchProps } from 'react-native'

type Props = SwitchProps

const Switch = (props: Props) => {
  return (
    <RNSwitch {...props} />
  )
}

export default Switch