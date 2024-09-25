import React from 'react'
import { TextInput as RNTextInput, TextInputProps } from 'react-native'

type Props = TextInputProps

const TextInput = (props: Props) => {
  return (
    <RNTextInput {...props} />
  )
}

export default TextInput