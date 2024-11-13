import { useQuery } from '@tanstack/react-query';
import { memo, useMemo, useState } from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { getMyRecipesService } from '../../../../services/recipes';
import {
  Container,
  LoadingScreen,
  SearchHeader,
  Typography,
} from '../../../../components/custom';
import CardRecipies from '../../../../components/custom/business/CardRecipies';
import i18next from '../../../../Translate';
import { useFieldArray, useFormContext } from 'react-hook-form';

const Recipes = memo(() => {
  const { data, isLoading, isFetching, isError } = useQuery({
    queryKey: ['posts-list-my-recipes'],
    queryFn: getMyRecipesService,
  });
  const [success, setSuccess] = useState(false);
  const { control, setValue } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'recipeID',
    rules: {
      required: false,
    },
  });
  const selectedIds = fields.map((field: any) => field.value);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);


  const handleSelectItem = (id: number) => {
    if (selectedId === id) {
      // Si el mismo ID está seleccionado, lo deselecciona
      setSelectedId(null);
      setValue('recipeID', null, { shouldDirty: true, shouldValidate: true });
    } else {
      // Selecciona un nuevo ID y actualiza el formulario
      setSelectedId(id);
      setValue('recipeID', id, { shouldDirty: true, shouldValidate: true });
    }
  };

  const filteredData = useMemo(() => {
    if (!data) return [];
    return data.filter((recipe: any) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [data, searchTerm]);

  if (isLoading || isFetching) {
    return <LoadingScreen label="Cargando categorias" />;
  }

  if (isError) {
    return <Typography variant="H4title">An occurred error fetch!</Typography>;
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
        data={filteredData}
        renderItem={({ item }) => {
          const isSelected = selectedId === item.id;
          return (
            <TouchableOpacity onPress={() => handleSelectItem(item.id)}>
              <CardRecipies
                row={item}
                isSelected={isSelected}
                isBusiness={false}
              />
            </TouchableOpacity>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
});

export default Recipes;
