import React, { memo, useCallback } from "react";
import { TouchableOpacity, View } from "react-native";
import FlexContainer from "../../FlexContainer";
import LineDivider from "../../LineDivider";
import Typography from "../../Typography";
import Cover from "../../Avatars/Cover";
import { useTheme } from "../../../../hooks";
import styles from "./styles";
import { useNavigation } from "../../../native"
import { CLOUDFRONT } from "../../../../services";
import i18next from "../../../../Translate";
import { ArrowRight01Icon } from "../../../../constants/IconsPro";
import { SIZES } from "../../../../constants/theme";

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
  const { Title } = useTheme();
  const navigation = useNavigation();
  const handleNavigation = useCallback(() => {
     if(item) {navigation.navigate("Business", { id: businessID });}
  }, [navigation]);

  return (
    <FlexContainer key={id} newStyle={styles.flexContainer}>
      {!open && <Typography
        variant='H4title'
        numberOfLines={1}
        newStyle={styles.storeStatus}
      >
        {i18next.t('closed for moments')}
      </Typography>}
      <TouchableOpacity
        onPress={handleNavigation}
        style={styles.touchableOpacity}
      >
        <Cover source={`${CLOUDFRONT}${avatar}`} size="small" />
        <View style={styles.flexContainerInner}>
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
              {i18next.t('Send')} {amountSend}
            </Typography>
          </FlexContainer>
        </View>
        <ArrowRight01Icon width={SIZES.icons} height={SIZES.icons} color={Title}/>
      </TouchableOpacity>
      <LineDivider lineStyle={styles.lineDivider}/>
    </FlexContainer>
  );
};

export default memo(CardBusiness);
