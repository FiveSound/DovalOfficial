import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import { ArrowRight, FlexContainer, LineDivider, Typography } from '../../../../components/custom';
import { TouchableOpacity } from '../../../../components/native';
import { SIZES } from '../../../../constants/theme';

type Props = {
  item: {
    countryName: string;
    CodePostal: number;
    codigoISO: string;
  };
  onSelectItem: (item: {
    countryName: string;
    CodePostal: number;
    codigoISO: string;
  }) => void;
};

const RenderItem = (props: Props) => {
  const { item, onSelectItem } = props;
  const NumberCode = `${'+'}${item.CodePostal.toString()}`;



    return (
    <>
      <TouchableOpacity onPress={() => onSelectItem(item)} style={styles.container}>
        <FlexContainer variant='row' newStyle={styles.containerText}>
        <Typography variant="H4title">{NumberCode}</Typography>
        <Typography variant="H4title">{item.countryName}</Typography>
        </FlexContainer>

        <ArrowRight onPress={() => onSelectItem(item)} />
      </TouchableOpacity>
      <LineDivider />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SIZES.gapLarge,
  },
  containerText: {
    gap: SIZES.gapMedium,
  },
});

export default memo(RenderItem);
