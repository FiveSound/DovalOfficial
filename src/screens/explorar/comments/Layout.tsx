import React, { ReactNode } from 'react';
import { responsiveFontSize } from '../../../constants/theme';
import { LineDivider } from '../../../components/custom';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from '../../../components/native';
import styles from './styles';
import { InputMain } from './components';

type Props = {
  children: ReactNode;
  value: string;
  onPressChat: () => void;
  onChangeText: any;
  onFocusInput?: () => void;
  loading?: boolean;
};

const Layout = ({
  children,
  onPressChat,
  onChangeText,
  value,
  onFocusInput,
  loading,
}: Props) => {
  return (
    <SafeAreaView style={styles.keyboardAvoidingView}>
      <KeyboardAvoidingView
        enabled={true}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={
          Platform.OS === 'ios' ? responsiveFontSize(140) : 0
        }
      >
        {children}
        <LineDivider />
        <InputMain
          value={value}
          onChangeText={onChangeText}
          onPressChat={onPressChat}
          onFocusInput={onFocusInput}
          loading={loading}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Layout;
