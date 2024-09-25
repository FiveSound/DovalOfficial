import React, { ReactNode } from 'react'
import { TouchableOpacity } from '../../native'

type Props = {
    onPress: () => void;
    children: React.ReactNode;
}

const Actions = (props: Props) => {
const { onPress, children } = props
  return (
    <TouchableOpacity
    onPress={onPress}>
         {children}
    </TouchableOpacity>
  )
}

export default Actions