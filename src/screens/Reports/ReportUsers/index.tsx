import React, { useContext, useEffect, useState } from 'react';
import {
  Buttons,
  Container,
  FlexContainer,
  Typography,
  Checkbox,
  LoadingScreen,
} from '../../../components/custom';
import { ScrollView, TouchableOpacity } from '../../../components/native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import {
  reportedListService,
  reportUserService,
} from '../../../services/shares';
import styles from '../../explorar/Report/styles';
import i18next from 'i18next';

export type ReportOption = {
  id: number;
  title: string;
  description: string;
  checked: boolean;
};

type RootStackParamList = {
  Report: { userID: string };
};

const queryKey = ['reported-List-Service-useQuery'];
const ReportUsers = () => {
  const router = useRoute<RouteProp<RootStackParamList>>();
  const { userID } = router.params;
  const { data, isLoading, isError, error, refetch, isFetching } = useQuery({
    queryKey: [queryKey, userID],
    queryFn: reportedListService,
  });

  console.log('data', data);

  const [options, setOptions] = useState<ReportOption[]>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleCheckboxChange = (id: number, checked: boolean) => {
    setOptions(
      prevOptions =>
        prevOptions?.map(option =>
          option.id === id ? { ...option, checked } : option,
        ) || [],
    );
  };

  const handleSendReport = async () => {
    setLoading(true);
    const selectedItems = options
      ?.filter(option => option.checked)
      .map(option => option.id);
    try {
      await reportUserService(userID);
      console.log('Sending report...');
      setTimeout(() => {
        setLoading(false);
        console.log('Report sent!');
        Alert.alert(
          i18next.t('reports success'),
          i18next.t('reports success message'),
          [
            { text: 'OK', onPress: () => navigation.goBack() },
            { text: 'Block User', onPress: () => navigation.goBack() },
          ],
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Error sending report:', error);
      Alert.alert(
        i18next.t('reports error'),
        i18next.t('reports error message'),
        [{ text: 'OK' }],
      );
    }
  };

  useEffect(() => {
    if (data && !isLoading) {
      setOptions(data.list);
    }
  }, [data, isLoading]);

  const Typographys = ({
    title,
    subtitle,
  }: {
    title: string;
    subtitle: string;
  }) => (
    <FlexContainer>
      <Typography variant="subtitle" newStyle={styles.label}>
        {title}
      </Typography>
      <Typography variant="SubDescription" newStyle={styles.label}>
        {subtitle}
      </Typography>
    </FlexContainer>
  );

  const isAnyOptionChecked =
    Array.isArray(options) && options.some(option => option.checked);

  if (isLoading || isFetching) {
    return <LoadingScreen label={i18next.t('Loading')} />;
  }

  if (!Array.isArray(options)) {
    return null;
  }

  return (
    <Container
      useSafeArea={true}
      style={styles.container}
      showHeader={true}
      showTwoIconsLabel={true}
      label={i18next.t('Report User')}
      showFooter={true}
      labels={i18next.t('Report User')}
      variant={!isAnyOptionChecked ? 'disabled' : 'primary'}
      disabled={!isAnyOptionChecked || loading}
      onPressButtons={handleSendReport}
      loading={loading}
    >
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        {options?.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => handleCheckboxChange(item.id, !item.checked)}
            style={styles.optionContainer}
          >
            <Typographys title={item.title} subtitle={item.description} />
            <Checkbox
              checked={item.checked}
              onChange={checked => handleCheckboxChange(item.id, checked)}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </Container>
  );
};

export default ReportUsers;
