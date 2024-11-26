import React from 'react';
import { useRefreshData } from '../../../../../hooks';
import i18next from '../../../../../Translate';
import {
  COLORS,
  SIZES,
} from '../../../../../constants/theme';
import {
  FlexContainer,
  LoadingScreen,
  ScreenEmpty,
} from '../../../../../components/custom';
import { Ilustrations } from '../../../../../constants';
import {
  useNavigation,
} from '../../../../../components/native';
import styles from '../styles';
import MasonryUsers from '../../../../../components/custom/MasonryUsers';
import { useAppSelector } from '@/src/redux';

const Main = (props: any) => {
  const { isConnected } = useAppSelector((state) => state.auth);
  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refetchPostData,
    username,
    isRefetching,
    onLoadMore,
    loading,
  } = props;
  const { isRefreshing, onRefresh } = useRefreshData([refetchPostData]);
  const navigation = useNavigation();

  if (isLoading || isRefetching) {
    return <LoadingScreen />
  }


  if (data?.length > 0 || 0) {
    return (
      <>
          <MasonryUsers
            pins={data}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            loading={loading}
            onLoadMore={onLoadMore}
          />
      </>
    );
  } else {
    return (
    
        <FlexContainer newStyle={styles.containerEmpty}>
          <ScreenEmpty
            labelPart1={
              isConnected
                ? i18next.t("You don't have posts yet")
                : i18next.t('Oh no, weve had problems')
            }
            labelPart2={
              isConnected
                ? i18next.t('Upload your content today')
                : i18next.t('Please check your internet and try again')
            }
            labelButton={i18next.t('Upload posts')}
            onPress={() => {
              navigation.navigate('TabsUpload');
            }}
            labelStylePart1={{
              ...styles.labelStylePart1,
              color: isConnected ? COLORS.primary : COLORS.error,
            }}
            labelStylePart2={{
              ...styles.labelStylePart1,
              color: isConnected ? COLORS.Description : COLORS.error,
            }}
            source={
              isConnected ? Ilustrations.EmptyMedia : Ilustrations.InternetLose
            }
            ImgWidth={SIZES.width}
            ImgHeigth={SIZES.height / 3.6}
            colorVariant="primary"
            ShowButton={false}
          />
        </FlexContainer>
    );
  }
};

export default Main;
