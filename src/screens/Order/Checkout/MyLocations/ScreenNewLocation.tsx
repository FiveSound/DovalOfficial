import { memo } from "react";
import { StyleSheet } from "react-native";
import TitleWithBack from "./TitleWithBack";
import SearchResults from "./ComponentSearchLocations";
import { SafeAreaView, useNavigation } from "../../../../components/native";
import { Container } from "../../../../components/custom";
import i18next from "../../../../Translate";

const ScreenNewLocation = memo(() => {
  const navigation = useNavigation();
  return (
    <Container 
    showHeader={true}
    label={i18next.t('Add a new address')}
    style={styles.centeredView}
    >
      <SearchResults />
    </Container>
  );
});

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
});

export default ScreenNewLocation;
