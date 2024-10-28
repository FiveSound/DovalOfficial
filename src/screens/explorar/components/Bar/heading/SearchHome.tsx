import React from 'react';
import { Search01Icon } from '../../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../../constants/theme';
import {
  TouchableOpacity,
  useNavigation,
} from '../../../../../components/native';

type Props = {};

const SearchHome = (props: Props) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Search');
      }}
    >
      <Search01Icon
        width={SIZES.icons * 1.1}
        height={SIZES.icons * 1.1}
        color={COLORS.light}
      />
    </TouchableOpacity>
  );
};

export default SearchHome;
