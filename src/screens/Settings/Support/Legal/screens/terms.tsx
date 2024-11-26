import { Container, Hero, Typography } from '@/src/components/custom';
import { ScrollView } from '@/src/components/native';
import React from 'react';
import { SectionsTypography } from '../SectionsTypography';
import { dataTerms } from './data';

const Terms = () => {
    return <Container
        label='Terms and Conditions'
        showHeader={true}
    >
        <ScrollView>
            <Hero
                label='Términos y Condiciones de Uso de Doval Group, LLC'
                sublabel='Última actualización: 28 de abril 2024'
            />
            {dataTerms.map((item) => (
                <SectionsTypography
                    key={item.id}
                    label={item.label}
                    description={item.description}
                />
            ))}
        </ScrollView>
    </Container>;
};

export default Terms;
