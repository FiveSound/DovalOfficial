import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import Searched from "./Searched";
import SearchInput from "./SearchInput";
import MySavedLocations from "./MySavedLocations";
import { scale } from "react-native-size-matters";
import { Container, FlexContainer } from "../../../../components/custom";
import i18next from "../../../../Translate";
import { useTheme } from "../../../../hooks";

const MyLocationsGeneral = () => {
  const [hiddenSearch, setHiddenSearch] = useState(false);
  const { backgroundMaingrey } = useTheme()

  const { setValue, watch } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const { search } = watch();

  return (
    <Container
    label={i18next.t('My Addresses')}
    showHeader={true}
    showBack={true}
    style={{
      alignItems: 'center'
    }}
    >

      {!hiddenSearch && (
        <FlexContainer newStyle={{alignItems: 'center'}}>
          <SearchInput
          setValue={setValue}
          value={search}
        />
        </FlexContainer>
      )}

      <ScrollView
        style={{
          paddingHorizontal: scale(15),
        }}
      >
        {search?.length > 0 ? (
          <Searched
            search={search}
            setHiddenSearch={setHiddenSearch}
          />
        ) : (
          <MySavedLocations />
        )}
      </ScrollView>
    </Container>
  );
};

export default MyLocationsGeneral;
