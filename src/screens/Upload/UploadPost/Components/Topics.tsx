import { useState, memo } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import {
  Container,
  LoadingScreen,
  Perks,
  SearchHeader,
  Typography,
} from '../../../../components/custom';
import { GridIcon } from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { getTopicsService } from '../../../../services/posts';
import { iconsNative } from '../../../../constants';
import i18next from '../../../../Translate';

const Topics = memo(() => {
  const { control } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'topics',
    rules: {
      required: true,
    },
  });

  const { Title } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState(false);
  const selectedIds = fields.map((field: any) => field.value);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['posts-list-topics'],
    queryFn: getTopicsService,
  });

  const handleAddOrRemoveItem = (id: number) => {
    const itemIndex = selectedIds.indexOf(id);
    if (itemIndex === -1) {
      append({ value: id });
    } else {
      remove(itemIndex);
    }

    setSuccess(true);
  };

  if (isLoading || isFetching) {
    return <LoadingScreen label={i18next.t('Loading')} />;
  }

  if (isError) {
    return <Typography variant="H4title">An occurred error fetch!</Typography>;
  }

  return (
    <Container
      style={styles.container}
      label="Topics"
      showBack={true}
      showHeader={true}
    >
      {/* <Typography variant="title">Topics</Typography>
      <SearchHeader
        onChange={text => setSearchTerm(text)}
        placeholder="Search topics..."
      /> */}

      <FlatList
        data={data?.list || []}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);

          return (
            <TouchableOpacity
              onPress={() => handleAddOrRemoveItem(item.id)}
              style={styles.item}
            >
              <Image
                source={iconsNative.Topics}
                style={{ tintColor: isSelected ? '#FF5500' : '#000' }}
              />

              <Typography
                variant="H4title"
                newStyle={[isSelected && styles.selectedItem]}
              >
                {item.title}
              </Typography>
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.title}
      />

      {success && (
        <Perks status="success" label="Guardado con exito!" Reverse={false} />
      )}
    </Container>
  );
});

export default Topics;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  item: {
    marginVertical: SIZES.gapMedium,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapMedium,
    paddingHorizontal: SIZES.gapLarge,
  },
  icon: {
    padding: 10,
    backgroundColor: 'transparent',
    borderRadius: 25,
  },
  itemText: {
  },
  selectedItem: {
    color: '#FF5500',
  },
});
