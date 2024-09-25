import React, { useCallback, useState } from "react";
import {
  Buttons,
  Checkbox,
  Container,
  FlexContainer,
  InputLabel,
  IsLoading,
  LoadingScreen,
  Perks,
  Typography,
} from "../../../components/custom";
import { StyleSheet } from "react-native";
import { FONTS, SIZES } from "../../../constants/theme";
import { KeyboardAwareScrollView, useNavigation } from "../../../components/native";
import { completeWithEmailService, completeWithPhoneService, validateUserNameService } from "../../../services/auth";
import { useAuth } from "../../../context/AuthContext";
import { RouteProp, useRoute } from "@react-navigation/native";
import { useLocation } from "../../../hooks";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { StaticCheckbox } from "../../../components/custom/Checkbox";

type Props = {};
type RouteParams = {
  params: {
    token: string;
    method: number;
  };
};

const SignupForm = (props: Props) => {
  useLocation()
  const location = useSelector((state: RootState) => state.location);
  const { isAuthenticated, user } = useAuth();
  const route = useRoute<RouteProp<RouteParams, "params">>();
  const { token, method } = route.params;
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isUsernameValid, setIsUsernameValid] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const country = location.countryKey;
  const contact_policy = true
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [isPasswordStrong, setIsPasswordStrong] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const validatePasswordStrength = (password: string) => {
    const length = password.length >= 8;
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);
    const number = /[0-9]/.test(password);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    setIsPasswordStrong({
      length,
      uppercase,
      lowercase,
      number,
      specialChar,
    });
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    validatePasswordStrength(value);
  };

  const handleRepeatPasswordChange = (value: string) => {
    setRepeatPassword(value);
  };



  const handleUsernameChange = useCallback(async (value: string) => {
    setLoading(true);
    setValidationMessage("");
    if (value.trim() === "") {
      setIsUsernameValid(false);
      setValidationMessage("Username cannot be empty");
      setLoading(false);
      return;
    }

    if (value.length < 3) {
      setIsUsernameValid(false);
      setValidationMessage("Username must be at least 3 characters long");
      setLoading(false);
      return;
    }

    const maxRetries = 3;
    let attempts = 0;
    let success = false;

    while (attempts < maxRetries && !success) {
      try {
        await validateUserNameService(value, (loading) => { }, (valid) => {
          setIsUsernameValid(valid);
          setValidationMessage(valid ? "Username is available" : "Username is not available");
          success = true;
        }, (error) => {
          console.error("Username validation error:", error);
          setValidationMessage("Error validating username");
        });
      } catch (error) {
        console.error("Error validating username:", error);
        setValidationMessage("Error validating username");
      } finally {
        attempts++;
        if (success || attempts >= maxRetries) {
          setLoading(false);
        }
      }
    }
  }, []);

  const onSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const phoneDetails = {
        name,
        username,
        country,
        contact_policy
      };
      const emailDetails = {
        name,
        username,
        country,
        contact_policy,
        password,
      };
      const response = await method === 1 ? completeWithEmailService(emailDetails, token) : completeWithPhoneService(phoneDetails, token);
      console.log('response', response);

      if (response.success) {
        setTimeout(() => {
          navigation.navigate('Onboarding');
        }, 500);
      } else {
        console.error("Verification response:", response);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  }, [name, username, country, navigation]);

  if (!isAuthenticated) {
    return <LoadingScreen />;
  }

  return (
    <Container
      useSafeArea={true}
      showHeader={true}
      label="Sign Up Form"
      showFooter={true}
      labels="Sign Up Form"
      disabled={
        !isUsernameValid ||
        name.length < 3 ||
        !Object.values(isPasswordStrong).every(Boolean) ||
        password !== repeatPassword
      }
      loading={isSubmitting}
      onPressButtons={onSubmit}
      style={styles.container}>
      <KeyboardAwareScrollView extraScrollHeight={SIZES.gapLarge * 4}>
        <FlexContainer newStyle={styles.textContainer}>
          <Typography variant="title" newStyle={styles.textTitle}>
            Tell us about yourself
          </Typography>
          <Typography variant="SubDescription">
            These help us to introduce you
          </Typography>
        </FlexContainer>
        <FlexContainer newStyle={styles.labelContainer}>
          <InputLabel
            placeholder="Add your name"
            label="Add your name"
            value={name}
            onChangeText={setName}
          />
          <InputLabel
            placeholder="Add your username"
            label="Add your username"
            value={username}
            orientation='Down'
            onChangeText={(value) => {
              setUsername(value);
              handleUsernameChange(value);
            }}
            endComponent={
              <>
                {loading && <IsLoading />}

              </>
            }
            appenComponent={validationMessage !== "" && (
              <Perks
                label={validationMessage}
                status={isUsernameValid ? 'success' : 'error'}
              />
            )}
          />
          {
            method === 1 ?
              <>
                <InputLabel
                  placeholder="Enter password"
                  label="Enter password"
                  value={password}
                  onChangeText={handlePasswordChange}
                />
                <InputLabel
                  placeholder="Repeat password"
                  label="Repeat password"
                  value={repeatPassword}
                  onChangeText={handleRepeatPasswordChange}
                />
              </> : null
          }

          <FlexContainer>
            <Typography variant='H4title'>Your password must be at least:</Typography>
            <StaticCheckbox showLabel={true} label="8 characters" checked={isPasswordStrong.length} containerStyle={styles.checkboxContainer} LabelStyle={styles.labelStyle} />
            <StaticCheckbox showLabel={true} label="1 uppercase letter" checked={isPasswordStrong.uppercase} containerStyle={styles.checkboxContainer} LabelStyle={styles.labelStyle} />
            <StaticCheckbox showLabel={true} label="1 lowercase letter" checked={isPasswordStrong.lowercase} containerStyle={styles.checkboxContainer} LabelStyle={styles.labelStyle} />
            <StaticCheckbox showLabel={true} label="1 number" checked={isPasswordStrong.number} containerStyle={styles.checkboxContainer} LabelStyle={styles.labelStyle} />
            <StaticCheckbox showLabel={true} label="1 special character" checked={isPasswordStrong.specialChar} containerStyle={styles.checkboxContainer} LabelStyle={styles.labelStyle} />
          </FlexContainer>
        </FlexContainer>
      </KeyboardAwareScrollView>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: SIZES.gapLarge * 2,
  },
  textContainer: {
    marginTop: SIZES.gapLarge * 2,
    alignItems: "center",
  },
  textTitle: {
    ...FONTS.heading24,
  },
  labelContainer: {
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    gap: SIZES.gapLarge * 2,
  },
  validText: {
    color: "green",
  },
  invalidText: {
    color: "red",
  },
  checkboxContainer: {
    gap: SIZES.gapLarge,
    flexDirection: "row",
    alignItems: "center",
  },
  labelStyle: {
    textAlign: 'left'
  }
});
export default SignupForm;