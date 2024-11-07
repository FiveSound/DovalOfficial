import React from 'react';
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from '../../../../constants/theme';
import { AddCircleHalfDotIcon } from '../../../../constants/IconsPro';
import * as MediaLibrary from 'expo-media-library';
import {
  TouchableOpacity,
  useNavigation,
} from '../../../../components/native';
import { useDispatch } from 'react-redux';
import { openUploadModal, openUploadPermissionModal } from '../../../../redux/slides/modalSlice';
import { useTheme } from '../../../../hooks';

type Props = {};

const ButtonUpload = (props: Props) => {
  const navigation = useNavigation();
  const { Title } = useTheme();
  const dispatch = useDispatch();
  const hasPermission = async (): Promise<boolean> => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status === "granted") {
      return false;
    }
    return true;
  };

  return (
    <TouchableOpacity
        onPress={
          async () => {
          const permissionGranted = await hasPermission();
          if (!permissionGranted) {
            dispatch(openUploadModal())
          } else {
            dispatch(openUploadPermissionModal())
          }
        }
      }
    >
      <AddCircleHalfDotIcon
        width={SIZES.icons * 1.1}
        height={SIZES.icons * 1.1}
        color={Title}
      />
    </TouchableOpacity>
  );
};

export default ButtonUpload;
