import { memo, useState, lazy } from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import i18next from '../../../../Translate';
import {
  Container,
  LoadingScreen,
  SearchHeader,
  Typography,
} from '../../../../components/custom';
import { getTagsService } from '../../../../services/posts';

const Tags = memo(() => {
  const [searchTerm, setSearchTerm] = useState('');

  const { control } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'tags',
    rules: {
      required: false,
    },
  });

  const selectedIds = fields.map((field: any) => field.value);

  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['posts-list-tags'],
    queryFn: getTagsService,
  });

  const handleAddOrRemove = (userID: string) => {
    const itemIndex = selectedIds.indexOf(userID);
    if (itemIndex === -1) {
      append({ value: userID });
    } else {
      remove(itemIndex);
    }
  };

  if (isError) {
    return <Typography variant="H4title">An occurred error fetch!</Typography>;
  }

  if (isLoading || isFetching) {
    return <LoadingScreen label={i18next.t('Loading')} />;
  }

  return (
    <Container showHeader={true} label={i18next.t('My MenuRecipes')}>
      <SearchHeader
        onChange={setSearchTerm}
        placeholder={i18next.t('Search')}
        value={searchTerm}
        showBack={false}
      />
      <FlatList
        data={data.list}
        style={styles.container}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.userID);
          return (
            <View style={styles.header}>
              <View>
                <Text style={styles.title}>{item.business_name}</Text>
                <Text>{item.username}</Text>
              </View>
              <View style={{ width: 120 }}>
                <Button
                  onPress={() => handleAddOrRemove(item.userID)}
                  title={isSelected ? 'Tagging' : 'Tag'}
                  color={!isSelected ? 'rgba(97, 97, 97, 0.70)' : '#FF5500'}
                />
              </View>
            </View>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
});
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default Tags;
