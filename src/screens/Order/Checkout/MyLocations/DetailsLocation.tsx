import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTheme } from '../../../../hooks';
import {
  addNewLocationService,
  searchLocationByPlaceID,
} from '../../../../services/orders';
import {
  Buttons,
  FlexContainer,
  InputLabel,
  IsLoading,
  LoadingScreen,
  Perks,
} from '../../../../components/custom';
import i18next from '../../../../Translate';
import { useNavigation } from '../../../../components/native';
import { useQuery } from '@tanstack/react-query';

interface Props {
  placeID: string;
  setHiddenSearch: Function;
}

interface PropsUseForm {
  location_details: string;
  apartment: string;
  tag: string;
  details: string;
  location: string;
}

interface PropsData {
  data: any;
  isLoading: Boolean;
  isFetching: Boolean;
  isRefetching: Boolean;
}

const Form = (props: any) => {
  const { formatted_address, geometry } = props;
  const { backgroundMaingrey } = useTheme();
  const navigation = useNavigation();

  const {
    setValue,
    handleSubmit,
    watch,
    formState: { isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<PropsUseForm>({
    defaultValues: {
      location_details: formatted_address,
      apartment: '',
      tag: '',
      details: '',
      location: geometry.location,
    },
  });

  const { location_details, apartment, tag, details } = watch();

  const onSubmit = async () => {
    const { locationID } = await addNewLocationService(watch());

    if (locationID) {
      navigation.navigate('Checkout', {
        locationID,
      });
    }
  };

  const onChange = (name: any, value: string) => {
    setValue(name, value, { shouldDirty: true });
  };

  return (
    <>
      <InputLabel
        placeholder={i18next.t('Address')}
        label={i18next.t('Address')}
        onChangeText={value => onChange('location_details', value)}
        value={location_details}
      />

      <InputLabel
        label={i18next.t('Building/Apartment')}
        placeholder={i18next.t('Building/Apartment')}
        onChangeText={value => onChange('apartment', value)}
        value={apartment}
      />

      <InputLabel
        label={i18next.t('Tag / Girlfriend, Home, Work')}
        onChangeText={value => onChange('tag', value)}
        placeholder={i18next.t('Tag / Girlfriend, Home, Work')}
        value={tag}
      />

      <InputLabel
        label={i18next.t('Delivery details')}
        placeholder={i18next.t('Delivery details')}
        onChangeText={value => onChange('details', value)}
        value={details}
      />

      {isSubmitting && <IsLoading />}

      <Buttons
        label={i18next.t('Save location')}
        onPress={handleSubmit(onSubmit)}
        disabled={!isDirty || isSubmitting}
        loading={isSubmitting}
      />

      {isSubmitSuccessful && (
        <Perks
          label={i18next.t('You have successfully added a location!')}
          status="success"
        />
      )}
    </>
  );
};

const DetailsLocation = (props: Props) => {
  const { placeID, setHiddenSearch } = props;
  const { backgroundMaingrey } = useTheme();
  useEffect(() => {
    setHiddenSearch(true);
  }, []);

  const { data, isLoading, isFetching, isRefetching }: PropsData = useQuery({
    queryKey: ['search-place-id-useQuery', placeID],
    queryFn: searchLocationByPlaceID,
  });

  if (isLoading || isFetching || isRefetching) {
    return <LoadingScreen />;
  }

  if (data) {
    const { results } = data;
    const { formatted_address, geometry } = results[0];

    return (
      <FlexContainer
        newStyle={{
          backgroundColor: backgroundMaingrey,
        }}
      >
        <Form formatted_address={formatted_address} geometry={geometry} />
      </FlexContainer>
    );
  }
};

export default DetailsLocation;
