import React, { useEffect } from "react";
import { CardUserSkeleton } from "./CardUserSkeleton";
import { ActivityIndicator, TouchableOpacity, useNavigation, View } from "../../../native";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import Avatars from "../../Avatars";
import FlexContainer from "../../FlexContainer";
import Typography from "../../Typography";
import { ArrowRight01Icon, VerifyIcons } from "../../../../constants/IconsPro";
import { formatMilesAndMillions } from "../../../../utils/format";
import i18next from "../../../../Translate";
import LineDivider from "../../LineDivider";
import { useTheme } from "../../../../hooks";
import { useAuth } from "../../../../context/AuthContext";
import styles from "./styles";

export type PropsCardUser = {
  userID: string;
  username: string;
  followersCount: number;
  isVerified: boolean;
  onFollow: () => void;
  Follow: boolean;
  cover: string;
  name: string;
  ShowLine?: boolean;
  ShowAccess?: boolean;
  ShowName?: boolean;
  ShowButton?: boolean;
  LoaderButton?: boolean;
  isLoading?: boolean;
  businessID: string;
};

const CardUsers = ({
  userID,
  username,
  followersCount,
  isVerified,
  onFollow,
  Follow,
  cover,
  ShowLine = true,
  ShowAccess = true,
  name,
  ShowName = false,
  ShowButton = true,
  LoaderButton,
  isLoading = true,
  businessID
}: PropsCardUser) => {
  const { Description, backgroundMaingrey } = useTheme();
  const navigation = useNavigation();
  const { user } = useAuth();
  const MyProfile = user?.username === username ? true : false;

  const handleNavigation = () => {
    if (MyProfile) {
      navigation.navigate("MyProfile");
    } else {
      navigation.navigate("UserProfile", { username: username, businessID: businessID });
    }
  };

  return isLoading ? (
    <CardUserSkeleton />
  ) : (
    <>
      <TouchableOpacity
        onPress={handleNavigation}
        style={styles.touchableOpacity}>
        <Avatars source={cover} size="medium" />
        <View style={styles.view}>
          <FlexContainer
            variant="row"
            newStyle={styles.flexContainer}>
            <Typography numberOfLines={1} variant="H4title">
              @{username}
            </Typography>
            {isVerified && (
              <VerifyIcons width={SIZES.icons / 1.4} height={SIZES.icons / 1.4} />
            )}
          </FlexContainer>
          {ShowName ? (
            <Typography
              variant="SubDescription"
              numberOfLines={1}
              newStyle={styles.typographyShowName}>
              {name}
            </Typography>
          ) : (
            <Typography
              variant="SubDescription"
              newStyle={styles.typographyFollowers}>
              {formatMilesAndMillions(followersCount)} {i18next.t("Followers")}
            </Typography>
          )}
        </View>

        {ShowButton && (
          <TouchableOpacity
            onPress={onFollow}
            style={[
              styles.button,
              { backgroundColor: !Follow ? COLORS.primary : backgroundMaingrey },
              { paddingHorizontal: !Follow ? SIZES.gapLarge : SIZES.gapSmall }
            ]}
            disabled={LoaderButton}>
            {LoaderButton ? (
              <ActivityIndicator />
            ) : (
              <Typography
                variant={Follow ? "SubDescription" : "H4title"}
                newStyle={{ color: Follow ? Description : COLORS.dark }}>
                {Follow ? i18next.t("following") : i18next.t("follow")}
              </Typography>
            )}
          </TouchableOpacity>
        )}
        {ShowAccess && (
          <ArrowRight01Icon
            width={SIZES.icons * 1.2}
            height={SIZES.icons * 1.2}
            color={Description}
          />
        )}
      </TouchableOpacity>
      {ShowLine && (
        <LineDivider
          lineStyle={styles.lineDivider}
        />
      )}
    </>
  );
};


export default React.memo(CardUsers);