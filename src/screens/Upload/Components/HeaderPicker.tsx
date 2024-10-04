import React from 'react'
import { Button, SafeAreaView, TouchableOpacity } from 'react-native'
import { Cancel01Icon } from '../../../constants/IconsPro'
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme'

type Props = {
    onPress: () => void;
}

const HeaderPicker = (props: Props) => {
const { onPress } = props
  return (
    <SafeAreaView
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            height: responsiveFontSize(44),
            paddingHorizontal: SIZES.margin / 2,
            zIndex: 1,
            width: SIZES.BtnWidth
          }}>
          <TouchableOpacity onPress={onPress}>
            <Cancel01Icon
              width={SIZES.icons / 1.2}
              height={SIZES.icons / 1.2}
            />
          </TouchableOpacity>
          <Button
            title="Selecionar album"
            color={COLORS.primary}
          />
        </SafeAreaView>
  )
}

export default HeaderPicker