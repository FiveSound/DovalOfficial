import { useState } from "react";
import { useTheme } from "../../../../hooks";
import { Search } from "../../../../components/custom";
import i18next from "../../../../Translate";
import { COLORS } from "../../../../constants/theme";


interface PropsSearchInput {
  setValue: Function;
  value: string;
}

const SearchInput = (props: PropsSearchInput) => {
  const { setValue, value } = props;
  const { borderInput } = useTheme()
  const [select , setSelect ] = useState(false)

  return (
    <Search 
    placeholder={i18next.t('Add my location')}
    label={i18next.t('Add my location')}
    onChange={(value) =>
      setValue("search", value, { shouldDirty: true })
    }
    containerStyle={{
      borderColor: select ? COLORS.primary : borderInput
    }}
    value={value}
    onBlur={() => setSelect(false)}
    onFocus={() => setSelect(true)}
    />
  );
};

export default SearchInput;
