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

const Picker = memo((props: Props) => (
  <PickerComponent
    selectedValue={props.value}
    onValueChange={(value) => {
      props.onChange(value);
    }}
    style={{
      width: 70,
      height: 50,
      backgroundColor: "#F4F4F4",
    }}
  >
    {props.list.map((row) => (
      <PickerComponent.Item key={row.value} label={row.label} value={row.value} />
    ))}
  </PickerComponent>
));

export default Picker;
