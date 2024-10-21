import React from 'react';
import { InputLabel } from '../../../../../../components/custom';

interface Props {
  setValue: (name: string, value: any) => void;
  onSaveDraft: (body: object) => void;
  value: string;
}

const RecipeNameInput: React.FC<Props> = ({ setValue, onSaveDraft, value }) => {
  return (
    <InputLabel
      label="Recipe Name"
      placeholder="Delicious Recipe Name"
      value={value}
      onChangeText={(txt) => {
        setValue("name", txt);
        onSaveDraft({ name: txt });
      }}
    />
  );
};

export default RecipeNameInput;