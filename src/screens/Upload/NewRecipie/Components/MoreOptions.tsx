import { ArrowRight, ButtonAcces, LineDivider, Perks } from '@/src/components/custom';
import { useTheme } from '@/src/hooks';
import React from 'react';
import { FONTS } from '@/src/constants/theme';
import { useNavigation } from '@/src/components/native';
import { styles } from './styles';

interface Props {
 }

const MoreOptions: React.FC<Props> = (props: Props) => {
    const { Description, backgroundMaingrey } = useTheme();
    const navigation = useNavigation();

    const data = [
        {
            id: 1,
            label: 'Agregar adicionales',
            href: 'RecipeAddDish',
            required: true,
        },
        {
            id: 2,
            label: 'Agregar categorías',
            href: 'RecipeCategories',
            required: true,
        },
        {
            id: 3,
            label: 'Agregar tipo',
            href: 'RecipeType',
            required: true,
        }
    ];

    return (
        <>
            {data.map((item) => (
                <>
                <ButtonAcces
                    key={item.id}
                    label={item.label}
                    labelPreview="Required"
                    onPress={() => navigation.navigate(item.href)}
                    showAppendBottom="DOWN"
                    ShowLineDivider={false}
                    container={styles.containerButton}
                    ShowAppendPreview={false}
                    labelStyle={{
                        ...FONTS.semi14,
                        color: Description,
                    }}
                    AppendPreview={
                       <ArrowRight onPress={() => navigation.navigate(item.href)}/>
                    }
                />
                <LineDivider variant='secondary' />
                </>
            ))}
        </>
    );
};

export default MoreOptions;