import React from 'react'
import { useAuth } from '../../../context/AuthContext'
import i18next from '../../../Translate'
import { ArrowRight01Icon, Logout04Icon } from '../../../constants/IconsPro'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, FONTS, SIZES } from '../../../constants/theme'
import { LineDivider, Typography } from '../../../components/custom'
import { useAppDispatch } from '../../../redux'
import { signOut } from '../../../redux/slides/authSlice'

type Props = {}

const SignOut = (props: Props) => {
  const { signOut: signOutAuth } = useAuth();
  const dispatch = useAppDispatch()
  const handleSignOut = () => {
    signOutAuth()
    dispatch(signOut())
  }
  return (
    <>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.signOutButton}
      >
        <TouchableOpacity
          style={styles.innerButton}
          onPress={handleSignOut}>
          <Logout04Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={COLORS.error}
          />
          <Typography
            variant='subtitle'
            newStyle={styles.typography}
          >
            {i18next.t('Sign off')}
          </Typography>
        </TouchableOpacity>

        <ArrowRight01Icon
          width={SIZES.icons}
          height={SIZES.icons}
          color={COLORS.error}
        />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  signOutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.gapMedium,
    height: SIZES.BtnHeight / 1.2,
    paddingHorizontal: SIZES.gapLarge,
    borderRadius: SIZES.radius2,
    borderWidth: SIZES.borderWidth / 2,
    borderColor: COLORS.error,
  },
  innerButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typography: {
    color: COLORS.error,
  }
})

export default SignOut