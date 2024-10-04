import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../../hooks'
import { FlexContainer, ScreenEmpty } from '..'
import { Ilustrations } from '../../../constants'
import i18next from '../../../Translate'
import { FONTS, SIZES } from '../../../constants/theme'
import { SafeAreaView } from '../../native'

const ScreenBuild = () => {
    const { BackgroundMain } = useTheme()
    const navigation = useNavigation()
        return (
            <SafeAreaView 
            style={{
                flex: 1,
                backgroundColor: BackgroundMain
            }}>
                <ScreenEmpty
                    labelPart1={i18next.t('This screen is under construction')}
                    subLabel={i18next.t('We are working to improve your experience! This screen will be available soon with exciting new features. Thank you for your patience and understanding.')}
                    labelStylePart1={{
                        ...FONTS.heading44,
                        textAlign: 'center',
                    }}
                    source={Ilustrations.CharcoPet}
                    ImgWidth={SIZES.width}
                    ImgHeigth={SIZES.height / 2}
                    labelButton='Go back'
                    colorVariant='primary'
                    top={false}
                    onPress={() => navigation.goBack()}
                />
            </SafeAreaView>
        )
    }
export default  ScreenBuild
    