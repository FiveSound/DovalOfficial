import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useTheme } from "../../../hooks";
import { COLORS, responsiveFontSize, SIZES } from "../../../constants/theme";
import { OtpInput, OtpInputRef } from "react-native-otp-entry";

type OTPInputProps = {
  onChange: (code: string) => void;
};

const OTPInput = ({ onChange }: OTPInputProps) => {
  const { Title } = useTheme()
  const ref = useRef<OtpInputRef>(null);
  const { setValue, watch } = useForm({
    defaultValues: {
      code: "",
    },
  });

  let { code } = watch();

  const clearCode = () => {
    if (ref.current) {
      ref.current.clear();
      setValue("code", "");
    }
  };

  useEffect(() => {
    if (code.length > 3) {
      onChange(code);
      clearCode();
    }
  }, [code]);

  return (
    <OtpInput
      ref={ref}
      autoFocus={true}
      numberOfDigits={4}
      focusStickBlinkingDuration={400}
      focusColor={COLORS.primary}
      onTextChange={(value) => setValue("code", value)}
      onFilled={(value) => setValue('code', value)}
      theme={{
        pinCodeTextStyle: { color: Title },
        containerStyle: {
          width: SIZES.width / 2,
          marginVertical: SIZES.gapLarge,
        },
        pinCodeContainerStyle: {
          width: responsiveFontSize(40),
          height: responsiveFontSize(40)
        }
      }} />
  )
};
export default OTPInput;
