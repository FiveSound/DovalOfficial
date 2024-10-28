import React from 'react';
import { Input } from '../components';
import { FlexContainer, Hero } from '../../../../components/custom';
import i18next from '../../../../Translate';
import UploadSource from '../components/uploadSource';

const Representativeinformation = ({ control, setValue }: any) => {
  return (
    <FlexContainer>
      <Hero
        label={i18next.t('Representative information')}
        sublabel={i18next.t(
          'Please fill in the following information to complete the process.',
        )}
      />
      <Input
        control={control}
        name="full_name"
        placeholder={i18next.t('Full Name*')}
        required
        keyboardType="default"
      />
      <Input
        control={control}
        name="identification_number"
        placeholder={i18next.t('Identification Number*')}
        required
        keyboardType="numeric"
      />
      <Input
        control={control}
        name="role"
        placeholder={i18next.t('Role*')}
        required
        keyboardType="default"
      />
      <Input
        control={control}
        name="email"
        placeholder={i18next.t('Email*')}
        required
        keyboardType="email-address"
      />
      <Input
        control={control}
        name="phone_number"
        placeholder={i18next.t('Phone Number*')}
        required
        keyboardType="phone-pad"
      />
      <UploadSource
        control={control}
        name="imgIdentifications"
        placeholder="Identification Image*"
        required
        setValue={setValue}
      />
    </FlexContainer>
  );
};

export default Representativeinformation;
