import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MoreHorizontalIcon } from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
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
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <MoreHorizontalIcon
        width={SIZES.icons * 1.2}
        height={SIZES.icons * 1.2}
        color={Title}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: SIZES.gapLarge,
  },
});

export default MenuVertical;
