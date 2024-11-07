import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import {
  getListCategoriesService,
  selectedCategoriesFromListService,
} from '../../../../services/recipes';
import {
  Container,
  FlexContainer,
  IsLoading,
  LineDivider,
  LoadingScreen,
  Perks,
  SearchHeader,
  Typography,
} from '../../../../components/custom';
import { LabelVariants } from './LabelVariants';
import { GridIcon } from '../../../../constants/IconsPro';
import { SIZES } from '../../../../constants/theme';
import { useTheme } from '../../../../hooks';

type CategoryType = {
  id: number;
  name: string;
  description: string;
  selected: boolean;
};

const Hashtags = () => {
  const { watch } = useFormContext();
  const { Title} = useTheme()
  const [searchTerm, setSearchTerm] = useState('');

  const values = watch();

  const [success, setSuccess] = useState(false);

  let { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['recipe-list-categories', values.id],
    queryFn: getListCategoriesService,
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationKey: ['recipe-list-categories', values.id],
    mutationFn: async (typeID: number) => {
      return await selectedCategoriesFromListService(values.id, typeID);
    },
    onSuccess: result => {
      queryClient.setQueryData(
        ['recipe-list-categories', values.id],
        (oldData: { list: CategoryType[] }) => ({
          ...oldData,
          list: oldData.list.map(row => ({
            ...row,
            selected: row.id === result.id ? result.selected : row.selected,
          })),
        }),
      );

      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    },
  });

  if (isLoading || isFetching)
    return <LoadingScreen label="Cargando categorias" />;

  if (isError)
    return <Typography variant="H4title">An ocurred error fetch!</Typography>;

  if (data) {
    return (
      <Container
        style={styles.container}
        label="Hashtags"
        showBack={true}
        showHeader={false}
      >
        <Typography variant='title'>Hashtags</Typography>
        <SearchHeader
          onChange={(text) => {
            setSearchTerm(text); 
          }}
          placeholder="Search hashtags"
        />
        <LabelVariants
          data={data}
          onPress={id => mutation.mutate(id)}
          isLoading={isLoading}
          AppendIcons={<GridIcon width={SIZES.icons} height={SIZES.icons} color={Title}/>}
          subLabel="2.8K Posts"
        />
        {success && (
          <Perks status="success" label="Guardado con exito!" Reverse={false} />
        )}
        {mutation.isPending && <IsLoading />}
      </Container>
    );
  }
};

export default Hashtags;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  title: {
    marginBottom: 10,
    fontWeight: 'bold',
  },
  searchInput: {
    marginBottom: 10,
    padding: 10,
    width: '100%',
    borderWidth: 1,
  },
});
