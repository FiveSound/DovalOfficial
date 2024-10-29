import { Dispatch, SetStateAction } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Text,
} from 'react-native';
import { Home01Icon } from '../../../constants/IconsPro';
import { Search } from '../Inputs';
import FlexContainer from '../FlexContainer';
import { SIZES } from '../../../constants/theme';

type Props = {
  text?: string;
  onChangeText?: (text: string) => void;
  refetch?: () => void;
};

const PaginationHeader = ({ text, onChangeText, refetch }: Props) => (
  <FlexContainer style={styles.containerFilters}>
    {onChangeText ? (
      <Search
        value={text}
        onChange={txt => onChangeText(txt)}
        maxLength={30}
        placeholder="Search"
      />
    ) : (
      <Text />
    )}
  </FlexContainer>
);

export default PaginationHeader;

const styles = StyleSheet.create({
  containerFilters: {
    width: SIZES.width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
  },
  search: {
    maxWidth: 300,
    padding: 4,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 20,
  },
  searchInput: {
    paddingLeft: 10,
    width: '85%',
    color: '#FFF',
  },
  searchIcon: {
    width: 18,
    height: 18,
    tintColor: '#FFF',
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#222',
    padding: 8,
    borderRadius: 4,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#FFF',
  },
});
