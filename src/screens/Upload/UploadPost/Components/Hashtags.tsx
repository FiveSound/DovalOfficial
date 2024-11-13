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
  Typography,
} from '../../../../components/custom';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';
import { getHashtagsService } from '../../../../services/posts';
import { iconsNative } from '../../../../constants';
import i18next from '../../../../Translate';

const Hashtags = memo(() => {
  const { control } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'hashtags',
    rules: {
      required: false,
    },
  });

  const { Title } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [success, setSuccess] = useState(false);
  const selectedIds = fields.map((field: any) => field.value);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['posts-list-hashtags'],
    queryFn: getHashtagsService,
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
      label="Hashtags"
      showBack={true}
      showHeader={true}
    >
      {/* <SearchHeader
        onChange={text => setSearchTerm(text)}
        placeholder="Search hashtags"
        showBack={false}
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
        maxToRenderPerBatch={10}
        initialNumToRender={10}
        windowSize={10}
      />

      {success && (
        <Perks status="success" label="Guardado con exito!" Reverse={false} />
      )}
    </Container>
  );
});

export default Hashtags;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
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
  selectedItem: {
    color: '#FF5500',
  },
});
