import * as React from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import { FlexContainer } from "../../../../components/custom";
import { responsiveFontSize, SIZES } from "../../../../constants/theme";

interface IIncompleteInfoProps {
  visible: boolean;
  currentStep: number;
  totalSteps: number;
  onAddPress: () => void;
  onClosePress: () => void;
}

const IncompleteInfo: React.FC<IIncompleteInfoProps> = ({
  visible,
  currentStep,
  totalSteps,
  onAddPress,
  onClosePress,
}) => {
  if (!visible) {
    return null;
  }

  return (
    <FlexContainer newStyle={styles.containerMain}>
      <View style={styles.container}>
        <Text style={styles.title}>
          Complete your information {currentStep}/{totalSteps}
        </Text>
        <Text style={styles.subtitle}>To provide a better experience</Text>
        <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.closeButton} onPress={onClosePress}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>
    </FlexContainer>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    width: SIZES.BtnWidth,
    marginHorizontal: SIZES.gapLarge,
    position: "absolute",
    bottom: responsiveFontSize(58)
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,

  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    flex: 1,
    fontSize: 12,
    color: "#666",
  },
  addButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  closeButton: {
    marginLeft: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: "#666",
  },
});

export default IncompleteInfo;
