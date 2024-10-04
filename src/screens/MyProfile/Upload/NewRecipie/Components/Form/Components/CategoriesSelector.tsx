import React from 'react';
import { NavigationProp } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { IsLoading , ButtonAcces, Typography, Icons, FlexContainer, Perks} from '../../../../../../../components/custom';
import { ScrollView } from '../../../../../../../components/native';
import styles from './styles';
import { FONTS } from '../../../../../../../constants/theme';

interface Props {
  categories: ReturnType<typeof useQuery>;
  navigation: NavigationProp<any>;
}

const CategoriesSelector: React.FC<Props> = ({ categories, navigation }) => {
  const isAtLeastOneSelected = categories.data?.list.some((item: any) => item.selected);
  
  return (
    <>
     <ButtonAcces
      label="Categories"
      labelPreview='Required'
      onPress={() => navigation.navigate("RecipeCategories")}
      showAppendBottom='DOWN'
      ShowLineDivider={false}
      container={styles.containerButton}
      ShowAppendPreview={false}
      AppendPreview={
        <Perks label={!isAtLeastOneSelected? 'Required' : 'Completed'} status={!isAtLeastOneSelected ? 'error' : 'success'} Reverse={false} />
      }
      append={
        categories.isLoading ? (
          <IsLoading />
        ) : (
          <ScrollView 
          showsHorizontalScrollIndicator={false}
          horizontal={true} 
          contentContainerStyle={styles.scrollView}>
            <FlexContainer variant='row' newStyle={styles.flexContainer}>
              {categories.data?.list.map((row: any) => (
                row.selected && (<Icons 
                  key={row.id}
                  appendIcons={<Typography variant='H4title' newStyle={styles.text}>{row.name}</Typography>} 
                  styles={styles.icon}
                />)
              ))}
            </FlexContainer>
          </ScrollView>
        )
      }
    
    />

    </>
  );
};



export default CategoriesSelector;