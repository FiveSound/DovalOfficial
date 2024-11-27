import { useEffect, useState, useCallback } from "react";
import {
  Alert,
  StyleSheet,
} from "react-native";
import { Ilustrations } from "../../../constants"
import {
  sentEmailVerificationService,
  verifyResetPasswordService,
} from "../../../services/auth";
import { COLORS, SIZES } from "../../../constants/theme";
import i18next from "../../../Translate";
import useTheme from "../../../hooks/useTheme";
import { useAppSelector } from "@/src/redux";
import { RootState } from "@/src/redux/store";
import { SafeAreaView, TouchableOpacity } from "@/src/components/native";
import { Image } from "@/src/components/native";
import { IsLoading, Typography } from "@/src/components/custom";
import OTPInput from "../../Dashboard/components/OTPInput";

type VerifyProps = {
  sended: boolean;
  setSended: (sended: boolean) => void;
  email: string;
  token: string;
  setToken: (token: string) => void; 
};

const Verify = ({ sended, setSended , email, token, setToken}: VerifyProps) => {
  const {user } = useAppSelector((state: RootState) => state.auth)
  const [time, setTime] = useState(0);
  const [load, setLoad] = useState(false);
  const {backgroundMaingrey } = useTheme()

  const sentEmail = async () => {
    // if (!user?.email) {
    //   Alert.alert(i18next.t('No email provided'));
    //   return;
    // }
    setLoad(true);
    await sentEmailVerificationService();
    setLoad(false);
    setTime(29);
  };

  const confirmCode = useCallback(async (code: string) => {
    setLoad(true);
    const reponse = await verifyResetPasswordService(email, code );
    if (!reponse) {
      Alert.alert("El codigo es incorrecto");
      return;
    }
    setToken(reponse);
    setLoad(false);
    setSended(true);
  },[email, setToken]);

  useEffect(() => {
    if (!sended) {
      sentEmail();
    }
  }, []);

  useEffect(() => {
    const intervalo = setInterval(() => {
      if (time > 0) {
        setTime((prevSegundos) => prevSegundos - 1);
      } else {
        clearInterval(intervalo);
      }
    }, 1000);

    return () => clearInterval(intervalo);
  }, [time]);

  return (
    <SafeAreaView style={[styles.container, {
      backgroundColor: backgroundMaingrey
    }]}>
      <Image
        contentFit='contain'
        server={false}
        style={styles.image}
        source={Ilustrations.MessegeNoti}
      />
      <Typography variant="title">{i18next.t("Reset password")}</Typography>
      <Typography
        newStyle={{
          width: SIZES.BtnWidth,
          textAlign: 'center'
        }}
        variant='SubDescription'
      >
        {i18next.t("The verification code has been sent to the email")}...
        <Typography 
        variant='SubDescription'
        newStyle={{
          color: COLORS.primary
        }}>{email}</Typography>
      </Typography>
      <Typography
        newStyle={{
          color: COLORS.success,
        }}
        variant="H4title"
      >
        {user?.email}
      </Typography>
      <OTPInput onChange={(code) => confirmCode(code)} />
      {load && <IsLoading />}
      {time === 0 ? (
        <TouchableOpacity onPress={sentEmail} disabled={load}>
          <Typography
            variant="SubDescription"
            newStyle={{
              color: COLORS.primary,
            }}
          >
            {i18next.t("Send another code")}
          </Typography>
        </TouchableOpacity>
      ) : (
        <Typography variant="SubDescription">
          {i18next.t('Send another code in')}
          <Typography
            variant="SubDescription"
            newStyle={{
              color: COLORS.primary,
            }}
          >
            {time} s.
          </Typography>
        </Typography>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: SIZES.width,
    height: SIZES.height / 3,
  }
})

export default Verify;
