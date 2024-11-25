import React from 'react';
import {
  Avatars,
  ButtonAcces,
  Container,
  FlexContainer,
  LineDivider,
  LoadingScreen,
} from '../../../components/custom';
import { useNavigation } from '../../../components/native';
import { useAuth } from '../../../context/AuthContext';
import { CLOUDFRONT } from '../../../services';
import { getProfileService } from '../../../services/auth';
import styles from './styles';
import { useQuery } from '@tanstack/react-query';
import i18next from '@/src/Translate';

const QUERY_KEY = ['get-Profile-Service'];
const EditProfile = () => {
  const navigation = useNavigation();
  const { isAuthenticated, isDataReady } = useAuth();
  const { data, isLoading, refetch, isFetching } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: () => getProfileService(),
  });

  if (isLoading && isDataReady || isFetching) {
    return <LoadingScreen label={i18next.t('Loading')} />;
  }
  const profileFields = [
    { label: 'Name', value: data?.name, navigation: 'name' },
    { label: 'Username', value: data?.username, navigation: 'name' },
    { label: 'Phone', value: data?.phone || 'add', navigation: 'name' },
    { label: 'Bio', value: data?.bio || 'add', navigation: 'name' },
    { label: 'Gender', value: data?.bio || 'add', navigation: 'name' },
    { label: 'Date', value: data?.bio || 'add', navigation: 'name' },
  ];

  const webFields = [
    { label: 'Web', value: data?.name, navigation: 'name' },
    { label: 'Show store', value: data?.username, navigation: 'name' },
    { label: 'Whatsapp', value: data?.phone, navigation: 'name' },
  ];

  const settingsFields = [
    { label: 'My Shop', value: data?.name, navigation: 'name' },
    { label: 'My Settings', value: data?.username, navigation: 'name' },
  ];

  return (
    <Container
      label="Edit Profile"
      showHeader={true}
      style={styles.container}
      showLineDivider={false}
    >
      <Avatars size="xxLarge" source={`${CLOUDFRONT}${data?.avatar}`} />
      <FlexContainer newStyle={styles.flexContainer}>
        {profileFields.map((field, index) => (
          <ButtonAcces
            key={index}
            label={field.label}
            labelPreview={field.value}
            ShowLineDivider={false}
            ArrowColor={false}
            // onPress={() => navigation.navigate(field.navigation)}
            container={styles.buttons}
          />
        ))}

        <LineDivider lineStyle={styles.line} />
        {webFields.map((field, index) => (
          <ButtonAcces
            key={index}
            label={field.label}
            labelPreview={field.value}
            ShowLineDivider={false}
            ArrowColor={false}
            // onPress={() => navigation.navigate(field.navigation)}
            container={styles.buttons}
          />
        ))}

        <LineDivider lineStyle={styles.line} />
        {settingsFields.map((field, index) => (
          <ButtonAcces
            key={index}
            label={field.label}
            labelPreview={field.value}
            ShowLineDivider={false}
            ArrowColor={false}
            // onPress={() => navigation.navigate(field.navigation)}
            container={styles.buttons}
          />
        ))}

        <LineDivider lineStyle={styles.line} />
      </FlexContainer>
    </Container>
  );
};

export default EditProfile;
