import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import i18next from '../../../Translate';
import { ArrowRight01Icon, Delete03IconSharp, Logout04Icon } from '../../../constants/IconsPro';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';
import { Typography } from '../../../components/custom';
import { useAppDispatch } from '../../../redux';
import { signOut } from '../../../redux/slides/authSlice';
import { useQueryClient } from '@tanstack/react-query';
import { disabledAccountService } from '../../../services/accounts';

type Props = {};


const ClosedAccount = (props: Props) => {
  const { signOut: signOutAuth } = useAuth();
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  const handleSignOut = async () => {
    const Disable = await disabledAccountService()
    if (Disable) {
      queryClient.resetQueries()
      signOutAuth();
      dispatch(signOut());
    } else {
      console.log('Failed to disable account');
    }
  };
  return (
    <>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <TouchableOpacity style={styles.innerButton} onPress={handleSignOut}>
          <Delete03IconSharp
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.error}
          />
          <Typography variant="H4title" newStyle={styles.typography}>
            {i18next.t('Delete Account')}
          </Typography>
        </TouchableOpacity>

        <ArrowRight01Icon
          width={SIZES.icons}
          height={SIZES.icons}
          color={COLORS.error}
        />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  signOutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
    borderRadius: SIZES.radius2,
    borderWidth: SIZES.borderWidth / 2,
    borderColor: COLORS.error,
    marginVertical: SIZES.gapSmall,
    paddingVertical: SIZES.gapMedium,
  },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapSmall,
  },
  typography: {
    color: COLORS.error,
  },
});

export default ClosedAccount;
