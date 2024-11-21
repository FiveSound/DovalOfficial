import React, { useCallback, useState, useEffect } from 'react';
import {
  Container,
  FlexContainer,
  Search,
  TwoIconsLabel,
} from '../../../../components/custom';
import { FlashList, FlatList, Modal } from '../../../../components/native';
import { StyleSheet } from 'react-native';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { Country } from '../../../../constants';
import RenderItem from './RenderItem';
import i18next from '../../../../Translate';

type Props = {
  visible: boolean;
  onRequestClose: () => void;
  onSelectItem: (item: {
    countryName: string;
    CodePostal: number;
    codigoISO: string;
  }) => void;
};

const ListNumber = (props: Props) => {
  const { visible, onRequestClose, onSelectItem } = props;
  const [focus, setFocus] = useState(false);
  const { backgroundMaingrey, borderInput } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(Country.slice(0, 18));
  const [page, setPage] = useState(1);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredCountries = Country.filter(
    country =>
      country.countryName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.CodePostal.toString().includes(searchQuery),
  );

  const loadMoreData = () => {
    const newPage = page + 1;
    const newData = Country.slice(0, newPage * 10 + 8);
    setData(newData);
    setPage(newPage);
  };

  const renderItem = useCallback(
    ({ item }) => {
      return <RenderItem item={item} onSelectItem={onSelectItem} />;
    },
    [onSelectItem],
  );

  return (
    <Modal
      animationType="slide"
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <Container useSafeArea={true} style={styles.container}>
        <TwoIconsLabel
          label={i18next.t('Select your country')}
          showBack={false}
          onPress={onRequestClose}
        />
        <Search
          label={i18next.t('Search my country')}
          placeholder={i18next.t('Search my country')}
          value={searchQuery}
          onBlur={() => setFocus(false)}
          onFocus={() => setFocus(true)}
          onChange={handleSearch}
          containerStyle={{
            borderColor: focus ? borderInput : backgroundMaingrey,
          }}
        />
        <FlexContainer newStyle={styles.containerList}>
          <FlashList
            data={filteredCountries.slice(0, data.length)}
            keyExtractor={item => item.key.toString()}
            renderItem={renderItem}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            horizontal={false}
            removeClippedSubviews={true}
            contentContainerStyle={{
              paddingBottom: SIZES.height / 3,
            }}
            estimatedItemSize={100}
          />
        </FlexContainer>
      </Container>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  containerList: {
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    flex: 1,
  },
});
export default ListNumber;
