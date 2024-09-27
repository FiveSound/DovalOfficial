import React, { useState } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { FlexContainer, InfoCard } from '../../../components/custom';
import { COLORS, SIZES } from '../../../constants/theme';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigation } from '../../../components/native';
import { closeModalMoreOptionsProfile, openModalAboutAccount } from '../../../redux/slides/modalSlice';
import { blockService } from '../../../services/shares';
import { useAuth } from '../../../context/AuthContext';
import data from './data';
import { RootState } from '../../../redux/store';
import i18next from '../../../Translate';

type props = {}

const MoreOptions = (props: props) => {
const dispatch = useDispatch()
const navigation = useNavigation()
const [ block, setBlock ] = useState(false)
const {
  data: userData
} = useSelector((state: RootState) => state.modal)


 if(block) {
    const BlockUser = async () => {
      try {
        await blockService(userData.userID);
        Alert.alert(i18next.t("Success"), i18next.t("User has been blocked successfully."));
        console.log("User blocked successfully");
        dispatch(closeModalMoreOptionsProfile())  
        navigation.goBack()
      } catch (error) {
        console.error("Error blocking user:", error);
        Alert.alert(
          i18next.t("Error"),
          i18next.t("There was an error blocking the user. Please try again.")
        );
      }
    };
  
    Alert.alert(
      i18next.t("Are you sure you want to block this user?"),
      i18next.t("Blocking will prevent this user from interacting with you or your content on Doval. They will not be able to follow you, message you, or see your posts. You will also not be able to see their content."),
      [
        {
          text: i18next.t("Cancel"),
          onPress: () => {
            console.log("Cancel Pressed", );
          },
          style: "cancel",
        },
        { text: i18next.t("Block"), onPress: BlockUser },
      ],
      { cancelable: false }
    );
 }

  return (
    <FlexContainer newStyle={styles.container}>
    {data.map((row, index) => {
      return (
        <InfoCard
          key={row.id}
          title={row.title}
          description={row.description}
          icon={row.icon}
          showLineDivider={row.showLineDivider}
          showArrow={true}
          onPress={() => {
            dispatch(closeModalMoreOptionsProfile())
            if (row.action === 'About this user') {
              dispatch(openModalAboutAccount())
            } else if (typeof row.action === 'string') {
              navigation.navigate(row.action, { userID: userData.userID })
            } else {
              setBlock(typeof row.action === 'boolean' ? row.action : false)
            }
          }}
          labelStyle={styles.labelStyle}
          lineStyle={styles.lineStyle}
        />
      )
    })}
  </FlexContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
  },
  labelStyle: {
    color: COLORS.dark
  },
  lineStyle: {
   backgroundColor: COLORS.BorderInputLight
  }
})

export default MoreOptions;
