import React, { memo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import { COLORS, SIZES } from "../../../../constants/theme";
import FlexContainer from "../../FlexContainer";
import LineDivider from "../../LineDivider";
import { FavouriteIcon, StarIcon } from "../../../../constants/IconsPro";
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
  Rating: string;
  Like: boolean;
  store: boolean;
  onPress?: () => void;
  businessID: number
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
    Rating,
    Like,
    store,
    id,
    businessID
  } = item;
  const { color, greyText, backgroundMaingrey } = useTheme();
  const navigation = useNavigation();
  
  const handleNavigation = useCallback(() => {
    navigation.navigate("Business", {id: businessID });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [navigation]);

  const handleFavouritePress = useCallback(() => {
    console.log("Favourite icon pressed");
  }, []);

  return (
    <FlexContainer key={id} newStyle={styles.flexContainer}>
      <TouchableOpacity
        onPress={handleNavigation}
        style={styles.touchableOpacity}
      >
        <View>
          <Typography
            variant="subtitle"
            numberOfLines={1}
            newStyle={styles.businessName}
          >
            {business_name}
          </Typography>
          <FlexContainer newStyle={styles.flexContainerInner}>
            <Typography variant="SubDescription" newStyle={styles.timeSend}>
              {timeSend}
            </Typography>
            <Typography variant="SubDescription">
              Envio ${amountSend}
            </Typography>
          </FlexContainer>
        </View>
        <Cover source={`${CLOUDFRONT}${avatar}`} />
      </TouchableOpacity>

      <View style={styles.view}>
        <FlexContainer
          newStyle={[
            styles.storeStatus,
            { backgroundColor: store ? COLORS.primary : COLORS.error },
          ]}
        >
          <Typography variant="H4title" newStyle={styles.storeStatusText}>
            {store ? "Abierto" : "Cerrado"}
          </Typography>
        </FlexContainer>

        <FlexContainer variant="row" newStyle={styles.flexContainerRow}>
          <FlexContainer variant="row" newStyle={styles.ratingContainer}>
            <Typography variant="SubDescription" newStyle={styles.ratingText}>
              {Rating || 0}
              <StarIcon
                width={SIZES.icons / 1.2}
                height={SIZES.icons / 1.2}
                color={COLORS.primary}
              />
            </Typography>
          </FlexContainer>
          <TouchableOpacity
            style={styles.favouriteIconContainer}
            onPress={handleFavouritePress}
          >
            <FavouriteIcon
              width={SIZES.icons / 1.2}
              height={SIZES.icons / 1.2}
              color={Like ? COLORS.error : color}
            />
          </TouchableOpacity>
        </FlexContainer>
      </View>
      <LineDivider lineStyle={styles.lineDivider} />
    </FlexContainer>
  );
};

export default memo(CardBusiness);
