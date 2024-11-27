import { Container, ScreenEmpty } from '@/src/components/custom';
import { Ilustrations } from '@/src/constants';
import { SIZES } from '@/src/constants/theme';
import React from 'react';

const Notifications = () => {
  return (
    <Container
    showHeader={true}
    label='Notificaciones'
    >
        <ScreenEmpty 
        labelPart1='No hay notificaciones'
        subLabel='Sé el primero en recibir notificaciones'
        source={Ilustrations.MessegeNoti}
        ImgWidth={SIZES.width / 1.2}
        ImgHeigth={SIZES.height / 3}
        ShowButton={false}
        />
    </Container>
  );
};

export default Notifications;