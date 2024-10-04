import React from 'react'
import { StyleSheet } from 'react-native'
import { FlexContainer, Icons, Typography } from '../../../../../components/custom'
import { useTheme } from '../../../../../hooks'
import { responsiveFontSize, SIZES } from '../../../../../constants/theme'
import { PlusSignIcon } from '../../../../../constants/IconsPro'
import { TouchableOpacity, useNavigation } from '../../../../../components/native'
import { Image } from '../../../../../components/native'
import { iconsNative } from '../../../../../constants'

const AddPayment = () => {
const {backgroundMaingrey, borderInput, Title, BackgroundMain} = useTheme()
const navigation = useNavigation()
const handleAddCard = () => {
  navigation.navigate('AddCardGeneral')
}
  return (
    <TouchableOpacity 
    onPress={handleAddCard}
    style={[styles.addCardContainer, {
        borderColor: borderInput,
        backgroundColor: backgroundMaingrey
      }]}>
        <Icons 
        onPress={handleAddCard}
        appendIcons={<PlusSignIcon color={BackgroundMain} 
        width={SIZES.icons / 1.2}
        height={SIZES.icons / 1.2}
        />}
        styles={{
          backgroundColor: Title,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 200,
          width: responsiveFontSize(34),
          height: responsiveFontSize(34),
        }}
        />
        <Typography variant='subtitle' newStyle={{textAlign: 'center'}}>Add credit or debit card</Typography>
        <FlexContainer variant='row' newStyle={{gap: SIZES.gapSmall}}>
          <Image
          contentFit='contain'
          source={iconsNative.visa}
          style={{width: SIZES.icons * 2, height: SIZES.icons * 2}}
          />
          <Image
          contentFit='contain'
          source={iconsNative.masterCard}
          style={{width: SIZES.icons * 2, height: SIZES.icons * 2}}
          />
        </FlexContainer>
      </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    addCardContainer: {
        borderWidth: SIZES.borderWidth,
        borderRadius: SIZES.radius,
        padding: SIZES.gapMedium,
        marginBottom: SIZES.gapMedium,
        alignItems: 'center',
        width: '100%'
      }
})
export default AddPayment