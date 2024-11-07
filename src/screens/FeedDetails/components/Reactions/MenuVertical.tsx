import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Menu01Icon, MoreHorizontalIcon, SentIconSolid } from '../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../constants/theme';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { openMoreOptionsModal } from '../../../../redux/slides/modalSlice';
import { RootState } from '../../../../redux/store';
import { useTheme } from '../../../../hooks';
import { useAppSelector } from '../../../../redux';

type Props = {};

const MenuVertical = (props: Props) => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const {Title } = useTheme()
  const dispatch = useDispatch();
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(openMoreOptionsModal({ postID: CurrentFeed.id }));
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <MoreHorizontalIcon
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={COLORS.TranspLight}
      />
    </TouchableOpacity>
  );
};

export default MenuVertical;
