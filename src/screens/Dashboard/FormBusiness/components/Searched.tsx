import React from 'react';
import { useState } from 'react';
import { useTheme } from '../../../../hooks';
import { TouchableOpacity, View } from '../../../../components/native';
import { responsiveFontSize } from '../../../../constants/theme';
import {
  LineDivider,
  LoadingScreen,
  Typography,
} from '../../../../components/custom';
import { searchLocationsService } from '../../../../services/orders';
import { useQuery } from '@tanstack/react-query';

interface Props {
  search: string;
  setHiddenSearch: Function;
  onSelect: (location: any) => void;
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
  const { search, setHiddenSearch, onSelect } = props;

  const { data, isLoading } = useQuery({
    queryKey: ['get-location-coordinates', search],
    queryFn: () => searchLocationsService(search),
    enabled: search.length > 2, // Solo buscar si el término tiene más de 2 caracteres
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (data && data.length > 0) {
    return (
      <View>
        {data.map((row: any) => (
          <ResultLocation
            key={row.place_id}
            structured_formatting={row.structured_formatting}
            onPress={() => onSelect(row)}
          />
        ))}
      </View>
    );
  }

  return (
    <Typography variant="SubDescription">
      No se encontraron resultados.
    </Typography>
  );
};

export default Searched;
