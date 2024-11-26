import { Container, Hero, Typography } from '@/src/components/custom';
import { ScrollView } from '@/src/components/native';
import React from 'react';
import { SectionsTypography } from '../SectionsTypography';
import { dataPrivacy } from './data';

const Privacy = () => {
    return <Container
        label='Privacy Policy'
        showHeader={true}
    >
        <ScrollView>
            <Hero
                label='Política de Privacidad de Doval Group, LLC'
                sublabel='Última actualización: 28 de abril 2024'
            />
            {dataPrivacy.map((item) => (
                <SectionsTypography
                    key={item.id}
                    label={item.label}
                    description={item.description}
                />
            ))}
        </ScrollView>
    </Container>;
};

export default Privacy;
