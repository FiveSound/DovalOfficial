import React, { memo, useState } from 'react';
import { ScrollView, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  FlexContainer,
  LineDivider,
  Typography,
} from '../../../../components/custom';
import {
  COLORS,
  SIZES,
} from '../../../../constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
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
        width: descriptionOpen ? SIZES.width : SIZES.width / 1.4,
        height: descriptionOpen ? SIZES.height / 3 : 'auto',
      }}
    >
      {descriptionOpen && (
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,1.9)']}
          style={styles.linearGradient}
        />
      )}
      <View style={styles.view}>
        <TouchableOpacity
          onPress={() => setDescriptionOpen(!descriptionOpen)}
          style={styles.touchableOpacity}
        >
          {CurrentFeed.name !== '' && (
            <Typography
              variant="H4title"
              numberOfLines={descriptionOpen ? undefined : 1}
              newStyle={styles.titlePost}
            >
              {CurrentFeed.name || ''}
            </Typography>
          )}
          {descriptionOpen && <LineDivider />}
        </TouchableOpacity>
        {CurrentFeed.description !== '' && (
          <ScrollView
            style={{
              maxHeight: descriptionOpen ? SIZES.height / 2 : 'auto',
            }}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{
              paddingBottom: descriptionOpen ? SIZES.height / 4 : 0,
            }}
          >
            <TouchableOpacity
              onPress={() => setDescriptionOpen(!descriptionOpen)}
            >
              <Typography
                variant='H4title'
                numberOfLines={descriptionOpen ? undefined : 2}
                newStyle={{
                  ...styles.descriptionPost,
                  color: descriptionOpen ? COLORS.light : COLORS.TranspLight,
                }}
                ellipsizeMode="tail"
              >
                {CurrentFeed.description || ''}
              </Typography>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>
    </FlexContainer>
  );
});

export default InfoDescriptions;
