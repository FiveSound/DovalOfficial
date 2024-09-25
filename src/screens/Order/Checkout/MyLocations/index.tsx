import { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView } from "react-native";
import Searched from "./Searched";
import SearchInput from "./SearchInput";
import MySavedLocations from "./MySavedLocations";
import { Container, FlexContainer } from "../../../../components/custom";
import i18next from "../../../../Translate";
import { responsiveFontSize } from "../../../../constants/theme";

const MyLocations = () => {
  const [hiddenSearch, setHiddenSearch] = useState(false);

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
          paddingHorizontal: responsiveFontSize(15),
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

export default MyLocations;
