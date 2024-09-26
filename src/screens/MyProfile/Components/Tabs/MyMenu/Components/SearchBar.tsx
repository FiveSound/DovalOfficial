import React from 'react';
import { StyleSheet } from 'react-native';
import { useTheme } from '../../../../../../hooks';
import { FlexContainer, Icons, Search } from '../../../../../../components/custom';
import { SIZES } from '../../../../../../constants/theme';
import { GridViewIcon } from '../../../../../../constants/IconsPro';

interface SearchBarProps {
  searchText: string;
  handleSearch: (text: string) => void;
  onViewGrid: () => void;
  focus: boolean;
  setFocus: (focus: boolean) => void;
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchText, handleSearch, onViewGrid, focus, setFocus, placeholder }) => {
  const { Description } = useTheme();

  return (
    <FlexContainer newStyle={styles.container}>
      <Search
        value={searchText}
        placeholder={placeholder}
        onChange={handleSearch}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        containerStyle={{
          width: SIZES.width / 1.2,
        }}
      />
      <Icons
        appendIcons={<GridViewIcon width={SIZES.icons} height={SIZES.icons} color={Description} />}
        onPress={onViewGrid}
      />
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "space-between",
    paddingHorizontal: SIZES.gapLarge,
    flexDirection: 'row'
  }
});
export default React.memo(SearchBar);