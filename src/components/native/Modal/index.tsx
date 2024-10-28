import React from 'react';
import { Modal as RNModal, ModalProps } from 'react-native';

type Props = ModalProps;

const Modal = (props: Props) => {
  return <RNModal {...props} />;
};

export default Modal;
