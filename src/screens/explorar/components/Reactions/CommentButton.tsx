import React, { memo, useEffect, useState } from "react";
import { Message02Icon } from "../../../../constants/IconsPro";
import useAPI from "../../../../hooks/useAPI";
import { getCommentsPostService } from "../../../../services/reactions";
import { COLORS, FONTS, SIZES } from "../../../../constants/theme";
import { formatMilesAndMillions } from "../../../../utils/format";
import { TouchableOpacity, Text } from "../../../../components/native";
import * as Haptics from "expo-haptics";
import styles from "./styles";
import { useDispatch } from "react-redux";
import { openCommentModal } from "../../../../redux/slides/modalSlice";


type Props = {
  postID: number;
};

const CommentButton = memo(({ postID }: Props) => {
  const dispatch = useDispatch();
  const [commentsCount, setCommentsCount] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(true);
  const { data, isLoading, isFetching } = useAPI({
    queryKey: [`comments-post-id-${postID}`, postID.toString()],
    queryFn: getCommentsPostService,
  });

  useEffect(() => {
    if (data) {
      setCommentsCount(data.length);
      setDisabled(false);
    }
  }, [data]);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    dispatch(openCommentModal({ postID: postID }))
  };
  

  return (
    <TouchableOpacity
      onPress={handlePress}
      disabled={disabled}
      style={styles.container}
    >
        <Message02Icon
              width={SIZES.icons * 1.2}
              height={SIZES.icons * 1.2}
          color={COLORS.TranspLight}
        />
              <Text style={styles.label}>
        {formatMilesAndMillions(commentsCount)}
      </Text>
    </TouchableOpacity>
  );
});

export default CommentButton;