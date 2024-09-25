import React from 'react'
import { StyleSheet } from 'react-native'
import { responsiveFontSize, SIZES } from '../../../constants/theme'
import { Avatars, FlexContainer } from '../../../components/custom';
import { Image  } from '../../../components/native';
type Props = {
    banner: string;
    avatar: string
}

const BannerBusiness = (props: Props) => {
    const { banner, avatar } = props;
    return (
        <FlexContainer>
            <Image
                source={{ uri: banner }}
                cachePolicy='memory-disk'
                priority='high'
                style={styles.banner}
                contentFit='cover'
            />
            <FlexContainer style={styles.containerAvatar}>
                <Avatars
                    source={avatar}
                    size='large' 
                    ShowStatus={false}
                    />
            </FlexContainer>
        </FlexContainer>
    )
}


const styles = StyleSheet.create({
    banner: {
        width: SIZES.width,
        height: SIZES.height / 4,
        borderBottomRightRadius: SIZES.gapLarge,
        borderBottomLeftRadius: SIZES.gapLarge
    },
    containerAvatar: {
        position: 'relative',
        backgroundColor: 'transparent',
        left: SIZES.width / 14,
        width: responsiveFontSize(48),
        bottom: SIZES.height / 24
    }
})
export default BannerBusiness