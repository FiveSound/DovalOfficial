import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import i18next from '../../../Translate';
import { ArrowRight01Icon, Logout04Icon } from '../../../constants/IconsPro';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '../../../constants/theme';
import { Typography } from '../../../components/custom';
import { useQueryClient } from '@tanstack/react-query';

type Props = {};


const SignOut = (props: Props) => {
  const { signOut: signOutAuth } = useAuth();
  const queryClient = useQueryClient();

  const handleSignOut = () => {
    queryClient.resetQueries()
    signOutAuth();
  };
  return (
    <>
      <TouchableOpacity onPress={handleSignOut} style={styles.signOutButton}>
        <TouchableOpacity style={styles.innerButton} onPress={handleSignOut}>
          <Logout04Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.error}
          />
          <Typography variant="H4title" newStyle={styles.typography}>
            {i18next.t('Sign Out')}
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

export default SignOut;
