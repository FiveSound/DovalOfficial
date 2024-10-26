import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { FlexContainer, InfoCard } from '../../../components/custom';
import { COLORS, SIZES } from '../../../constants/theme';
import { useNavigation } from '../../../components/native';
import { useAppDispatch } from '../../../redux';
import { closeUploadModal } from '../../../redux/slides/modalSlice';
import { ImageUpload01Icon, PackageAddIcon } from '../../../constants/IconsPro';
import i18next from '../../../Translate';
import { RootState } from '../../../redux/store';
import { useSelector } from 'react-redux';

type props = {}

const Upload = (props: props) => {
const navigation = useNavigation();
const dispatch = useAppDispatch();
const { business } = useSelector((state: RootState) => state.auth)
console.log(business);

useEffect(() => {
}, [business]);

const data = [
  {
      id: 1,
      title: i18next.t("New Post:"),
      description: i18next.t("Share your culinary creations, restaurant reviews, or food experiences."),
      icon: <ImageUpload01Icon width={SIZES.icons} height={SIZES.icons} color={COLORS.dark} />, 
      showLineDivider: true,
      navigation: "NewPost",
      show: true
  },
  {
      id: 2,
      title: i18next.t("Create & Sell Recipe:"),
      description: i18next.t("Upload your favorite recipes to share or sell them to the community."),
      icon: <PackageAddIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.dark} />,
      showLineDivider: true,
      navigation: "NewRecipie",
      show: business ? true : false
  },
  // {
  //     id: 3,
  //     title: "Go Live:",
  //     description: "Start a live stream to connect with your audience in real-time.",
  //     icon: <Home01Icon width={SIZES.icons * 1.2} height={SIZES.icons * 1.2} color={COLORS.dark} />,
  //     showLineDivider: true
  // },
  // {
  //     id: 4,
  //     title: "My Uploads:",
  //     description: "View and manage your past posts, recipes, and live streams.",
  //     icon: <Home01Icon width={SIZES.icons * 1.2} height={SIZES.icons * 1.2} color={COLORS.dark} />,
  //     showLineDivider: false
  // }
];

  return (
    <FlexContainer newStyle={styles.container}>
      {data.map((row, index) => {
        return (
         row.show && (
          <InfoCard
          key={index}
          title={row.title}
          description={row.description}
          icon={row.icon}
          showLineDivider={row.showLineDivider}
          showArrow={true}
          onPress={() => {
            dispatch(closeUploadModal())
            navigation.navigate(row.navigation)
          }}
          labelStyle={{
            color: COLORS.dark
          }}
        />
         )
        )
      })}
    </FlexContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
  }
})

export default Upload;
