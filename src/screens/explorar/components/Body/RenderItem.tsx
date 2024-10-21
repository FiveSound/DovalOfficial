import React, { PureComponent } from "react";
import { TypeProducts } from "../../../../types/products/Product.types";
import { StyleSheet } from "react-native";
import { FlexContainer } from "../../../../components/custom";
import { CLOUDFRONT } from "../../../../services";
import { responsiveFontSize, SIZES } from "../../../../constants/theme";
import {
  ButtonMusic,
  CartButton,
  CommentButton,
  LikeButton,
  MenuVertical,
  SavedButton,
  ShareButton,
  ViewsButton,
  Hints,
  FollowButtons
} from "../Reactions";
import {
  UserInfo,
  InfoDescriptions,
  BusinessButton,
  ShareButtons,
  InterestsButton,
} from "../Inf";
import Media from "./Media";
import { Platform } from "../../../../components/native";

type PropsRenderItem = {
  item: TypeProducts;
  index: number;
  focusedIndex: number | null;
};

class RenderItem extends PureComponent<PropsRenderItem> {
  state = {
    visiblePhotoIndex: 0,
    liked: false,
  };

  handleVisibleItemChange = (index: number) => {
    this.setState({ visiblePhotoIndex: index });
  };

  handleLikeChange = (liked: boolean) => {
    console.log('Like status changed to:', liked);
    if (liked) {
      this.setState({ liked: true });
    }
  };

  renderButtons() {
    const { item, index, focusedIndex } = this.props;
    const isItemFocused = index === focusedIndex;

    return (
      <FlexContainer newStyle={styles.containerReactions}>
        {/* {item.recipeID && item.ordenable && ( */}
          <CartButton recipeID={item.recipeID} />
        {/* )} */}
        <ViewsButton postID={item.id} />
        <LikeButton postID={item.id} onLikeChange={this.handleLikeChange} />
        <CommentButton postID={item.id} />
        <SavedButton postID={item.id} />
        <ShareButton postID={item.id} />
        <MenuVertical postID={item.id} />
        <ButtonMusic
          isFocused={isItemFocused}
          songID={item.songID}
          postID={item.id}
          AvatarArtist={`${CLOUDFRONT}${item.avatar}`}
          username={item.username}
        />
      </FlexContainer>
    );
  }

  renderUserInfo() {
    const { item } = this.props;
    const { liked } = this.state;

    return (
      <FlexContainer newStyle={styles.containerInfo}>
        <UserInfo item={item} />
        <InfoDescriptions item={item} />
        {/* <ShareButtons liked={liked} postID={item.id} /> */}
        {/* <BusinessButton item={item} /> */}
        <FollowButtons showFollows={liked} userID={item.userID}/>
      </FlexContainer>
    );
  }

  render() {
    const { item, index, focusedIndex } = this.props;
    const { liked } = this.state;
    const isItemFocused = index === focusedIndex;

    return (
      <FlexContainer style={styles.container}>
        <Media
          item={item}
          isItemFocused={isItemFocused}
          onVisibleItemChange={this.handleVisibleItemChange}
        />
        <Hints ShowAlert={liked} />
        <FlexContainer>
          {this.renderButtons()}
          {this.renderUserInfo()}
        </FlexContainer>
      </FlexContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "red",
  },
  containerInfo: {
    position: "absolute",
    bottom: Platform.OS === 'ios' ? SIZES.gapLarge : SIZES.gapLarge ,
    backgroundColor: "transparent",
    width: SIZES.width / 1.2,
    paddingHorizontal: SIZES.gapMedium,
    gap: SIZES.gapSmall,
  },
  containerReactions: {
    backgroundColor: "transparent",
    position: "absolute",
    alignItems: "center",
    marginTop: SIZES.padding,
    marginRight: SIZES.radius / 2,
    bottom: Platform.OS === 'ios' ? responsiveFontSize(10) : responsiveFontSize(10),
    right: responsiveFontSize(4),
    gap: SIZES.gapLarge,
    zIndex: 100
  },
});

export default React.memo(RenderItem, (prevProps, nextProps) => {
  return prevProps.focusedIndex === nextProps.focusedIndex && prevProps.index === nextProps.index;
});