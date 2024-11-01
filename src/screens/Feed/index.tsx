import { memo, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  VirtualizedList,
  Image,
  RefreshControl,
} from 'react-native';
import { getExploreData } from '../../services/recipes';
import { SafeAreaView, useNavigation } from '../../components/native';
import { CLOUDFRONT } from '../../services';

const QUERY_KEY = 'explore-screen';

const Explorar = memo(() => {
  const { navigate } = useNavigation();
  const [page, setPage] = useState<number>(2);

  const explore = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: async () => await getExploreData(null, 1),
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: [QUERY_KEY],
    mutationFn: async p => {
      setPage(page + 1);
      return await getExploreData(null, p);
    },
    onSuccess: data => {
      queryClient.setQueryData([QUERY_KEY], oldData => [...oldData, ...data]);
    },
  });

  if (explore.isLoading || explore.isFetching) {
    return <ActivityIndicator />;
  }

  if (explore.isError) {
    return (
      <View>
        <Text>An ocurred error</Text>
        <TouchableOpacity>
          <Text>Reload</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (explore.data) {
    return (
      <SafeAreaView style={styles.container}>
        <Text
          onPress={() => {
            setPage(2);
            explore.refetch();
          }}
        >
          {explore.data.length}
        </Text>
        <TouchableOpacity onPress={() => navigate('Onboarding')}>
          <Text>Set preferences</Text>
        </TouchableOpacity>
        <VirtualizedList
          data={explore.data}
          initialNumToRender={5}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Image
                style={styles.cover}
                source={{ uri: `${CLOUDFRONT}${item.thumbnail}` }}
              />
              <Text style={styles.title}>{item.name}</Text>
              <Text>{item.business_name}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <View
                style={{
                  maxWidth: 300,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                }}
              >
                {/* {item.topics.map(row => (
                  <Text style={[{ padding: 4, backgroundColor: '#FF5500' }]}>
                    {row}
                  </Text>
                ))}
                {item.tags.map(row => (
                  <Text style={[{ padding: 4, backgroundColor: '#FF5500' }]}>
                    {row}
                  </Text>
                ))} */}
              </View>
              {/* <Text selectable>{JSON.stringify(item, null, 2)}</Text> */}
            </View>
          )}
          keyExtractor={item => item.id.toString()}
          getItemCount={() => explore.data.length}
          getItem={(data, index) => data[index]}
          onEndReached={() => {
            mutation.mutate(page);
          }}
          onEndReachedThreshold={3}
          refreshControl={
            <RefreshControl
              refreshing={explore.isRefetching}
              onRefresh={() => {
                setPage(2);
                explore.refetch();
              }}
              colors={['#0000ff']}
            />
          }
        />
      </SafeAreaView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  item: {
    marginBottom: 20,
  },
  cover: {
    width: 360,
    height: 360,
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    maxWidth: 350,
    fontSize: 15,
    marginBottom: 10,
    color: '#666',
  },
});

export default Explorar;
