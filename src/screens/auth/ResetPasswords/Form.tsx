import { Alert } from "react-native";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import useTheme from "../../../hooks/useTheme";
import i18next from "../../../Translate";
import { changePasswordService } from "../../../services/auth";
import { SafeAreaView, useNavigation } from "@/src/components/native";
import { Buttons, FlexContainer, InputLabel, IsLoading, Perks, Typography } from "@/src/components/custom";
import { COLORS } from "@/src/constants/theme";
import { reloadApp } from "@/src/redux/slides/appSlice";
import { useAppDispatch } from "@/src/redux";

type dataProps = {
  password: string;
  repeat_password: string;
  token: string
};

type Props = {
  token: string
}
const Form = ({token}: Props) => {

  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      password: "",
      repeat_password: "",
      token: token
    },
  });

  const { password, repeat_password } = watch();
  const [isFocused, setIsFocused] = useState(false)
  const [isFocusedPass, setIsFocusedPass] = useState(false)
  const navigation = useNavigation()
  const { borderInput } = useTheme()
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [ShowToast, setShowToast] = useState(false)
  const [success, setSuccess] = useState(false)

  const onSubmit = async (data: dataProps) => {
    setShowToast(true);
    if (data.password !== data.repeat_password) {
      Alert.alert(i18next.t('Passwords do not match'));
    } else if (data.password.length === 0 || data.repeat_password.length === 0) {
      Alert.alert(i18next.t('Please fill in all fields'));
    } else {
      try {
        await changePasswordService(data.password, data.token);
        reset();
        setShouldNavigate(true);
        setSuccess(true)
      } catch (error) {
        Alert.alert(i18next.t('An error occurred while changing the password'));
        console.error(error);
        setShowToast(false)
      }
    }
  };


  useEffect(() => {
    if (shouldNavigate) {
        setShowToast(false)
        setShouldNavigate(false);
        navigation.goBack()

    }
  }, [shouldNavigate, navigation]);

  return (
    <SafeAreaView>
    {ShowToast && <Perks label={success ? 'Actualizado correctamente' : 'Actualizando'} status={success ? 'success' : 'error'}/> } 
      <InputLabel
        label="Contraseña"
        placeholder="Contraseña"
        onChangeText={(text) =>
          setValue("password", text, { shouldDirty: true })
        }
        value={password}
        secureTextEntry
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        inputStyle={{
          borderColor: isFocused ? COLORS.primary : borderInput
        }}
      />
      <InputLabel
        label="Repetir contraseña"
        placeholder="Repetir contraseña"
        onChangeText={(text) =>
          setValue("repeat_password", text, { shouldDirty: true })
        }
        value={repeat_password}
        secureTextEntry
        onFocus={() => setIsFocusedPass(true)}
        onBlur={() => setIsFocusedPass(false)}
        inputStyle={{
          borderColor: isFocusedPass ? COLORS.primary : borderInput
        }}
      />

      {password !== repeat_password && (
        <FlexContainer
          variant='row'>
          <Typography
            variant='SubDescription'
            newStyle={{
              color: COLORS.error,
            }}
          >
            {i18next.t('Passwords do not match')}
          </Typography>
        </FlexContainer>
      )}

      {isSubmitting && <IsLoading />}
     <FlexContainer 
     newStyle={{
      alignItems: 'center'
     }}>
     <Buttons
        label={i18next.t('Confirm Password')}
        disabled={password !== repeat_password || password.length < 6}
        onPress={handleSubmit(onSubmit)}
        variant={password !== repeat_password || password.length < 6 ? 'disabled' : 'primary'}
        variantLabel={password !== repeat_password || password.length < 6 ? 'disabled' : 'secondary'}
      />
     </FlexContainer>
    </SafeAreaView>
  );
};

export default Form;
