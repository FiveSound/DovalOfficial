import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CheckmarkCircle01Icon } from '../../../../../constants/IconsPro';
import { COLORS, FONTS, SIZES } from '../../../../../constants/theme';
import {
  FlexContainer,
  IsLoading,
  LineDivider,
  Typography,
} from '../../../../../components/custom';
import { TouchableOpacity } from '../../../../../components/native';
import { setDefaultLocationService } from '../../../../../services/orders';

type AddressItemProps = {
  address: {
    tag: string;
    apartment: string;
    city: string;
    details: string;
    selected: boolean;
    locationID: string;
  };
  onSelect: () => void;
};

const AddressItem = ({ address, onSelect }: AddressItemProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handlePress = async () => {
    setIsLoading(true);
    const success = await setDefaultLocationService(address.locationID);
    setIsLoading(false);
    if (success) {
      onSelect();
    }
  };

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={handlePress}>
        <FlexContainer newStyle={styles.textContainer}>
          <Typography
            variant="H4title"
            numberOfLines={1}
            newStyle={styles.title}
          >
            {address.tag}
          </Typography>
          <Typography
            variant="SubDescription"
            numberOfLines={1}
            newStyle={styles.details}
          >
            {address.details}
          </Typography>
        </FlexContainer>
        {address.selected && <CheckmarkCircle01Icon color={COLORS.success} />}
        {isLoading && <IsLoading />}
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
    padding: SIZES.gapLarge,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...FONTS.semi18,
    width: SIZES.width / 1.2,
    color: COLORS.dark,
  },
  details: {
    width: SIZES.width / 1.2,
    ...FONTS.semi14,
  },
});

export default memo(AddressItem);
