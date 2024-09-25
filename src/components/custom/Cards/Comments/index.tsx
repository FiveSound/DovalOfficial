import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import FlexContainer from "../../FlexContainer";
import Avatars from "../../Avatars";
import { COLORS, FONTS, responsiveFontSize, SIZES } from "../../../../constants/theme";
import Typography from "../../Typography";

type Reply = {
  id: number;
  avatar: string;
  username: string;
  comment: string;
  date: string;
  likes: number;
  notlikes: number;
};

type Props = {
  avatar: string;
  username: string;
  comment: string;
  date: string;
  likes: number;
  notlikes: number;
  replies: Reply[];
};

const CardComments = ({
  avatar,
  username,
  comment,
  date,
  likes,
  notlikes,
  replies,
}: Props) => {
  const [showReplies, setShowReplies] = useState(false);

  return (
    <FlexContainer newStyle={styles.card} variant="row">
      <Avatars source={avatar} size="small" />
      <FlexContainer newStyle={styles.containerNames}>
        <Typography variant='SubDescription' newStyle={styles.username}>@{username}</Typography>
        <Typography variant='H4title' newStyle={styles.comment}>{comment}</Typography>
        <Text style={styles.date}>{date}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>❤️ {likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionText}>👎 {notlikes}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setShowReplies(!showReplies)}>
            <Text style={styles.actionText}>View {replies.length} replies</Text>
          </TouchableOpacity>
        </View>
        {showReplies && (
          <View style={styles.replies}>
            {replies.map(reply => (
              <CardComments key={reply.id} {...reply} replies={[]} />
            ))}
          </View>
        )}
      </FlexContainer>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    marginVertical: responsiveFontSize(4),
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
    gap: SIZES.gapMedium,
    marginBottom: SIZES.gapLarge * 1.4
  },
  containerNames: {
   gap: SIZES.gapSmall / 2
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  userInfo: {
    marginLeft: 10,
  },
  username: {
   ...FONTS.semi14
  },
  date: {
    color: COLORS.dark
  },
  comment: {
   ...FONTS.text16,
   width: SIZES.width / 1.2,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    marginRight: 10,
  },
  actionText: {
    color: "#888",
  },
  replies: {
    marginTop: 10,
    paddingLeft: 20,
  },
});

export default CardComments;
