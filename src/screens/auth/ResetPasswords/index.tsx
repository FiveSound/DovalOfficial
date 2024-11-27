import { useState, useEffect, useCallback } from "react";
import Verify from "./Verify";
import Form from "./Form";
import EmailModal from "./EmailModal";
import { useAuth } from "../../../context/AuthContext";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { resetPasswordService } from "../../../services/auth";
import i18next from "../../../Translate";
import useTheme from "../../../hooks/useTheme";
import { useNavigation } from "@/src/components/native";
import { Container, LoadingScreen } from "@/src/components/custom";

const ResetPasswords = () => {
  const [sended, setSended] = useState(false);
  const [emailModalVisible, setEmailModalVisible] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [token, setToken] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation()
  const { user } = useAuth();
  const { Bg , backgroundMaingrey} = useTheme()

  const handleEmailSubmit = useCallback(() => {
    console.log("Enviar código de reseteo a:", emailInput);
    setEmailModalVisible(false);
    setEmailSubmitted(true);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  }, [emailInput]);

  const handleResetPassword = useCallback(() => {
    if (!user?.email && emailSubmitted) {
      resetPasswordService(emailInput)
        .then(() =>
          setEmailSubmitted(true))
        .catch(error => {
          console.error("Error sending email:", error);
          setEmailSubmitted(false);
          setIsLoading(false);
        });
    }
  }, [emailInput, emailSubmitted, user?.email]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer)
  }, []);


  useEffect(() => {
    handleResetPassword();
  }, [handleResetPassword]);


  if (isLoading) {
    return <LoadingScreen label={i18next.t('Loading')} />
  }

  return (
      <Container
        label={i18next.t('Reset password')}
        showHeader={true}
        >
        <EmailModal
          visible={emailModalVisible}
          emailInput={emailInput}
          setEmailInput={setEmailInput}
          onEmailSubmit={handleEmailSubmit}
          onClose={() => {
            setEmailModalVisible(false)
            navigation.goBack()
          }}
        />
        {emailSubmitted && (sended ?
          <Form
            token={token} /> :
          <Verify
            sended={sended}
            setSended={setSended}
            email={emailInput}
            token={token} setToken={setToken}
          />)}
      </Container>
  );
};

export default ResetPasswords;