import React, { memo, Suspense, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import {
  Avatars,
  FlexContainer,
  IsLoading,
  Typography,
} from '../../../../components/custom';
import { CLOUDFRONT } from '../../../../services';
import { Sender } from './types';
import {
  COLORS,
  FONTS,
  SIZES,
  responsiveFontSize,
} from '../../../../constants/theme';
import { CheckmarkCircle01Icon } from '../../../../constants/IconsPro';
import { TouchableOpacity } from '../../../../components/native';

type Props = {
  item: Sender;
  selectedItem: Sender | null;
  handleSelect: (item: Sender) => void;
};

const SenderItem: React.FC<Props> = memo(
  ({ item, selectedItem, handleSelect }) => {
    const isSelected = item === selectedItem;
    const isAnySelected = selectedItem !== null;

    return (
      <Suspense fallback={<IsLoading />}>
        <TouchableOpacity
          onPress={() => {
            handleSelect(item);
          }}
          style={[
            styles.gridItem,
            isSelected
              ? styles.selected
              : isAnySelected
                ? styles.unselected
                : styles.default,
          ]}
        >
          <FlexContainer
            newStyle={{
              width: SIZES.width / 3,
              alignItems: 'center',
            }}
          >
            {isSelected && (
              <CheckmarkCircle01Icon
                color={COLORS.success}
                width={SIZES.icons}
                height={SIZES.icons}
                style={styles.checkIcon}
              />
            )}
            <FlexContainer>
              <Avatars
                showLabel={false}
                size="large"
                source={`${CLOUDFRONT}${item.avatar}`}
                onPressAvatar={() => {
                  handleSelect(item);
                }}
              />
              <Typography
                variant="SubDescription"
                numberOfLines={2}
                newStyle={styles.label}
              >
                {item.name}
              </Typography>
            </FlexContainer>
          </FlexContainer>
        </TouchableOpacity>
      </Suspense>
    );
  },
);

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: SIZES.gapSmall,
    maxWidth: SIZES.width / 3 - SIZES.gapSmall * 2,
    alignItems: 'center',
  },
  default: {
    opacity: 1,
  },
  selected: {
    opacity: 1,
  },
  unselected: {
    opacity: 0.5,
  },
  checkIcon: {
    position: 'absolute',
    top: responsiveFontSize(34),
    right: responsiveFontSize(30),
    zIndex: 100,
  },
  label: {
    width: SIZES.width / 4.8,
    textAlign: 'center',
    ...FONTS.text14,
    marginTop: SIZES.gapSmall,
  },
});

export default SenderItem;
