import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from '../../../../components/native';
import { RootState } from '../../../../redux/store';
import { selectItem } from '../../../../redux/slides/selectionSlice';
import { Sender } from './types';
import { SIZES } from '../../../../constants/theme';
import { IsLoading } from '../../../../components/custom';
import { getContacts } from '../../../../services/shares';
import SenderItem from './SenderItem';
import { useAuth } from '../../../../context/AuthContext';
import { useQuery } from '@tanstack/react-query';

type Props = {};

const SenderGrid: React.FC<Props> = (props: Props) => {
  const { user } = useAuth();
  const { location } = useSelector(
    (state: RootState) => state.location,
  );
  const [Loader, setLoader] = useState(true);
  const [page, setPage] = useState(1);
  const [contacts, setContacts] = useState<Sender[]>([]);
  const {
    data,
    isLoading: LoadingData,
    refetch,
  } = useQuery({
    queryKey: ['get-Contacts-latitude-longitudes-useQuery'],
    queryFn: () => getContacts(page, location?.latitude, location?.longitude),
  });
  const [selectedItem, setSelectedItem] = useState<Sender | null>(null);
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.search.query);

  const handleSelect = useCallback(
    (item: Sender) => {
      const newItem = selectedItem === item ? null : item;
      setSelectedItem(newItem);
      dispatch(selectItem(newItem));
    },
    [selectedItem, dispatch],
  );

  useEffect(() => {
    if (data?.list) {
      setContacts(prevContacts => {
        const newContacts = data.list.filter(
          newContact =>
            !prevContacts.some(contact => contact.userID === newContact.userID),
        );
        return [...prevContacts, ...newContacts];
      });
    }
  }, [data]);

  const filteredSenders = useMemo(() => {
    return Array.isArray(contacts)
      ? contacts.filter(
          sender =>
            sender.username &&
            sender.username.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];
  }, [contacts, searchQuery]);

  const handleEndReached = () => {
    setPage(prevPage => prevPage + 1);
    refetch();
  };
  const renderFooter = () => {
    return LoadingData ? <IsLoading /> : null;
  };

  useEffect(() => {
    if (user) {
      setLoader(LoadingData);
    } else {
      setLoader(false);
    }
  }, [user, LoadingData]);

  return Loader ? (
    <IsLoading />
  ) : (
    <FlatList
      data={filteredSenders}
      keyExtractor={item => item.userID.toString()}
      numColumns={4}
      horizontal={false}
      initialNumToRender={3}
      maxToRenderPerBatch={3}
      columnWrapperStyle={styles.columnWrapper}
      onEndReached={handleEndReached}
      onEndReachedThreshold={1}
      ListFooterComponent={renderFooter}
      renderItem={({ item }) => (
        <SenderItem
          item={item}
          selectedItem={selectedItem}
          handleSelect={handleSelect}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  columnWrapper: {
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.gapLarge,
  },
});

export default SenderGrid;
