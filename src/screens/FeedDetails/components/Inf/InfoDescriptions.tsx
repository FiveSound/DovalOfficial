import React, { memo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  FlexContainer,
  LineDivider,
  Typography,
} from '../../../../components/custom';
import styles from './styles';
import { useAppSelector } from '../../../../redux';
import { RootState } from '../../../../redux/store';


const InfoDescriptions = memo(() => {
  const { CurrentFeed } = useAppSelector((state: RootState) => state.navigation);
  const [descriptionOpen, setDescriptionOpen] = useState(false);

  return (
    <FlexContainer
      newStyle={{
        ...styles.flexContainer,
      }}
    >
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => setDescriptionOpen(!descriptionOpen)}
          style={styles.touchableOpacity}
        >
          {CurrentFeed.title !== '' && (
            <Typography
              variant='title'
              numberOfLines={descriptionOpen ? undefined : 1}
            >
              {CurrentFeed.title || ''}
            </Typography>
          )}
          {descriptionOpen && <LineDivider />}
        </TouchableOpacity>
        {CurrentFeed.description !== '' && (
            <TouchableOpacity
              onPress={() => setDescriptionOpen(!descriptionOpen)}
            >
              <Typography
                variant='SubDescription'
                numberOfLines={descriptionOpen ? undefined : 2}
                newStyle={{
                  ...styles.descriptionPost,
                }}
                ellipsizeMode="tail"
              >
                {CurrentFeed.description || ''}
              </Typography>
            </TouchableOpacity>
        )}
      </View>
    </FlexContainer>
  );
});

export default InfoDescriptions;
