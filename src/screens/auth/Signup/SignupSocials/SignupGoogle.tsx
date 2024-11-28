import React, { useEffect } from 'react';
import { ButtonIcons } from '../../../../components/custom';
import { Image } from '../../../../components/native';
import i18next from '../../../../Translate';
import { iconsNative } from '../../../../constants';
import { useAuth } from '../../../../context/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { signInWithGoogleService } from '../../../../services/auth';
import { useTheme } from '../../../../hooks';
import { SIZES } from '../../../../constants/theme';
import { signInSuccess } from '@/src/redux/slides/authSlice';
import { useAppDispatch } from '@/src/redux';
import { closeSignupModal } from '@/src/redux/slides/modalSlice';

type Props = {};

const webClientId =
  '705678443243-dnlo3nsobb5lfad94e9vrcsvd4959p7q.apps.googleusercontent.com';
const iosClientId =
  '705678443243-6u4njgfuc4ep4co6ui903017mb3eukms.apps.googleusercontent.com';
const androidClientId =
  '705678443243-eijj5fh2jkub3ukgm3ta1a0r8ga7a2aq.apps.googleusercontent.com';
WebBrowser.maybeCompleteAuthSession();

const SignupGoogle = (props: Props) => {
  const { Title } = useTheme();
  const dispatch = useAppDispatch();
  const [_request, response, promptAsync] = Google.useAuthRequest({
    webClientId: webClientId,
    iosClientId: iosClientId,
    androidClientId: androidClientId,
  });

  useEffect(() => {
    if (response?.type == 'success' && response.authentication) {
      (async () => {
        let accessToken = response.authentication?.accessToken;
        if (accessToken) {
          // setLoad(true);
          const user = await signInWithGoogleService(accessToken);
          dispatch(signInSuccess(user));
          dispatch(closeSignupModal());
        }
      })();
    }
  }, [response]);

  return (
    <ButtonIcons
      label={i18next.t('continue with my Google')}
      orientationsIcons="Left"
      Icons={
        <Image
          priority="high"
          style={{
            width: SIZES.icons,
            height: SIZES.icons,
          }}
          placeholderSource={iconsNative.google}
          server={false}
        />
      }
      onPress={() => promptAsync()}
      labelStyle={{
        color: Title,
      }}
    />
  );
};

export default SignupGoogle;
