import React, { memo, useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import useTheme from "../../../hooks/useTheme";
import {
  EarthIcon,
  MoreHorizontalCircle01Icon,
  StoreLocation01Icon,
} from "../../../constants/IconsPro";
import { Buttons, FlexContainer, Icons, Typography } from "../../../components/custom";
import { COLORS, FONTS, SIZES } from "../../../constants/theme";
import { TouchableOpacity, useNavigation} from "../../../components/native";
import * as Haptics from "expo-haptics";
import i18next from "../../../Translate";

type Props = {
  label?: string | undefined;
  onPress?: () => void | undefined;
  labeltwo?: string;
  ShowButtonTwo?: boolean;
  data: {
    avatar: string,
    bio: string | null,
    country: string,
    external_avatar: number,
    name: string,
    phone: string,
    username: string,
    userID: string
  }
};

const CtoProfile = ({
  data,
}: Props) => {
  const { backgroundMaingrey , Description} = useTheme();
  const navigation = useNavigation()

  return (
    <>
    {/* <Website /> */}
      <FlexContainer variant="row" newStyle={styles.container}>
        <Buttons
          label={i18next.t("Editar")}
          variant="primary"
          onPress={() => navigation.navigate('ProfileStack')}
          containerButtons={{
            backgroundColor: backgroundMaingrey,
            flex: 1,
          }}
          labelStyle={styles.textLabel}
        />
        <MoreOptions data={data}/>
      </FlexContainer>
    </>
  );
}

const MoreOptions = ({data}: {data: any}) => {
const { Title, Description } = useTheme()
const navigation = useNavigation()
const handleNavigation = useCallback(() => {
  navigation.navigate("Business", {id: data.businessID });
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
}, [navigation]);

  return (
    <FlexContainer variant="row" newStyle={styles.moreOptionsContainer}>
      {/* <Icons appendIcons={<StoreLocation01Icon width={SIZES.icons} height={SIZES.icons} color={Title}/>} onPress={handleNavigation}/> */}
      <Icons 
      appendIcons={<MoreHorizontalCircle01Icon width={SIZES.icons} height={SIZES.icons} color={Title}/>}
      />
    </FlexContainer>
  );
};

const Website = () => {
  const { Title } = useTheme()
  return (
    <TouchableOpacity style={styles.containerWbe}>
      <EarthIcon width={SIZES.icons} height={SIZES.icons} color={COLORS.primary}/>
      <Typography variant='SubDescription' newStyle={{
        color: Title
      }}>Supporting: Be The Match</Typography>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    gap: SIZES.gapMedium,
    backgroundColor: "transparent",
    marginVertical: SIZES.gapMedium,
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
  },
  textLabel: {
    ...FONTS.semi14,
  },
  moreOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: SIZES.gapMedium,
  },
  img: {
    width: SIZES.icons,
    height: SIZES.icons
  },
  containerWbe: {
    flexDirection: 'row',
    gap: SIZES.gapMedium,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default memo(CtoProfile);
