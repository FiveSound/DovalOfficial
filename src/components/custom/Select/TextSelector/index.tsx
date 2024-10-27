import React from 'react';
import { StyleSheet, Alert } from 'react-native';
import { ScrollView , View, TouchableOpacity} from '../../../native';
import FlexContainer from '../../FlexContainer';
import Typography from '../../Typography';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';

type Props = {
  data?: any[];
  value?: any[];
  onChange: (selected: any[]) => void;
  maxSelections?: number; 
};

const TextSelector = ({ data, value = [], onChange, maxSelections = 3}: Props) => {
  const { backgroundMaingrey, Title } = useTheme();

  const toggleInterest = (interest: any) => {
    if (!Array.isArray(value)) {
      console.error("`value` prop should be an array.");
      onChange([]);
      return;
    }

   const isSelected = value?.some(item => item.id === interest.id);
    if (isSelected) {
      onChange(value.filter(item => item.id !== interest.id));
    } else {
      if (value.length >= maxSelections) { // Uso de maxSelections
        Alert.alert('Límite de Selección', `Puedes seleccionar hasta ${maxSelections} tipos de negocio.`);
        return;
      }
      onChange([...value, interest]);
    }
  };

  if (data) {
    return (
      <ScrollView>
        {data.map((category: any, index: number) => (
          <FlexContainer key={index} newStyle={styles.categoryContainer}>
            <Typography variant="subtitle" newStyle={styles.categoryTitle}>
              {category.category}
            </Typography>
            <View style={styles.interestsContainer}>
              {category.list.map((interest: any, idx: number) => {
                const isSelected = value.some(item => item.id === interest.id);
                const isDisabled = !isSelected && value.length >= maxSelections;
                return (
                  <TouchableOpacity
                    key={interest.id}
                    style={[
                      styles.interestButton,
                      isSelected && styles.selectedInterestButton,
                      {
                        backgroundColor: isSelected ? COLORS.primary : backgroundMaingrey,
                        opacity: isDisabled ? 0.5 : 1,
                      },
                    ]}
                    onPress={() => toggleInterest(interest)}
                    disabled={isDisabled}
                  >
                    <Typography
                      variant="H4title"
                      newStyle={[
                        styles.interestText,
                        { color: isSelected ? COLORS.dark : Title },
                      ]}
                    >
                      {interest.interest}
                    </Typography>
                  </TouchableOpacity>
                );
              })}
            </View>
          </FlexContainer>
        ))}
      </ScrollView>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginVertical: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
  },
  categoryTitle: {
    ...FONTS.heading18,
    marginBottom: SIZES.gapLarge,
  },
  interestsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  interestButton: {
    padding: SIZES.gapLarge,
    margin: 5,
    borderRadius: 20,
  },
  selectedInterestButton: {
    backgroundColor: "orange",
  },
  interestText: {
    ...FONTS.semi12,
  },
  nextButton: {
    padding: SIZES.gapMedium,
    alignItems: "center",
    margin: SIZES.gapLarge,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: SIZES.gapMedium,
  },
  successText: {
    color: 'green',
    textAlign: 'center',
    marginTop: SIZES.gapMedium,
  },
});

export default TextSelector;