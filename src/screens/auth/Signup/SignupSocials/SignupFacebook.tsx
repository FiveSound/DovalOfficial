import { useEffect } from "react";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as WebBrowser from "expo-web-browser";
import { ButtonIcons } from "../../../../components/custom";
import { Image } from "../../../../components/native";
import i18next from "../../../../Translate";
import { signInWithFacebookService } from "../../../../services/auth";
import { useAuth } from "../../../../context/AuthContext";
import { iconsNative } from "../../../../constants";
import { useTheme } from "../../../../hooks";
import { SIZES } from "../../../../constants/theme";

WebBrowser.maybeCompleteAuthSession();

const SignupFacebook = () => {
  const { signIn } = useAuth();
  const { Title } = useTheme();
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
          signIn(user);
          //   setLoad(false);
        }
      })();
    }
  }, [response]);

  return (
    <ButtonIcons
      onPress={() => promptAsync()}
      label={i18next.t("continue with my Facebook")}
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
