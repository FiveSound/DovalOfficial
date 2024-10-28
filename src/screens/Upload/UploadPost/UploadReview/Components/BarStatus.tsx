import React from 'react';
import { FlexContainer, Typography } from '../../../../../components/custom';
import { TouchableOpacity } from '../../../../../components/native';
import { PauseIcon, PlayIcon } from '../../../../../constants/IconsPro';
import { SIZES } from '../../../../../constants/theme';

type Props = {
  duration: string;
  time: string;
  onPressPlay: () => void;
  isPlay: boolean;
};

const BarStatus = (props: Props) => {
  const { duration, time, onPressPlay, isPlay } = props;
  return (
    <FlexContainer
      variant="row"
      newStyle={{
        alignItems: 'center',
      }}
    >
      <TouchableOpacity
        onPress={onPressPlay}
        style={{
          width: SIZES.width / 2,
        }}
      >
        {!isPlay ? (
          <PlayIcon width={SIZES.icons / 1.4} height={SIZES.icons / 1.4} />
        ) : (
          <PauseIcon width={SIZES.icons / 1.4} height={SIZES.icons / 1.4} />
        )}
      </TouchableOpacity>

      <FlexContainer>
        <Typography variant="SubDescription">
          {time} / {duration}
        </Typography>
      </FlexContainer>
    </FlexContainer>
  );
};

export default BarStatus;
