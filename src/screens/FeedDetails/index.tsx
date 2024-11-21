import React from "react";
import { StyleSheet } from "react-native";
import  Main from "./components/Main";
import { SafeAreaView } from "@/src/components/native";


const FeedDetails = () => {

  return ( <SafeAreaView style={styles.container}><Main  /></SafeAreaView> );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedDetails;
