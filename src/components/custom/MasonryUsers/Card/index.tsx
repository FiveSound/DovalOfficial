import { View, StyleSheet } from "react-native";
import RemoteImage from "../RemoteImage";
import FlexContainer from "../../FlexContainer";
import { COLORS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import { Image01Icon, PlayListIcon } from "../../../../constants/IconsPro";
import { memo, useMemo } from "react";
import { Pressable, useNavigation } from "../../../native";
import Inf from "./Inf";
import { ViewsButton, LikeButton, CommentButton } from "../../Masonry/Card/Reactions";

interface PinProps {
  pin: {
    id: number;
    thumbnail: string;
    description: string;
    mediaType: number;
    hashtags: string[];
    ProfileName: string;
    username: string;
    businessID: string;
    photos: string;
  
  };
  showInf: boolean;
  isFocused: boolean;
}

const Card = memo(({ pin, showInf = true, isFocused }: PinProps) => {
  const { id, mediaType } = pin;
  
  const navigation = useNavigation();
  const onLike = () => {
    console.log(`Card: Se ha pulsado like en el post con ID ${id}`);
  };
  

  return (
    <Pressable 
      style={styles.pin}
    >
      <View>
      <RemoteImage pin={pin} isFocused={isFocused} />
        <FlexContainer newStyle={styles.heartBtn}>
          {mediaType === 0 ? (
            <PlayListIcon
              width={SIZES.icons}
              height={SIZES.icons}
              color={COLORS.TranspLight}
            />
          ) : (
            <Image01Icon
              width={SIZES.icons / 1.1}
              height={SIZES.icons / 1.1}
              color={COLORS.TranspLight}
            />
          )}
          <ViewsButton postID={id} />
          <LikeButton postID={id} onLikeChange={onLike} />
          <CommentButton postID={id} />
        </FlexContainer>
      </View>
      <Inf item={pin} showInf={showInf}/>
    </Pressable>
  );
});

const styles = StyleSheet.create({
  pin: {
    width: "100%",
    padding: SIZES.gapSmall,
  },
  title: {
    marginTop: SIZES.gapSmall,
    width: SIZES.width / 2.6
  },
  rows: {
    justifyContent: "space-between",
    // alignItems: "center",
    width: "100%",
  },
  heartBtn: {
    position: "absolute",
    top: responsiveFontSize(4),
    right: responsiveFontSize(0),
    padding: responsiveFontSize(5),
    borderRadius: responsiveFontSize(50),
    gap: responsiveFontSize(10),
    alignItems: "center",
  },
});

export default Card;