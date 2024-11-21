import React from 'react';
import { TouchableOpacity } from 'react-native';
import * as Haptics from 'expo-haptics';import { useAppDispatch } from '../../../../../redux';
import { useTheme } from '../../../../../hooks';
import { openMoreOptionsModal } from '../../../../../redux/slides/modalSlice';
import { MoreHorizontalIcon } from '../../../../../constants/IconsPro';
import { SIZES } from '../../../../../constants/theme';

type Props = {
  postID: number;
};

const MenuVertical = (props: Props) => {
  const { postID } = props;
  const {Title } = useTheme()
  const dispatch = useAppDispatch();
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
