import { Container, Hero, Typography } from '@/src/components/custom';
import { ScrollView } from '@/src/components/native';
import React from 'react';
import { SectionsTypography } from '../SectionsTypography';
import { dataCopyright } from './data';

const Copyright = () => {
    return <Container
        label='Copyright Policy'
        showHeader={true}
    >
        <ScrollView>
            <Hero
                label='Política de Derechos de Autor'
                sublabel='Última actualización: 28 de abril 2024'
            />
            {dataCopyright.map((item) => (
                <SectionsTypography
                    key={item.id}
                    label={item.label}
                    description={item.description}
                />
            ))}
        </ScrollView>
    </Container>;
};

export default Copyright;
