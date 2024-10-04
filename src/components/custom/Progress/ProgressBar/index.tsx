import React from 'react';
import {  StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../../constants/theme';
import FlexContainer from '../../FlexContainer';
import { IsLoading } from '../../Loaders';

interface ProgressBarProps {
  progress: number; 
  height?: number;
  backgroundColor?: string;
  progressColor?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  height = SIZES.gapLarge / 2,
  backgroundColor = COLORS.backSuccess,
  progressColor = COLORS.success,
}) => {

  const percentage = Math.min(progress * 100, 100).toFixed(0);

  return (
    <FlexContainer newStyle={styles.wrapper}>
      <IsLoading label={`${percentage}%`} showLabel={true}/>
      <FlexContainer newStyle={[styles.container, { height, backgroundColor }]}>
        <FlexContainer
          newStyle={[
            styles.progress,
            {
              width: `${percentage}%` as string,
              backgroundColor: progressColor,
            }
          ]}
        />
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    alignSelf: 'center',
    marginVertical: SIZES.gapLarge,
  },
  container: {
    borderRadius: SIZES.radius,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
  },
});

export default ProgressBar;