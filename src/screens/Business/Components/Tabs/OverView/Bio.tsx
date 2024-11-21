import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { SIZES } from '../../../../../constants/theme';
import {
  Box,
  LabelContainer,
  Typography,
} from '../../../../../components/custom';

type Props = {
  bio: string | undefined;
};

const Bio = (props: Props) => {
  const { bio } = props;
  const [expand, setExpand] = useState(false);
  return (
    <Box title="Bio">
      <TouchableOpacity onPress={() => setExpand(!expand)}>
        <Typography
          numberOfLines={expand ? undefined : 3}
          variant="SubDescription"
        >
          {bio}
        </Typography>
      </TouchableOpacity>
    </Box>
  );
};

export default Bio;
