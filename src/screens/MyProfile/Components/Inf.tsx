import React, { memo, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../hooks';
import { FlexContainer, Typography } from '../../../components/custom';
import { FONTS, SIZES } from '../../../constants/theme';
import i18next from '../../../Translate';

type Props = {
  data: {
    name?: string | undefined;
    MyDescription?: string;
    bio?: boolean | undefined;
  };
};

const Inf = (props: Props) => {
  const { data } = props;
  const { Description, backgroundMaingrey } = useTheme();
  const [extend, setExtend] = useState(false);
  const bionull = data.bio === null;
  const bioEmpty = data.bio !== '';

  return (
    <FlexContainer style={styles.container}>
      <FlexContainer style={styles.nameContainer}>
        <Typography
          newStyle={styles.nameText}
          variant="H4title"
          numberOfLines={1}
        >
          {data.name || ''}
        </Typography>
      </FlexContainer>
      {bionull && bioEmpty ? (
        <TouchableOpacity
          onPress={() => setExtend(!extend)}
          style={{
            ...styles.containerBio,
            backgroundColor: backgroundMaingrey,
          }}
        >
          <Typography variant="SubDescription" newStyle={styles.biotext}>
            {i18next.t('Add bio')}
          </Typography>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => setExtend(!extend)}
          style={styles.descriptionContainer}
        >
          <Typography
            variant="SubDescription"
            numberOfLines={!extend ? 2 : undefined}
            newStyle={{ ...styles.descriptionText, color: Description }}
          >
            {data.bio}
          </Typography>
        </TouchableOpacity>
      )}
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: SIZES.width,
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  nameContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    paddingHorizontal: SIZES.radius,
  },
  nameText: {
    ...FONTS.semi16,
    maxWidth: SIZES.width / 1.4,
    alignItems: 'flex-start',
  },
  descriptionContainer: {
    paddingHorizontal: SIZES.gapMedium,
    alignItems: 'center',
    width: SIZES.width,
  },
  descriptionText: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    ...FONTS.text14,
  },
  biotext: {
    ...FONTS.semi14,
  },
  containerBio: {
    paddingVertical: SIZES.gapSmall,
    paddingHorizontal: SIZES.gapMedium,
    borderRadius: SIZES.smallRadius,
  },
});

export default memo(Inf);
