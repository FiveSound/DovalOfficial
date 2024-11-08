import { lazy, memo, Suspense, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FlatList, Text } from 'react-native';
import { getTagsService } from '../../../../services/posts';
import { Container, IsLoading, LoadingScreen, ScreenEmpty, SearchHeader, Typography } from '../../../../components/custom';
import { CLOUDFRONT } from '../../../../services';
import i18next from '../../../../Translate';
import { SIZES } from '../../../../constants/theme';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Ilustrations } from '../../../../constants';
const Follow = lazy(() => import('../../../../components/custom/Cards/CardUsers'));

const Tags = memo(() => {
  const [success, setSuccess] = useState(false);
  const { control } = useFormContext();
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'tags',
    rules: {
      required: false,
    },
  });
  const selectedIds = fields.map((field: any) => field.value);
  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['posts-list-tags'],
    queryFn: getTagsService,
  });
  console.log(data);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddOrRemoveItem = (id: number) => {
    const itemIndex = selectedIds.indexOf(id);
    if (itemIndex === -1) {
      append({ value: id });
    } else {
      remove(itemIndex);
    }

    setSuccess(true);
  };

  const filteredData = useMemo(() => {
    if (!data?.list) return [];
    return data.list.filter(tag =>
      tag.business_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tag.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);


  if (isLoading || isFetching) {
    return <LoadingScreen label={i18next.t('Loading')} />;
  }

  if (isError) {
    return (
      <Container
      label={i18next.t('Tags')}
      showHeader={true}
    >
      <ScreenEmpty
        labelPart1={i18next.t('An occurred error fetch!')}
        labelPart2={i18next.t('Please try again later')}
        source={Ilustrations.CharcoPet}
        ImgHeigth={SIZES.height / 2}
        ImgWidth={SIZES.width}
        onPress={refetch}
        labelButton={i18next.t('Try again')}
      />
    </Container>
    )
  }

  return (
    <Container
      showHeader={true}
      label={i18next.t('Tags')}
      style={{ paddingHorizontal: SIZES.gapLarge }}
    >
      <SearchHeader
        onChange={text => setSearchTerm(text)}
        placeholder="Search tags..."
        showBack={false}
        value={searchTerm}
      />
      <FlatList
        data={filteredData}
        renderItem={({ item }) => {
          const isSelected = selectedIds.includes(item.id);
          return (
            <Suspense fallback={<IsLoading />}>
              <Follow
                businessID={item.id}
                key={item.userID}
                userID={item.userID}
                cover={`${CLOUDFRONT}${item.cover}`}
                username={item.username}
                name={item.business_name}
                isVerified={Boolean(item.verify)}
                followersCount={item.follower_count}
                onFollow={() => handleAddOrRemoveItem(item.id)}
                Follow={isSelected}
                // ShowButton={userID == item.userID ? false : true}
                ShowLine={false}
                ShowAccess={false}
                ShowName={true}
                isLoading={false}
                customLabel={true}
                customLabelText={isSelected ? 'Selected' : 'Tag Business'}
              />
            </Suspense>
          );
        }}
        keyExtractor={item => item.id.toString()}
      />
    </Container>
  );
});

export default Tags;
