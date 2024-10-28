import React from 'react';
import { ButtonIcons } from '../../../../components/custom';
import { Image } from '../../../../components/native';
import i18next from '../../../../Translate';
import { iconsNative } from '../../../../constants';
import { useTheme } from '../../../../hooks';
import { SIZES } from '../../../../constants/theme';

type Props = {};

const SignupFacebook = (props: Props) => {
  const { Title } = useTheme();

  return (
    <ButtonIcons
      label={i18next.t('continue with my Facebook')}
      orientationsIcons="Left"
      Icons={
        <Image
          priority="high"
          style={{
            width: SIZES.icons,
            height: SIZES.icons,
          }}
          server={false}
          placeholderSource={iconsNative.facebook}
        />
      }
      labelStyle={{
        color: Title,
      }}
    />
  );
};

export default SignupFacebook;
