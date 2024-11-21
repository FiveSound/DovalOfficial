import React, { memo } from 'react';
import {
  FlexContainer,
  Icons,
  Typography,
} from '../../../../components/custom';
import styles from './styles';
import {
  ArrowRight01Icon,
  Store01IconStroke,
} from '../../../../constants/IconsPro';
import { COLORS } from '../../../../constants/theme';
import { useAppSelector } from '@/src/redux';
import { RootState } from '@/src/redux/store';

type Props = {};

const BusinessButton = (props: Props) => {
 const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation)

  return (
    CurrentFeed.businessID !== null && (
      <Icons
        styles={styles.buttonsActions}
        appendIcons={
          <FlexContainer
            variant="row"
            newStyle={styles.containerButtonsActions}
          >
            <Store01IconStroke color={COLORS.dark} />
            <Typography variant="H4title">Visit business</Typography>
            <ArrowRight01Icon color={COLORS.dark} />
          </FlexContainer>
        }
      />
    )
  );
};

export default BusinessButton;
