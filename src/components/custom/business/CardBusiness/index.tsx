import React, { memo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import FlexContainer from "../../FlexContainer";
import LineDivider from "../../LineDivider";
import Typography from "../../Typography";
import Cover from "../../Avatars/Cover";
import { useTheme } from "../../../../hooks";
import styles from "./styles";
import { useNavigation } from "../../../native";
import * as Haptics from "expo-haptics";
import { CLOUDFRONT } from "../../../../services";

export type businessListitems = {
  id: number;
  avatar: string;
  business_name: string;
  timeSend: string;
  amountSend: string;
  rating: string;
  Like: boolean;
  open: boolean;
  onPress?: () => void;
  businessID: number
  bio: string
};

const CardBusiness = ({
  item,
}: {
  item: businessListitems;
  onPress?: () => void;
}) => {
  const {
    avatar,
    business_name,
    timeSend,
    amountSend,
    rating,
    Like,
    open,
    id,
    businessID,
    bio
  } = item;
  const { color, greyText, backgroundMaingrey } = useTheme();
  const navigation = useNavigation();
  const handleNavigation = useCallback(() => {
     if(item) {navigation.navigate("Business", { id: businessID });}
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [navigation]);

  const handleFavouritePress = useCallback(() => {
  }, []);

  return (
    <FlexContainer key={id} newStyle={styles.flexContainer}>
      {!open && <Typography
        variant='H4title'
        numberOfLines={1}
        newStyle={styles.storeStatus}
      >
        closed for moments
      </Typography>}
      <TouchableOpacity
        onPress={handleNavigation}
        style={styles.touchableOpacity}
      >
        <Cover source={`${CLOUDFRONT}${avatar}`} size="small" />
        <View>
          <Typography
            variant="subtitle"
            numberOfLines={1}
            newStyle={styles.businessName}
          >
            {business_name}
          </Typography>
          <FlexContainer newStyle={styles.flexContainerInner}>
            <Typography variant="SubDescription" newStyle={styles.timeSend} numberOfLines={1}>
              {bio}
            </Typography>
            <Typography variant="SubDescription" newStyle={styles.timeSend}>
              {timeSend}
            </Typography>
            <Typography variant="SubDescription">
              Send {amountSend}
            </Typography>
          </FlexContainer>
        </View>
      </TouchableOpacity>
      <LineDivider />
    </FlexContainer>
  );
};

export default memo(CardBusiness);
