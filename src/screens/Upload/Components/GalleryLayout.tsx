import React, { ReactNode } from 'react'
import { useTheme } from '../../../hooks'
import { SafeAreaView } from '../../../components/native'

type Props = {
    children: ReactNode
}

const GalleryLayout = ({children}: Props) => {
  const { BackSecundary, BackgroundMain } = useTheme()
  return (
    <SafeAreaView
    style={{
      backgroundColor: BackgroundMain,
      flex: 1
    }}>
        {children}
    </SafeAreaView>
  )
}

export default GalleryLayout