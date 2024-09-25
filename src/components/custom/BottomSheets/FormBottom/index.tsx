import React from "react";
import { View, Text, ViewStyle } from "react-native";
import FlexContainer from "../../FlexContainer";
import Typography from "../../Typography";
import styles from "./styles";
import useTheme from "../../../../hooks/useTheme";

interface FormInputProps {
  sublabel?: string;
  subtitleStyle?: any;
  label?: string;
  children?: React.ReactNode;
  RNstyles?: ViewStyle
}

const FormBottom: React.FC<FormInputProps> = ({
  sublabel,
  subtitleStyle,
  label,
  children,
  RNstyles
}) => {
  const { Bg, Title } = useTheme()
  return (
    <FlexContainer newStyle={[styles.flexContainer, RNstyles, { backgroundColor: Bg }]}>
      <FlexContainer newStyle={styles.view}>
        <Typography variant='title' newStyle={[styles.text,{
          color: Title
        }]}>
          {label}
        </Typography>
        <Typography
          variant='SubDescription'
          newStyle={{ ...styles.typography, ...subtitleStyle }}
        >
          {sublabel}
        </Typography>
      </FlexContainer>
      {children}
    </FlexContainer>
  );
};

export default FormBottom;