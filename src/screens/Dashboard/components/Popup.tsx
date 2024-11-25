import { ReactNode } from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import { BlurView } from 'expo-blur';
import { SIZES } from "../../../constants/theme";
import { useTheme } from "../../../hooks";
import { Typography } from "../../../components/custom";

type Props = {
  id: string;
  open: boolean;
  title: string;
  children: ReactNode;
};

const Popup = ({ id, open, title, children }: Props) => {
  const { backgroundMaingrey, border } = useTheme();
  return (
    <>
      <Modal animationType="fade" transparent visible={open}>
        <BlurView intensity={100} tint="dark" style={styles.blurContainer}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, { backgroundColor: backgroundMaingrey, borderColor: border }]}>
            <Typography variant="title">{title}</Typography>
            {children}
          </View>
        </View>
        </BlurView>
      </Modal>
    </>
  );
};

export default Popup;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    padding: SIZES.padding,
  },
  blurContainer: {
    flex: 1,
    textAlign: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    
  },
  modalView: {
    margin: SIZES.margin,
    minWidth: 300,
    padding: SIZES.padding,
    alignItems: "center",
    borderRadius: SIZES.radiusExtra,
    justifyContent: "center",
    borderWidth: SIZES.borderWidth,
  },
});
