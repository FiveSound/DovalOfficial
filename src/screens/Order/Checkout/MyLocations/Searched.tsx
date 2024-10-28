import { useState } from 'react';
import DetailsLocation from './DetailsLocation';
import { useAPI, useTheme } from '../../../../hooks';
import { TouchableOpacity, View } from '../../../../components/native';
import {
  LineDivider,
  LoadingScreen,
  Typography,
} from '../../../../components/custom';
import { responsiveFontSize } from '../../../../constants/theme';
import { searchLocationsService } from '../../../../services/orders';

interface Props {
  search: string;
  setHiddenSearch: Function;
}

interface PropsData {
  data: any;
  isLoading: Boolean;
}

interface PropsStructuredFormatting {
  main_text: string;
  secondary_text: string;
}

interface PropsResultLocation {
  place_id: string;
  reference: string;
  structured_formatting: PropsStructuredFormatting;
  onPress: any;
}

const ResultLocation = (props: PropsResultLocation) => {
  const { structured_formatting, onPress } = props;
  const { backgroundMaingrey } = useTheme();
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={{
          backgroundColor: backgroundMaingrey,
        }}
      >
        <View
          style={{
            padding: responsiveFontSize(10),
            backgroundColor: backgroundMaingrey,
          }}
        >
          <Typography variant="subtitle">
            {structured_formatting.main_text}
          </Typography>
          <Typography variant="SubDescription">
            {structured_formatting.secondary_text}
          </Typography>
        </View>
      </TouchableOpacity>
      <LineDivider />
    </>
  );
};

const Searched = (props: Props) => {
  const { search, setHiddenSearch } = props;
  const [placeID, setPlaceID] = useState(null);

  const { data, isLoading }: PropsData = useAPI({
    queryKey: ['get-location-coordenates', search],
    queryFn: searchLocationsService,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data) {
    return (
      <View>
        {placeID ? (
          <DetailsLocation
            placeID={placeID}
            setHiddenSearch={setHiddenSearch}
          />
        ) : (
          <>
            {data.map((row: any) => (
              <ResultLocation
                key={row.place_id}
                place_id={row.place_id}
                reference={row.reference}
                structured_formatting={row.structured_formatting}
                onPress={() => setPlaceID(row.place_id)}
              />
            ))}
          </>
        )}
      </View>
    );
  }
};

export default Searched;
