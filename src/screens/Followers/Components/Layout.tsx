import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { CardUserSkeleton, FlexContainer, IsLoading, ScreenEmpty, Search } from "../../../components/custom";
import { useTheme } from "../../../hooks";
import { CLOUDFRONT } from "../../../services";
import i18next from "../../../Translate";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { FlatList } from "../../../components/native";
import { Ilustrations } from "../../../constants";
const Follow = lazy(() => import('../../../components/custom/Cards/CardUsers'))

type Props = {
  userID: string | undefined;
  data: any[];
  onFollow: (userID: string) => void;
  onShearch: (text: string) => void;
  searching?: boolean;
};

interface PropsFollower {
  userID: string;
  avatar: string;
  username: string;
  name: string;
  verify: boolean;
  follower_count: number;
  following: string
}


const Layout = ({ userID, data, onFollow, onShearch, searching }: Props) => {
  const [focus, setFocus] = useState(false);
  const [search, setSearch] = useState("");
  const { borderInput } = useTheme();
  const [isLoading, setIsLoading] = useState(true); 
  
  useEffect(() => {
    if (data.length > 0) {
      setIsLoading(false);
    }
  }, [data]);


  const renderItem = useCallback(({item}: {item: PropsFollower} ) => {
    return (
      <Suspense fallback={<CardUserSkeleton />}>
         <Follow
            key={item.userID}
            userID={item.userID}
            cover={`${CLOUDFRONT}${item.avatar}`}
            username={item.username}
            name={item.name}
            isVerified={Boolean(item.verify)}
            followersCount={item.follower_count}
            onFollow={() => onFollow(item.userID)}
            Follow={Boolean(item.following)}
            ShowButton={userID == item.userID ? false : true}
            ShowLine={false}
            ShowAccess={false}
            ShowName={true}
            isLoading={isLoading}
          />
      </Suspense>
    )
  },[data, isLoading])

  return (
    <FlexContainer newStyle={styles.containerMain}>
      <FlexContainer newStyle={styles.container}>
      <Search
        placeholder={i18next.t("Search")}
        containerStyle={{
          borderColor: focus ? COLORS.primary : borderInput,
          height: SIZES.InputsHeight / 1.2,
        }}
        onBlur={() => setFocus(false)}
        onFocus={() => setFocus(true)}
        value={search}
        onChange={(text) => {
          onShearch(text);
          setSearch(text);
        }}
      />
            <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={1}
        data={data}
        keyExtractor={(item) => item.userID}
        renderItem={renderItem}
        // onRefresh={onRefresh}
        // refreshing={isRefreshing}
        initialNumToRender={3}
        maxToRenderPerBatch={3}
        contentContainerStyle={{
          paddingBottom: SIZES.height / 3,
        }}
      />
      </FlexContainer>
      {searching && <IsLoading />}
            {data.length === 0 && 
     <FlexContainer newStyle={styles.containerEmpty}>
       <ScreenEmpty 
      labelPart1={i18next.t("No followers found")} 
      labelPart2={i18next.t("Try another search")}
      subLabel={i18next.t("We couldn't find any followers with that name.")}
      source={Ilustrations.CharcoPet}
      ImgWidth={SIZES.width}
      ImgHeigth={SIZES.height / 3}
      ShowButton={false}
      sublabelStyles={{
        ...FONTS.semi16
      }}
      />
      </FlexContainer>
      }
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  containerMain: {
    paddingHorizontal: SIZES.gapLarge,
    flex: 1
  },
  containerEmpty: {
   justifyContent: "center",
    alignItems: "center",
    flex: 10
  }
})

export default Layout;