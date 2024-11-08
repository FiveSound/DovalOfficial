import React from 'react';
import { StyleSheet } from 'react-native';
import { InputLabel } from '../../../../../../components/custom';
import { FONTS, SIZES } from '../../../../../../constants/theme';

interface Props {
  setValue: (name: string, value: any) => void;
  onSaveDraft: (body: object) => void;
  value: string;
}

const PostDescriptionInput: React.FC<Props> = ({
  setValue,
  onSaveDraft,
  value,
}) => {
  return (
    <InputLabel
      placeholder="Describe your post, add hashtags, or mention creators that inspired you"
      value={value}
      onChangeText={txt => {
        setValue('description', txt);
        onSaveDraft({ description: txt });
      }}
      labelStyle={styles.labelDescription}
      inputStyle={styles.labelDescription}
      ShowDivider={false}
    /> 
  );
};

export default PostDescriptionInput;

const styles = StyleSheet.create({
  labelDescription: {
    height: SIZES.height / 10,
    ...FONTS.semi14,
  },
});
