import React from 'react';
import { Image, SafeAreaView, TouchableOpacity, useNavigation } from '../../../native';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { iconsNative } from '../../../../constants';
import { StyleSheet } from 'react-native';

type Props = {};

const ArrowBack = (props: Props) => {
  const navigation = useNavigation();
  const { Title } = useTheme();

  return (
    <SafeAreaView>
      <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image
        style={styles.imag}
        tintColor={Title}
        source={iconsNative.arrowBack}
        server={false}
      />
    </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imag: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
});
export default ArrowBack;
