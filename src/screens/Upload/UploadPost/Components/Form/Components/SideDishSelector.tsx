import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { ScrollView } from '../../../../../../components/native';
import {
  ButtonAcces,
  Container,
  FlexContainer,
  Icons,
  IsLoading,
  Perks,
  Typography,
} from '../../../../../../components/custom';
import styles from './styles';
import { useFormContext } from 'react-hook-form';

interface VariantItem {
  id: number;
  name: string;
}

interface VariantData {
  resume: VariantItem[];
}

interface Props {
  variants: ReturnType<typeof useQuery<VariantData, Error>>;
  navigation: NavigationProp<any>;
}

const SideDishSelector: React.FC<Props> = ({ variants, navigation }) => {
  const { watch } = useFormContext();
  const values = watch();

  if (variants.isLoading) {
    return <IsLoading />;
  }

  if (variants.isError) {
    return (
      <Typography variant="H4title">
        Ocurrió un error al cargar las variantes.
      </Typography>
    );
  }

  return (
    <ButtonAcces
      label="Side Dish Everyone"
      onPress={() => navigation.navigate('RecipeAddDish')}
      showAppendBottom="DOWN"
      ShowLineDivider={false}
      container={styles.containerButton}
      AppendPreview={
        <Perks
          label={variants.data?.resume.length === 0 ? 'Required' : 'Completed'}
          status={variants.data?.resume.length === 0 ? 'error' : 'success'}
          Reverse={false}
        />
      }
      append={
        variants.isLoading ? (
          <IsLoading />
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.scrollView}
          >
            <FlexContainer variant="row" newStyle={styles.flexContainer}>
              {variants.data?.resume.map((row: any) => (
                <Icons
                  key={row.id}
                  appendIcons={
                    <Typography variant="H4title" newStyle={styles.text}>
                      Varianst: {row.title || ''}
                    </Typography>
                  }
                  styles={styles.icon}
                />
              ))}
            </FlexContainer>
          </ScrollView>
        )
      }
    />
  );
};

export default SideDishSelector;
