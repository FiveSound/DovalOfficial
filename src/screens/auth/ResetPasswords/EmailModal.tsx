import React from "react";
import i18next from "../../../Translate";
import { Ilustrations } from "../../../constants";
import useTheme from "../../../hooks/useTheme";
import { Modal } from "@/src/components/native";
import { Buttons, Container, FlexContainer, Hero, Icons, InputLabel } from "@/src/components/custom";
import { Clock03Icon, CloseIcon } from "@/src/constants/IconsPro";
import { SIZES } from "@/src/constants/theme";


interface EmailModalProps {
    visible: boolean;
    emailInput: string;
    setEmailInput: (email: string) => void;
    onEmailSubmit: () => void;
    onClose: () => void;
}

const EmailModal = ({ visible, emailInput, setEmailInput, onEmailSubmit, onClose }: EmailModalProps) => {
    const { Title } = useTheme()
    const isValidEmail = (email: string) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    return (
        <Modal
            visible={visible}
            onRequestClose={onClose}
            transparent={false}
        >
         
            <Container>
            <Icons
                appendIcons={<CloseIcon width={SIZES.icons} height={SIZES.icons} color={Title}/>}
                onPress={onClose}
                styles={{
                    width: '10%',
                    marginLeft: SIZES.gapLarge,
                    borderRadius: SIZES.radius2,
                }}
            />
                <FlexContainer
                    newStyle={{
                        flex: 1,
                    }}>
                    <Hero
                        label={i18next.t('Reset your password easily')}
                        sublabel={i18next.t('Reset your password Enter your email and receive a code to quickly update your password. Reconnect with your passion for gastronomy!')}
                    />
                    <InputLabel
                        placeholder={i18next.t('Email')}
                        value={emailInput}
                        onChangeText={setEmailInput}
                        label={i18next.t('What is my email?')}

                    />
                    <FlexContainer
                        newStyle={{
                            alignItems: 'center'
                        }}>
                        <Buttons
                            label={i18next.t('Send code')}
                            variant={isValidEmail(emailInput) ? 'primary' : 'disabled'}
                            variantLabel={isValidEmail(emailInput) ? 'secondary' : 'disabled'}
                            disabled={!isValidEmail(emailInput)}
                            onPress={onEmailSubmit}
                        />
                    </FlexContainer>
                </FlexContainer>
            </Container>
        </Modal>
    );
};

export default EmailModal;