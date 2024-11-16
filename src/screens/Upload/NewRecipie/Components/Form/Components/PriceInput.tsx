import { InputLabel } from "../../../../../../components/custom";

interface Props {
  setValue: (name: string, value: any) => void;
  value: string;
}

const PriceInput: React.FC<Props> = ({ setValue, value }) => {
  return (
    <InputLabel
      placeholder={`Price $0`}
      keyboardType="default"
      value={value}
      onChangeText={(txt) => {
        setValue("price", txt);
      }}
    />
  );
};

export default PriceInput;
