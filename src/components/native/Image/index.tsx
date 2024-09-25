import React from 'react'
import { Image as RNImage, ImageProps} from 'expo-image';


type Props = ImageProps

const Image = (props: Props) => {
  return (
    <RNImage {...props} />
  )
}

export default Image