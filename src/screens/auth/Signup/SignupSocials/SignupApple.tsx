import React from 'react';
import { ButtonIcons } from '../../../../components/custom';
import i18next from '../../../../Translate';
import { AppleIcon } from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';

type Props = {};

const SignupApple = (props: Props) => {
  const { Title, BackgroundMain } = useTheme();

  return (
    <ButtonIcons
      label={i18next.t('continue with my apple')}
      orientationsIcons="Left"
      Icons={<AppleIcon width={SIZES.icons} height={SIZES.icons} color={Title}/>}
      labelStyle={{
        color: Title,
      }}
    />
  );
};

export default SignupApple;
