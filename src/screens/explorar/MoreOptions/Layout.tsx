import React, { useState } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../../redux/store';
import {
  Buttons,
  FlexContainer,
  InputLabel,
  LineDivider,
  Search,
} from '../../../components/custom';
import Options from './Options';
import SharesOptions from './SharesOptions';
import { SIZES } from '../../../constants/theme';
import { KeyboardAvoidingView } from 'react-native';
import { setSearchQuery } from '../../../redux/slides';
import { useAuth } from '../../../context/AuthContext';
import { setExpandOnKeyboard } from '../../../redux/slides/modalSlice';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useAuth();
  const [value, setValue] = useState('');
  const selectedItem = useSelector(
    (state: RootState) => state.selection.selectedItem,
  );
  const expandOnKeyboard = useSelector(
    (state: RootState) => state.modal.expandOnKeyboard,
  );
  const scroll = selectedItem !== null && expandOnKeyboard;

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <FlexContainer style={styles.container}>
        {isAuthenticated && (
          <Search
            label="Search"
            placeholder="Search"
            value={value}
            containerStyle={{ borderWidth: 0 }}
            onChange={value => {
              setValue(value);
              dispatch(setSearchQuery(value));
            }}
            onFocus={() => dispatch(setExpandOnKeyboard(true))}
            onBlur={() => dispatch(setExpandOnKeyboard(false))}
          />
        )}

        {children}
        <>
          {isAuthenticated && <LineDivider />}
          {!selectedItem && (
            <FlexContainer
              newStyle={{
                alignItems: 'center',
              }}
            >
              <SharesOptions />
              <Options />
            </FlexContainer>
          )}
        </>
        {selectedItem && (
          <>
            <FlexContainer
              newStyle={{
                marginBottom: scroll ? SIZES.gapLarge * 8 : SIZES.gapLarge,
              }}
            >
              <InputLabel
                label="Write a message"
                placeholder="Write a message"
                onFocus={() => dispatch(setExpandOnKeyboard(true))}
                onBlur={() => dispatch(setExpandOnKeyboard(false))}
              />
              <Buttons label="Send Message" variant="primary" />
            </FlexContainer>
          </>
        )}
      </FlexContainer>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.gapLarge,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: SIZES.gapLarge,
  },
  animatedContainer: {
    padding: SIZES.gapLarge,
    alignItems: 'center',
  },
  title: {},
  line: {},
});

export default Layout;
