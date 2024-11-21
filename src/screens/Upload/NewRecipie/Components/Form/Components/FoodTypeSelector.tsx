import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import {
  ButtonAcces,
  FlexContainer,
  Icons,
  IsLoading,
  Perks,
  Typography,
} from '../../../../../../components/custom';
import { ScrollView } from '../../../../../../components/native';
import styles from './styles';
import { useTheme } from '../../../../../../hooks';

interface Props {
  foodTypes: ReturnType<typeof useQuery>;
  navigation: NavigationProp<any>;
}

const FoodTypeSelector: React.FC<Props> = ({ foodTypes, navigation }) => {
  const { Description, backgroundMaingrey } = useTheme();
  const isAtLeastOneSelected = foodTypes.data?.list.some(
    (item: any) => item.selected,
  );

  return (
    <ButtonAcces
      label="Food Type"
      labelPreview="Required"
      onPress={() => navigation.navigate('RecipeType')}
      showAppendBottom="DOWN"
      ShowLineDivider={false}
      container={styles.containerButton}
      labelStyle={{ color: Description }}
      ShowAppendPreview={false}
      AppendPreview={
        <Perks
          label={!isAtLeastOneSelected ? 'Required' : 'Completed'}
          status={!isAtLeastOneSelected ? 'error' : 'success'}
          Reverse={false}
        />
      }
      append={
        foodTypes.isLoading ? (
          <IsLoading />
        ) : (
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal={true}
            contentContainerStyle={styles.scrollView}
          >
            <FlexContainer variant="row" newStyle={styles.flexContainer}>
              {foodTypes.data?.list.map(
                (row: any) =>
                  row.selected && (
                    <Icons
                      key={row.id}
                      appendIcons={
                        <Typography variant="H4title" newStyle={{...styles.text, color: Description}}>
                        {row.name}
                      </Typography>
                      }
                      styles={[
                        styles.icon,
                        {
                          backgroundColor: backgroundMaingrey,
                        },
                      ]}
                    />
                  ),
              )}
            </FlexContainer>
          </ScrollView>
        )
      }
    />
  );
};

export default FoodTypeSelector;
