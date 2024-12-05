import { memo } from "react";
import { Picker as PickerComponent } from "@react-native-picker/picker";

type ListType = {
  value: string;
  label: string;
};

type Props = {
  onChange: (value: string) => void;
  label: string;
  defaultValue: string;
  value: string;
  list: ListType[];
  required?: boolean;
};

const Pickers = memo((props: Props) => (
  <PickerComponent
    selectedValue={props.value}
    onValueChange={(value) => {
      props.onChange(value);
    }}
    style={{
      width: 80,
      backgroundColor: "#F4F4F4",
    }}
    itemStyle={{
      width: 80,
      fontSize: 10,
    }}
    mode="dropdown"
  >
    {props.list.map((row) => (
      <PickerComponent.Item key={row.value} label={row.label} value={row.value} />
    ))}
  </PickerComponent>
));

export default Pickers;
