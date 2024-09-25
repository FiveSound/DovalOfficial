import React, { memo, useMemo } from "react";
import { TouchableOpacity, useNavigation, View } from "../../../../components/native";
import { useAuth } from "../../../../context/AuthContext";
import { Avatars, FlexContainer, Typography } from "../../../../components/custom";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import { VerifyIcons } from "../../../../constants/IconsPro";
import styles from "./styles";
import { CLOUDFRONT } from "../../../../services";

type Props = {
item: {
  avatar: string;
  username: string;
  follower_count: string;
  verify: number;
  ProfileName: string;
  mediaType: number
}
};

const UserInfo = React.memo(({
  item
}: Props) => {
  const navigation = useNavigation();
  const { user } = useAuth()
  const MyProfile = useMemo(() => user?.username === item.username, [user?.username, item.username]);
  const handleNavigation = () => {
    if (MyProfile) {
      navigation.navigate("MyProfile");
    } else {
      navigation.navigate("UserProfile", { username: item.username });
    }
  };


  return (
    <TouchableOpacity
      onPress={handleNavigation}
      style={styles.container}
    >
      <Avatars size='medium' source={`${CLOUDFRONT}${item.avatar}`}/>
      <FlexContainer>
        <FlexContainer newStyle={{ flexDirection: "row", alignItems: "center" }}>
          <Typography
            variant="subtitle"
            numberOfLines={1}
            newStyle={{
             ...styles.titlePost,
              maxWidth: SIZES.width / 2,
              width: 'auto'
            }}
          >
            {item.ProfileName || ''}
          </Typography>
          {item.verify === 1 && (
            <VerifyIcons
              width={SIZES.iconsPro / 1.1}
              height={SIZES.iconsPro / 1.1}
            />
          )}
        </FlexContainer>
        <FlexContainer variant='row'
        newStyle={{
          maxWidth: SIZES.width / 2,
          gap: SIZES.gapSmall,
          alignItems: 'center',
          backgroundColor: 'transparent'
        }}>
          <Typography variant="SubDescription" newStyle={{ color: COLORS.TranspLight }}>
            @{item.username || ''}
          </Typography>
        </FlexContainer>
      </FlexContainer>
    </TouchableOpacity>
  );
});

export default memo(UserInfo);
