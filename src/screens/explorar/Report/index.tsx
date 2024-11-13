import React, { useContext, useEffect, useState } from 'react';
import {
  Buttons,
  Container,
  FlexContainer,
  Typography,
  Checkbox,
  LoadingScreen,
} from '../../../components/custom';
import styles from './styles';
import { ScrollView, TouchableOpacity } from '../../../components/native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import { reportedListService, reportService } from '../../../services/shares';
import { useQuery } from '@tanstack/react-query';
import { TabBarVisibilityContext } from '../../../context/TabBarVisibilityContext';
import i18next from 'i18next';

export type ReportOption = {
  id: number;
  title: string;
  description: string;
  checked: boolean;
};
type RootStackParamList = {
  Report: { postID: number };
};
const Report = () => {
  const router = useRoute<RouteProp<RootStackParamList>>();
  const { postID } = router.params;
  const { data, isLoading, isError, error, refetch , isFetching} = useQuery({
    queryKey: ['reported-List-Service-useQuery'],
    queryFn: reportedListService,
  });
    
  const [options, setOptions] = useState<ReportOption[]>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const { setTabBarVisible } = useContext(TabBarVisibilityContext);
  useEffect(() => {
    setTabBarVisible(false);

    return () => {
      setTabBarVisible(true);
    };
  }, [setTabBarVisible]);

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
      await reportService(postID, selectedItems);
      setTimeout(() => {
        setLoading(false);
        Alert.alert(
          i18next.t('Success'),
          i18next.t('Your report has been successfully submitted. Thank you for your report, it helps us improve.'),
          [{ text: i18next.t('OK'), onPress: () => navigation.goBack() }],
        );
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error('Error sending report:', error);
      Alert.alert(
        'Error',
        i18next.t('There was an error submitting your report. Please try again later.'),
        [{ text: i18next.t('OK') }],
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
    return <LoadingScreen />;
  }

  if (!Array.isArray(options)) {
    return null; // or some fallback UI
  }

  return (
    <Container
      useSafeArea={true}
      style={styles.container}
      showHeader={true}
      showTwoIconsLabel={true}
      label={i18next.t('Report')}
      showFooter={true}
      labels={i18next.t('Report Post')}
      variant={!isAnyOptionChecked ? 'disabled' : 'primary'}
      disabled={!isAnyOptionChecked || loading}
      onPressButtons={handleSendReport}
      loading={loading}
      color='dark'
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
            <Typographys title={i18next.t(item.title)} subtitle={i18next.t(item.description)  } />
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

export default Report;
