import React from 'react';
import { InputLabel } from '../../../../../../components/custom';
import { FONTS, responsiveFontSize } from '../../../../../../constants/theme';

interface Props {
  setValue: (name: string, value: any) => void;
  onSaveDraft: (body: object) => void;
  value: string;
}

const PostNameInput: React.FC<Props> = ({ setValue, onSaveDraft, value }) => {
  return (
    <InputLabel
      label="Recipe Name"
      placeholder="add title for your post"
      value={value}
      onChangeText={txt => {
        setValue('title', txt);
        onSaveDraft({ title: txt });
      }}
      containerStyle={{
        height: responsiveFontSize(50),
      }}
      inputStyle={{
        height: responsiveFontSize(50),
        ...FONTS.semi16,
      }}
    />
  );
};

export default PostNameInput;
