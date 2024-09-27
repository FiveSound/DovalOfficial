import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../hooks';
import { FONTS, SIZES } from '../../../../constants/theme';
import { ArrowDown01Icon, ArrowDown01IconStroke, LoginMethodIcon, SafeDelivery01Icon, SecurityCheckIconSharp } from '../../../../constants/IconsPro';
import { FlexContainer, InfoCard } from '../../../../components/custom';
import { useDispatch } from 'react-redux';
import { closeModalPin } from '../../../../redux/slides/modalSlice';
import i18next from '../../../../Translate';

const ModalPin = () => {
    const { backgroundMaingrey, Title } = useTheme();
    const dispatch = useDispatch()
    const handleClose = () => {
        dispatch(closeModalPin()); 
    }

    return (
        <FlexContainer newStyle={[styles.container, { backgroundColor: backgroundMaingrey }]}>
              <TouchableOpacity onPress={handleClose}>
              <InfoCard
                icon={<ArrowDown01IconStroke  width={SIZES.icons * 1.4} height={SIZES.icons * 1.4} color={Title}/>}
                title={i18next.t("Confirm delivery with your Pin")}
                description={i18next.t("After you get your order, tell the delivery person your PIN.")}  
                orientation='RIGHT'
            />
              </TouchableOpacity>
            <InfoCard
                icon={<SecurityCheckIconSharp  width={SIZES.icons * 1.4} height={SIZES.icons * 1.4} color={Title}/>}
                title={i18next.t("Fraud Protection")}
                description={i18next.t("The unique PIN ensures only you can confirm the delivery, preventing fraud.")}
            />
            <InfoCard
                icon={<SafeDelivery01Icon  width={SIZES.icons * 1.4} height={SIZES.icons * 1.4} color={Title}/>}
                title={i18next.t("Secure Delivery")}
                description={i18next.t("Provide the PIN to the delivery person to ensure your order reaches you.")}
            />
            <InfoCard
                icon={<LoginMethodIcon  width={SIZES.icons * 1.4} height={SIZES.icons * 1.4} color={Title}/>}
                title={i18next.t("Delivery Verification")}
                description={i18next.t("Use the PIN to confirm receipt and avoid delivery mistakes.")}
            />
        </FlexContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: SIZES.gapLarge,
        width: SIZES.width,
    },
    header: {
        ...FONTS.heading24,
        marginBottom: SIZES.gapMedium,
    },
});

export default ModalPin;