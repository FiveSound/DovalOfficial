import React from 'react';
import { TouchableOpacity } from 'react-native';
import { SentIconSolid } from '../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../constants/theme';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { openMoreOptionsModal } from '../../../../redux/slides/modalSlice';
import { RootState } from '../../../../redux/store';

type Props = {
  postID: number;
};

const MenuVertical = (props: Props) => {
  const { postID } = props;
  const dispatch = useDispatch();
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(openMoreOptionsModal({ postID: postID }));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <SentIconSolid
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={COLORS.TranspLight}
      />
    </TouchableOpacity>
  );
};

export default MenuVertical;
