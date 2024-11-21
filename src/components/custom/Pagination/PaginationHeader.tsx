import React from 'react';
import {
  StyleSheet,
  Text,
} from 'react-native';
import { Search } from '../Inputs';
import FlexContainer from '../FlexContainer';
import { SIZES } from '../../../constants/theme';

type Props = {
  value?: string;
  onChange?: (text: string) => void;
  placeholder: string;
};

const PaginationHeader = ({ value, onChange, placeholder }: Props) => (
  <FlexContainer style={styles.containerFilters}>
      <Search
        value={value}
        onChange={onChange}
        maxLength={30}
        placeholder={placeholder}
      />
  </FlexContainer>
);

export default PaginationHeader;

const styles = StyleSheet.create({
  containerFilters: {
    width: SIZES.width,
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
