import React from 'react';
import SignupGoogle from './SignupGoogle';
import SignupFacebook from './SignupFacebook';
import { Platform } from '@/src/components/native';

const SignupSocials = () => (

  <>
    {/* <SignupApple /> */}
    {Platform.OS === 'android' && <SignupGoogle />}
    { Platform.OS === 'android' && <SignupFacebook /> }
  </>
);

export default SignupSocials;
