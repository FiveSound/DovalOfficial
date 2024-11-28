import { useEffect } from "react";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { ButtonIcons } from "../../../../components/custom";
import { Image } from "../../../../components/native";
import i18next from "../../../../Translate";
import { signInWithFacebookService } from "../../../../services/auth";
import { iconsNative } from "../../../../constants";
import { useTheme } from "../../../../hooks";
import { SIZES } from "../../../../constants/theme";
import { useAppDispatch } from "@/src/redux";
import { signInSuccess } from "@/src/redux/slides/authSlice";
import { closeSignupModal } from "@/src/redux/slides/modalSlice";

WebBrowser.maybeCompleteAuthSession();

const SignupFacebook = () => {
  const { Title } = useTheme();
  const dispatch = useAppDispatch();
  const [_request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "703314045273320",
  });

  useEffect(() => {
    if (response?.type == "success" && response.authentication) {
      (async () => {
        let accessToken = response.authentication?.accessToken;
        if (accessToken) {
          // setLoad(true);
          const user = await signInWithFacebookService(accessToken);
          dispatch(signInSuccess(user));
          dispatch(closeSignupModal());
        }
      })();
    }
  }, [response]);

  return (
    <ButtonIcons
      onPress={() => promptAsync()}
      label={i18next.t("continue with Facebook")}
      orientationsIcons="Left"
      Icons={
        <Image
          priority="high"
          style={{
            width: SIZES.icons,
            height: SIZES.icons,
          }}
          server={false}
          placeholderSource={iconsNative.facebook}
        />
      }
      labelStyle={{
        color: Title,
      }}
    />
  );
};

export default SignupFacebook;
