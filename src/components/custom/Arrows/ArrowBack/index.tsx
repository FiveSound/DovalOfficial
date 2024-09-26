import React from "react";
import { Image, TouchableOpacity, useNavigation } from "../../../native";
import { COLORS, SIZES } from "../../../../constants/theme";
import { useTheme } from "../../../../hooks";
import { iconsNative } from "../../../../constants";
import { StyleSheet } from "react-native";

type Props = {};

const ArrowBack = (props: Props) => {
  const navigation = useNavigation();
  const { Title } = useTheme();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        priority="high"
        cachePolicy="memory-disk"
        style={styles.imag}
        tintColor={Title}
        placeholderSource={iconsNative.arrowBack}
        server={false}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imag: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
});
export default ArrowBack;
