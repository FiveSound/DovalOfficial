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

type Props = {
  item: {
    businessID: null | number;
  };
};

const BusinessButton = (props: Props) => {
  const { item } = props;

  return (
    item.businessID !== null && (
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
