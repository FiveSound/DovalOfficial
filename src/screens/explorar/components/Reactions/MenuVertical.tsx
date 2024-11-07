import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Menu01Icon, MoreHorizontalIcon, SentIconSolid } from '../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../constants/theme';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { openMoreOptionsModal } from '../../../../redux/slides/modalSlice';
import { RootState } from '../../../../redux/store';
import { useTheme } from '../../../../hooks';

type Props = {
  postID: number;
};

const MenuVertical = (props: Props) => {
  const { postID } = props;
  const {Title } = useTheme()
  const dispatch = useDispatch();
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(openMoreOptionsModal({ postID: postID }));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MoreHorizontalIcon
        width={SIZES.icons}
        height={SIZES.icons}
        color={Title}
      />
    </TouchableOpacity>
  );
};

export default MenuVertical;
