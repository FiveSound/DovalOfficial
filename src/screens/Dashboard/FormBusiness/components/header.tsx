import { memo } from "react";
import { SafeAreaView, TouchableOpacity } from "../../../../components/native";
import { Buttons, LineDivider, Typography } from "../../../../components/custom";
import { useTheme } from "../../../../hooks";
import ProgressBar from "./ProgressBar";
import { styles } from "../styles";

type Props = {
  currentStep: number;
  label: string;
  goBack: () => void;
  goNext: () => void;
  showDivider?: boolean;
  submit?: boolean;
  loading?: boolean;
  disabled?: boolean;
};

const Header = memo((props: Props) => {
  const { backgroundMaingrey } = useTheme();
  return (
    <>
      <ProgressBar progress={(props.currentStep - 1) * 20} />
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={props.goBack} style={[styles.backPersonal, { backgroundColor: backgroundMaingrey }]}>
          <Typography variant="H4title">Back</Typography>
        </TouchableOpacity>
        <Typography variant="subtitle" testID="header-label">
          {props.label}
        </Typography>
        <Buttons
          label={props.submit ? "Submit" : "Continue"}
          disabled={props.disabled}
          onPress={() => props.goNext()}
          loading={props.loading}
          variant="primary"
          containerButtons={styles.containerButtons}
        />
      </SafeAreaView>
      {props.showDivider && <LineDivider variant="secondary" />}
    </>
  );
});

export default Header;
