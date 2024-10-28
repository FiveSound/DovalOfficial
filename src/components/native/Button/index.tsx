import React from 'react';
import { Button as RNButton, ButtonProps } from 'react-native';

type Props = ButtonProps;

const Button = (props: Props) => {
  return <RNButton {...props} />;
};

export default Button;
