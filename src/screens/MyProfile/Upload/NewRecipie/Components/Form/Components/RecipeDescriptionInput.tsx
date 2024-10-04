import React from 'react';
import { StyleSheet } from 'react-native';
import { InputLabel } from '../../../../../../../components/custom';
import { FONTS, SIZES } from '../../../../../../../constants/theme';

interface Props {
  setValue: (name: string, value: any) => void;
  onSaveDraft: (body: object) => void;
  value: string;
}

const RecipeDescriptionInput: React.FC<Props> = ({ setValue, onSaveDraft, value }) => {
  return (
    <InputLabel
      placeholder="Describe your recipe and help your customers understand your recipe"
      value={value}
      onChangeText={(txt) => {
        setValue("description", txt);
        onSaveDraft({ description: txt });
      }}
      labelStyle={styles.labelDescription}
      inputStyle={styles.labelDescription}
    />
  );
};

export default RecipeDescriptionInput;

const styles = StyleSheet.create({
  labelDescription: {
    height: SIZES.height / 14 ,
  },
});