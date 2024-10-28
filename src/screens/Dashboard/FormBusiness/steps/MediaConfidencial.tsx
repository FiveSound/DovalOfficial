import React from 'react';
import { FlexContainer } from '../../../../../components';
import Hero from '../../../../../components/custom/hero';
import { SourceID, SourceLicense } from './Media';

const MediaConfidencial = ({ control }: any) => {
  return (
    <FlexContainer>
      <Hero
        label="Upload your media for confirmation"
        sublabel="This will help us confirm your identity and ensure the security of your account."
      />
      <SourceID control={control} />
      <SourceLicense control={control} />

      {/* <Input
                control={control}
                name="source_id"
                placeholder="Source ID*"
                required
                keyboardType='numeric'
                appenComponent={<Upload05Icon color={COLORS.dark} width={SIZES.icons} height={SIZES.icons} />}
            /> */}
    </FlexContainer>
  );
};

export default MediaConfidencial;
