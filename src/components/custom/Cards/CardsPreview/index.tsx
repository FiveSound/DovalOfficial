import React, { ReactNode } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { useTheme } from '../../../../hooks';
import FlexContainer from '../../FlexContainer';
import { FONTS, SIZES } from '../../../../constants/theme';
import Avatars from '../../Avatars';
import Typography from '../../Typography';
import { ArrowRight01Icon } from '../../../../constants/IconsPro';
import { useAuth } from '../../../../context/AuthContext';
import { CLOUDFRONT } from '../../../../services';

interface row {
  id: string;
  label: string;
  description: string;
}
type Props = {
  row: row;
  showAvatar?: boolean;
  custom?: ReactNode;
};

const CardsPreview = (props: Props) => {
  const { row, showAvatar, custom } = props;
  const { user } = useAuth();
  const { color, backgroundMaingrey } = useTheme();

  console.log('row', row);

  return (
    <FlexContainer newStyle={styles.container} key={row.id}>
      <FlexContainer
        variant="row"
        newStyle={[styles.flexRow, { backgroundColor: backgroundMaingrey }]}
      >
        {showAvatar && (
          <Avatars size="large" source={`${CLOUDFRONT}${user?.avatar}`} />
        )}
        {!showAvatar && custom}
        <FlexContainer>
          <Typography
            variant="H4title"
            numberOfLines={1}
            newStyle={styles.typography}
          >
            {row.label}
          </Typography>
          <Typography
            variant="SubDescription"
            numberOfLines={2}
            newStyle={styles.description}
          >
            {row.description}
          </Typography>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
    borderRadius: SIZES.gapMedium,
    width: '100%',
  },
  touchable: {
    flexDirection: 'row',
    width: 'auto',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SIZES.gapSmall,
    marginBottom: SIZES.gapSmall,
  },
  flexRow: {
    alignItems: 'center',
    gap: SIZES.gapMedium,
    padding: SIZES.gapMedium,
    borderRadius: SIZES.gapMedium,
  },
  typography: {
    maxWidth: SIZES.width / 1.4,
    ...FONTS.semi18,
  },
  description: {
    ...FONTS.text14,
    maxWidth: SIZES.width / 1.4,
  },
});

export default CardsPreview;
