import React, {
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
  useMemo,
} from "react";
import { FlatList, View, Platform, Dimensions } from "react-native";
import { getExploreData } from "../../../services/recipes";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { COLORS, SIZES } from "../../../constants";
import ModalComentarios from "../../../components/ModalComentarios";
import { useAuth } from "../../../context/AuthContext";
import { TypeProducts } from "../../../types/products/Product.types";
import Loaders from "../../../components/Loaders";
import { BottomSheet, FlexContainer } from "../../../components";
import { BottomSheetMethods } from "../../../components/BottomSheet";
import { useRefreshData } from "../../../hooks/useRefreshData";
import LoaderMain from "../../explorar/components/LoaderMain";
import RenderItem from "../../explorar/components/Body/RenderItem";
import Comments from "../../explorar/comments";

type props = {};

const PostsDetails = (props: props) => {
  const screenHeight = Dimensions.get("window").height;
  const route = useRoute()
  const { selectedItem, allData, selectedIndex } = route.params as { selectedItem: any, allData: any[], selectedIndex: number };
  const { user } = useAuth();
  const [data, setData] = useState<TypeProducts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [focusedIndex, setFocusedIndex] = useState(null);
  const [lastFocusedIndex, setLastFocusedIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [postID, setPostID] = useState(0);
  const [isScrollComplete, setIsScrollComplete] = useState(false);
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 10 });
  const snapPoints = useMemo(() => ["70%", "90%"], []);
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  const isFocused = useIsFocused();

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      const index = viewableItems[0].index;
      setFocusedIndex(index);
      setLastFocusedIndex(index);
    }
  });

  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    setData(allData);
    setIsLoading(false);
  }, [allData]);

  useEffect(() => {
    if (!isLoading && isScrollComplete) {
      flatListRef.current?.scrollToIndex({ index: selectedIndex, animated: false });
    }
  }, [isLoading, isScrollComplete, selectedIndex]);

  useEffect(() => {
    if (!isFocused) {
      setFocusedIndex(null);
    } else {
      setFocusedIndex(lastFocusedIndex);
    }
  }, [isFocused]);

  const renderItem = useCallback(({ item, index }) => (
      <RenderItem
        key={item.id}
        item={item}
        focusedIndex={focusedIndex}
        index={index}
        setPostID={setPostID}
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
        onPressShare={openBottomSheet}
      />
  ), [focusedIndex, modalVisible, openBottomSheet, setModalVisible, setPostID]);

  if (isLoading || !isScrollComplete) {
    return <LoaderMain ShowHeader={false} />;
  }

  return (
    <FlexContainer
      newStyle={{
       flex: 1,
       backgroundColor: COLORS.dark,
       height: SIZES.height * 0.9
      }}
    >
      <FlatList
        ref={flatListRef}
        data={data}
        snapToInterval={ SIZES.height * 0.9}
        decelerationRate="fast"
        horizontal={false}
        showsVerticalScrollIndicator={false}
        scrollToOverflowEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewConfigRef.current}
        onEndReachedThreshold={0.5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={5}
        initialNumToRender={4}
        windowSize={5}
        onLayout={() => setIsScrollComplete(true)}
      />
      <ModalComentarios
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        LabelCounter={0}
      >
        <Comments
          isFocused={isFocused}
          postID={postID}
        />
      </ModalComentarios>

      {/* <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        backgroundColor={COLORS.dark}
        backDropColor="rgba(0,0,0,0.5)"
      >
        <ShareVideos />
      </BottomSheet> */}
    </FlexContainer>
  );
};

export default PostsDetails;