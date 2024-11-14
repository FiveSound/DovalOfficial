import { memo, useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import SearchInput from "./SearchInput";
import { useForm } from "react-hook-form";
import { searchLocalAddressService } from "../../../../services/locations";

type Props = {
  onSuccess: (obj: object) => void;
};

const FromLocation = memo((props: Props) => {
  const [results, setResults] = useState<any[]>([]);

  const { watch, setValue } = useForm({
    defaultValues: { search: "" },
  });

  const values = watch();

  useEffect(() => {
    const getDetails = async () => {
      const response = await searchLocalAddressService(values.search);
      setResults(response);
    };

    getDetails();
  }, [values.search]);

  return (
    <View>
      <SearchInput value={values.search} setValue={setValue} />

      <FlatList
        data={results}
        renderItem={({ item }) => (
          <Text
            style={{ padding: 10 }}
            onPress={() => {
              props.onSuccess({ place_id: item.place_id });
              setValue("search", "");
              setResults([]);
            }}
          >
            {item.description}
          </Text>
        )}
        keyExtractor={(item) => item.description}
      />
    </View>
  );
});

export default FromLocation;
