import React from "react";
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from "../../../../../constants/theme";
import { AddCircleHalfDotIcon } from "../../../../../constants/IconsPro";
import * as MediaLibrary from "expo-media-library";
import {
  TouchableOpacity,
  useNavigation,
} from "../../../../../components/native";

type Props = {};

const ButtonUpload = (props: Props) => {
  const navigation = useNavigation();
  const hasPermission = async (): Promise<boolean> => {
    const { status } = await MediaLibrary.getPermissionsAsync();
    if (status === "granted") {
      return false;
    }
    return true;
  };

  return (
    <TouchableOpacity
      onPress={async () => {
        const permissionGranted = await hasPermission();
        if (!permissionGranted) {
          navigation.navigate("TabsUpload");
        } else {
          navigation.navigate("AlbumsPermission");
        }
      }}>
      <AddCircleHalfDotIcon
         width={SIZES.icons * 1.1}
         height={SIZES.icons * 1.1}
        color={COLORS.light}
      />
    </TouchableOpacity>
  );
};

export default ButtonUpload;
