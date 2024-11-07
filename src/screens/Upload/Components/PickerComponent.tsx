import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { responsiveFontSize, SIZES } from '../../../constants/theme';
import useTheme from '../../../hooks/useTheme';
import { ArrowDown01Icon, Home01Icon } from '../../../constants/IconsPro';
import AlbumReview from './AlbumReview';
import HeaderPicker from './HeaderPicker';
import {
  FlexContainer,
  Icons,
  IsLoading,
  Typography,
} from '../../../components/custom';
import {
  Modal,
  ScrollView,
  TouchableOpacity,
  View,
} from '../../../components/native';

interface PickerComponentProps {
  items: Array<{
    title: string;
    id: string;
    assetCount: string;
    uriAsset: string;
  }>;
  onValueChange: (value: string) => void;
}

const PickerComponent = React.memo(
  ({ items, onValueChange }: PickerComponentProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedTitle, setSelectedTitle] = useState<string>('');
    const { bgInput, Title, BackgroundMain } = useTheme();
    const [selectedId, setSelectedId] = useState<string>('all-media');
    const [Loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
      const selectedItem = items.find(item => item.id === selectedId);
      if (selectedItem) {
        setSelectedTitle(`${selectedItem.title} (${selectedItem.assetCount})`);
      }
    }, [selectedId, items]);

    useEffect(() => {
      if (items) {
        setLoading(false);
      }
    }, [items]);

    const handleSelect = useCallback(
      (item: {
        title: string;
        id: string;
        assetCount: string;
        uriAsset: string;
      }) => {
        setSelectedTitle(`${item.title} (${item.assetCount})`);
        setSelectedId(item.id);
        onValueChange(item.id);
        setIsOpen(false);
      },
      [onValueChange],
    );

    return (
      <FlexContainer style={styles.container}>
        <TouchableOpacity
          style={styles.touchable}
          onPress={() => setIsOpen(true)}
        >
          {Loading ? (
            <IsLoading color="primary" />
          ) : (
            <>
              <Typography
                numberOfLines={1}
                newStyle={styles.typography}
                variant="title"
              >
                {selectedTitle || 'Recientes'}
              </Typography>
              <ArrowDown01Icon
                width={SIZES.icons / 1.4}
                height={SIZES.icons / 1.4}
                color={Title}
              />
            </>
          )}
        </TouchableOpacity>
      
        <Modal
          animationType="slide"
          transparent={true}
          visible={isOpen}
          onRequestClose={() => setIsOpen(!isOpen)}
        >
          <View
            style={[
              styles.modalView,
              { backgroundColor: bgInput, borderColor: bgInput },
            ]}
          >
            <HeaderPicker onPress={() => setIsOpen(false)} />
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
              {items.map(item => (
                <AlbumReview
                  key={item.id}
                  albumName={item.title}
                  albumCount={item.assetCount}
                  onPress={() => handleSelect(item)}
                  uriAsset={item.uriAsset}
                />
              ))}
            </ScrollView>
          </View>
        </Modal>
      </FlexContainer>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    marginHorizontal: SIZES.radius2,
    marginVertical: SIZES.radius,
    paddingHorizontal: SIZES.gapLarge
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapSmall,
    marginBottom: SIZES.gapLarge,
  },
  typography: {
    maxWidth: SIZES.BtnWidth / 1.1,
  },
  modalView: {
    marginTop: SIZES.height / 6,
    borderRadius: SIZES.radius,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: SIZES.width,
    alignSelf: 'center',
    height: SIZES.height,
    borderWidth: responsiveFontSize(2),
  },
  scrollViewContent: {
    paddingBottom: SIZES.height,
  },
  iconsContainer: {
    gap: SIZES.gapSmall,
    width: SIZES.width,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.radius,
    marginBottom: SIZES.gapLarge,
  },
  icons: {
    width: responsiveFontSize(180),
    height: responsiveFontSize(58),
    alignItems: 'center',
    justifyContent: 'center',
  },
  containrerS: {
    gap: SIZES.gapSmall,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PickerComponent;
