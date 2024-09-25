import { BlurView } from 'expo-blur'
import React from 'react'
import { Image } from '../../constants/ThemeDark';
import { COLORS, SIZES } from '../../constants';
import { TextButton } from '../../components';
import { responsiveFontSize } from '../../constants/theme';
import { Modal } from 'react-native';
import Avatars from '../../components/Avatars';

type Props = {
    visible: boolean;
    onRequestClose: () => void;
    source: string
}

const AvatarReview = (props: Props) => {
    const { visible, onRequestClose, source } = props

    return (
        <Modal
            transparent={true}
            visible={visible}
            onRequestClose={onRequestClose}
            animationType='fade'
        >
            <BlurView 
            tint='dark'
            intensity={40}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Avatars
                source={source } 
                size='xxxLarge'
                />

            <TextButton
            label='Cerrar'
            sizeVariant='full'
            buttonContainerStyle={{
                marginVertical: SIZES.gapMedium,
                backgroundColor: 'transparent'
            }}
            colorVariant='primary'
            onPress={onRequestClose}
            />
            </BlurView>
        </Modal>
    )
}

export default AvatarReview