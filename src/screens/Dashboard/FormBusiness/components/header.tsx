import { memo } from "react";
import { SafeAreaView, TouchableOpacity } from "../../../../components/native";
import { Buttons, FlexContainer, LineDivider, Typography } from "../../../../components/custom";
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
  showProgressBar?: boolean;
};

const Header = memo((props: Props) => {
  const { currentStep, label, goBack, goNext, submit, loading, disabled, showDivider, showProgressBar = true } = props;
  const { backgroundMaingrey } = useTheme();
  return (
    <SafeAreaView style={styles.containermain}>
      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={goBack} style={[styles.backPersonal, { backgroundColor: backgroundMaingrey }]}>
          <Typography variant="H4title">Back</Typography>
        </TouchableOpacity>
        <Typography variant="subtitle" testID="header-label">
          {label}
        </Typography>
        <Buttons
          label={submit ? "Submit" : "Continue"}
          disabled={disabled}
          onPress={() => goNext()}
          loading={loading}
          variant={disabled ? 'disabled' : 'primary'}
          containerButtons={styles.containerButtons}
        />
      </SafeAreaView>
      {showProgressBar && <ProgressBar progress={(currentStep - 1) * 20} />}
      {showDivider && <LineDivider variant="secondary" />}
    </SafeAreaView>
  );
});

export default Header;
