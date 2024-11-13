import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, Modal } from 'react-native';
import Searched from './Searched';
import SearchInput from './SearchInput';
import MySavedLocations from './MySavedLocations';
import { Container, FlexContainer } from '../../../../components/custom';
import i18next from '../../../../Translate';
import { useTheme } from '../../../../hooks';
import MapSelector from '../../../../components/custom/Select/MapSelector';
import DetailsLocation from './DetailsLocation';
import { Button } from '../../../../components/native';
import { responsiveFontSize } from '../../../../constants/theme';

const MyLocationsGeneral = () => {
  const [hiddenSearch, setHiddenSearch] = useState(false);
  const [isMapSelectorVisible, setIsMapSelectorVisible] = useState(false);
  const { backgroundMaingrey } = useTheme();

  const { setValue, watch, handleSubmit } = useForm({
    defaultValues: {
      search: '',
      latitude: null,
      longitude: null,
      address: '',
    },
  });

  const { search } = watch();

  return (
    <Container
      label={i18next.t('My Addresses')}
      showHeader={true}
      showBack={true}
      style={{
        alignItems: 'center',
      }}
    >
      {!hiddenSearch && (
        <FlexContainer newStyle={{ alignItems: 'center' }}>
          <SearchInput setValue={setValue} value={search} />
        </FlexContainer>
      )}

      {/* <FlexContainer newStyle={{ alignItems: 'center', marginVertical: 10 }}>
        <Button
          title={i18next.t('Add Location via Map')}
          onPress={() => setIsMapSelectorVisible(true)}
          style={{ marginTop: 10 }}
        />
        <Button
          title={i18next.t('Use Current Location')}
          onPress={() => setIsMapSelectorVisible(true)}
          style={{ marginTop: 10 }}
        />
      </FlexContainer> */}

      <ScrollView
        style={{
          paddingHorizontal: responsiveFontSize(15),
        }}
      >
        {search?.length > 0 ? (
          <Searched search={search} setHiddenSearch={setHiddenSearch} />
        ) : (
          <MySavedLocations />
        )}
      </ScrollView>

      <Modal
        visible={isMapSelectorVisible}
        animationType="slide"
        onRequestClose={() => setIsMapSelectorVisible(false)}
      >
        <MapSelector
          setValue={setValue}
        />
      </Modal>

      {/* Si los valores de latitude y longitude están disponibles, muestra los detalles de la ubicación */}
      {watch('latitude') && watch('longitude') && (
        <DetailsLocation
          placeID={watch('placeID')}
          setHiddenSearch={() => setIsMapSelectorVisible(false)}
        />
      )}
    </Container>
  );
};

export default MyLocationsGeneral;