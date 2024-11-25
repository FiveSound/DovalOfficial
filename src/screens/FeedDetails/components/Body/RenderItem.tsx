import React, { PureComponent } from 'react';
import { TypeProducts } from '../../../../types/products/Product.types';
import { StyleSheet } from 'react-native';
import { FlexContainer, LineDivider } from '../../../../components/custom';
import { CLOUDFRONT } from '../../../../services';
import { responsiveFontSize, SIZES } from '../../../../constants/theme';
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
  FollowButtons,
} from '../Reactions';
import {
  BusinessButton,
  InfoDescriptions,
  UserInfo,
} from '../Inf';
import Animated, { FadeIn} from 'react-native-reanimated';

type PropsRenderItem = {
  item?: TypeProducts;
  index?: number;
  focusedIndex?: number | null;
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
        <FlexContainer variant='row' newStyle={styles.containerReactionsButtons}>
        <ViewsButton />
        <LikeButton />
        <CommentButton />
        <SavedButton />
        <CartButton />
        </FlexContainer>
        <MenuVertical />
      </FlexContainer>
    );
  }

  renderUserInfo() {

    return (
      <FlexContainer newStyle={styles.containerInfo}>
        <UserInfo />
        {/* <BusinessButton /> */}
        <InfoDescriptions  />
         <FollowButtons />
        {/* <ShareButtons liked={liked} postID={item.id} /> */}

        {/* <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.8)']}
        style={styles.gradient}
      /> */}
      </FlexContainer>
    );
  }

  render() {
    const { item, index, focusedIndex } = this.props;
    const { liked } = this.state;
    const isItemFocused = index === focusedIndex;

    return (
      <FlexContainer newStyle={styles.container}>
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
    zIndex: 100,
    paddingHorizontal: SIZES.gapLarge,
  },
  containerInfo: {
    backgroundColor: 'transparent',
    width: SIZES.width / 1.1,
    gap: SIZES.gapMedium,
  },
  containerReactions: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    marginTop: SIZES.gapMedium,
    right: responsiveFontSize(4),
    zIndex: 100,
    flexDirection: 'row',
    alignSelf: 'flex-start',
    justifyContent: 'space-between',
    width: SIZES.width,
    paddingRight: SIZES.gapLarge,
    
  },
  containerReactionsButtons: {
    gap: SIZES.gapMedium,
    alignItems: 'center',
  },
  gradient: {
    position: 'absolute',
    left: -SIZES.gapLarge,
    right: 0,
    bottom: responsiveFontSize(-12),
    height: SIZES.height / 3,
    width: SIZES.width,
  },
});

export default React.memo(RenderItem, (prevProps, nextProps) => {
  return (
    prevProps.focusedIndex === nextProps.focusedIndex &&
    prevProps.index === nextProps.index
  );
});
