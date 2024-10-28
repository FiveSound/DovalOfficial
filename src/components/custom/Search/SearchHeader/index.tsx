import { COLORS, SIZES } from '../../../../constants/theme';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Search } from '../../Inputs';
import FlexContainer from '../../FlexContainer';
import { TouchableOpacity, Image, useNavigation } from '../../../native';
import { useTheme } from '../../../../hooks';
import { iconsNative } from '../../../../constants';
import { ArrowBack } from '../../Arrows';

type Props = {
  onChange: (text: string) => void;
  placeholder: string;
};

const SearchHeader = ({ onChange, placeholder }: Props) => {
  const { borderInput, color } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const navigation = useNavigation();

  return (
    <FlexContainer variant="row" newStyle={styles.flexContainers}>
      <ArrowBack />
      <Search
        placeholder={placeholder}
        onChange={onChange}
        containerStyle={{
          borderColor: isFocused ? COLORS.primary : borderInput,
          height: SIZES.InputsHeight / 1.2,
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  flexContainers: {
    alignItems: 'center',
    width: SIZES.width,
  },
  touchableOpacity: {
    marginLeft: SIZES.gapMedium / 2,
  },
  image: {
    width: SIZES.icons / 1.6,
    height: SIZES.icons / 1.6,
  },
});

export default SearchHeader;
