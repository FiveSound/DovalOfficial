import React from "react";
import { InputLabel } from "../../../../../../components/custom";

interface Props {
  setValue: (name: string, value: any) => void;
  value: string;
}

const RecipeNameInput: React.FC<Props> = ({ setValue, value }) => {
  return (
    <InputLabel
      label="Recipe Name"
      placeholder="Delicious Recipe Name"
      value={value}
      onChangeText={(txt) => {
        setValue("name", txt);
      }}
    />
  );
};

export default RecipeNameInput;
