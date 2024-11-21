import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FlexContainer, Typography } from '../../../components';
import { SIZES } from '../../../constants';
import { responsiveFontSize } from '../../../constants/theme';
import useTheme from '../../../hooks/useTheme';
import {
  Download02Icon,
  HeartbreakIcon,
  Flag02Icon,
  More02Icon,
} from '../../../constants/IconsPro';
import { scale } from 'react-native-size-matters';

interface additionalOptionsProps {
  id: string;
  name: string;
  icon: ReactNode;
}

const AdditionalOptions = () => {
  const { bgInput, borderInput, color } = useTheme();
  const additionalOptions: additionalOptionsProps[] = [
    {
      id: '1',
      name: 'Guardar Video',
      icon: (
        <Download02Icon
          width={SIZES.icons}
          height={SIZES.icons}
          color={color}
        />
      ),
    },
    // { id: '2', name: 'Denunciar', icon: <Flag02Icon width={SIZES.icons} height={SIZES.icons} color={color}/> },
    // { id: '3', name: 'No me interesa', icon: <HeartbreakIcon width={SIZES.icons} height={SIZES.icons} color={color}/> },
    // { id: '4', name: 'Más', icon: <More02Icon width={SIZES.icons} height={SIZES.icons} color={color}/> }
  ];
  return (
    <FlexContainer newStyle={{ padding: SIZES.padding }}>
      <Typography variant="H4title">Más opciones</Typography>
      <FlatList
        data={additionalOptions}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <FlexContainer
            variant="column"
            newStyle={{
              alignItems: 'center',
              justifyContent: 'center',
              gap: SIZES.gapSmall,
              marginTop: SIZES.gapSmall,
            }}
          >
            <TouchableOpacity
              style={{
                marginHorizontal: responsiveFontSize(15),
                padding: SIZES.margin / 2.4,
                backgroundColor: bgInput,
                borderWidth: responsiveFontSize(1),
                borderColor: borderInput,
                borderRadius: SIZES.padding,
                width: 'auto',
                height: 'auto',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {item.icon}
            </TouchableOpacity>
            <Typography
              variant="SubDescription"
              newStyle={{ textAlign: 'center' }}
            >
              {item.name}
            </Typography>
          </FlexContainer>
        )}
      />
    </FlexContainer>
  );
};

export default AdditionalOptions;
