import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Keyboard } from 'react-native';
import { RootState } from '../../redux/store';
import { useTheme } from '../../hooks';
import BottomSheet, {
  BottomSheetMethods,
} from '../../components/custom/Slide Up/BottomSheet';
import { clearModal, setExpandOnKeyboard } from '../../redux/slides/modalSlice';
import { COLORS } from '../../constants/theme';
import ModalContent from './ModalContent';
import { useAuth } from '../../context/AuthContext';
import { getSnapPoints } from './getSnapPoints';

const Modal: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const modalState = useSelector((state: RootState) => state.modal);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const dispatch = useDispatch();
  const { TransBack, BackgroundMain } = useTheme();

  useEffect(() => {
    if (modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.expand();
    } else if (!modalState.open && bottomSheetRef.current) {
      bottomSheetRef.current.close();
    }

    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        if (bottomSheetRef.current && modalState.expandOnKeyboard) {
          bottomSheetRef.current.expandTo(1);
        }
      },
    );

    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        if (bottomSheetRef.current && modalState.expandOnKeyboard) {
          bottomSheetRef.current.expandTo(0);
        }
      },
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [modalState]);

  const handleFocusInput = () => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.expandTo(1);
    }
    dispatch(setExpandOnKeyboard(true));
  };

  const onClose = () => {
    dispatch(clearModal());
  };

  const getBackground = (modalType: number): string => {
    const { BackgroundMain, backgroundMaingrey } = useTheme();
    const BgMain = BackgroundMain;
    const BgMainGrey = backgroundMaingrey;
    switch (modalType) {
      case 0:
        return BgMain;
      case 1:
        return BgMain
      case 2:
        return COLORS.BackgroundMainLight;
      case 3:
        return BgMain;
      case 4:
        return BgMain;
      case 5:
        return COLORS.BackgroundMainLight;
      case 6:
        return COLORS.BackgroundMainLight;
      case 7:
        return COLORS.BackgroundMainLight;  
      case 8:
        return BgMain;
      case 9:
        return BgMain;
      case 10:
        return BgMain;
      default:
        return COLORS.BackgroundMainLight;
    }
  };

  const getBackdropColor = (modalType: number): string => {
    const { BackgroundMain, backgroundMaingrey, Title } = useTheme();
    const BgMain = BackgroundMain;
    const BgMainGrey = backgroundMaingrey;
    const TitleColor = Title;

    switch (modalType) {
      case 0:
        return TitleColor;
      case 1:
        return TitleColor;
      case 2:
        return TitleColor;
      case 3:
        return TitleColor;
      case 4:
        return TitleColor;
      case 5:
        return TitleColor;
      case 6:
        return TitleColor;
      default:
        return TitleColor;
    }
  };

  const getBackdrop = (modalType: number): boolean => {
    switch (modalType) {
      case 0:
        return true;
      case 1:
        return true;
      case 2:
        return true;
      case 3:
        return false;
      case 5:
        return true;
      case 6:
        return true;
      case 7:
        return true;
      default:
        return true;
    }
  };

  return (
    <>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={getSnapPoints(modalState.modalType, isAuthenticated)}
        backgroundColor={getBackground(modalState.modalType)}
        backDropColor={TransBack}
        onClose={onClose}
        showBackdrop={getBackdrop(modalState.modalType)}
        LineColor={getBackdropColor(modalState.modalType)}
      >
        <ModalContent
          modalType={modalState.modalType}
          data={modalState.data}
          handleFocusInput={handleFocusInput}
        />
      </BottomSheet>
    </>
  );
};

export default Modal;
