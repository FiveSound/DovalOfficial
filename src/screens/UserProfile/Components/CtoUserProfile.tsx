import React, { memo, useCallback, useState } from 'react';
import { StyleSheet } from 'react-native';
import useTheme from '../../../hooks/useTheme';
import {
  EarthIcon,
  MoreHorizontalCircle01Icon,
  StoreLocation01Icon,
} from '../../../constants/IconsPro';
import {
  Buttons,
  FlexContainer,
  Icons,
  Typography,
} from '../../../components/custom';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import {
  TouchableOpacity,
  Image,
  useNavigation,
} from '../../../components/native';
import { useAuth } from '../../../context/AuthContext';
import * as Haptics from 'expo-haptics';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getFollowingProfileService,
  handleProfileFollowingService,
} from '../../../services/follows';
import i18next from '../../../Translate';
import { openModalMoreOptionsProfile } from '../../../redux/slides/modalSlice';
import { useDispatch } from 'react-redux';

type Props = {
  label?: string | undefined;
  onPress?: () => void | undefined;
  labeltwo?: string;
  ShowButtonTwo?: boolean;
  data: {
    avatar: string;
    bio: string | null;
    country: string;
    external_avatar: number;
    name: string;
    phone: string;
    username: string;
    userID: string;
  };
};

const CtoUserProfile = ({ data }: Props) => {
  const { backgroundMaingrey, Description } = useTheme();
  const navigation = useNavigation();
  const { user, isLoadingApp } = useAuth();
  const queryClient = useQueryClient();
  const [visible, setVisible] = useState(false);

  const {
    data: dataCto,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ['component-cto-public', data.userID, user?.userID],
    queryFn: getFollowingProfileService,
    enabled: data.userID && !isLoadingApp ? true : false,
  });

  const mutation = useMutation({
    mutationFn: handleProfileFollowingService,
    onMutate: variables => {},
    onSuccess: ({ follow }) => {
      queryClient.setQueryData(
        ['component-cto-public', data.userID, user?.userID],
        (oldData: any) => {
          const newData = {
            ...oldData,
            followers: follow ? oldData.followers + 1 : oldData.followers - 1,
            followed: follow,
          };
          return newData;
        },
      );
    },
    onError: error => {
      console.error('Mutation error:', error);
    },
    onSettled: (data, error, variables, context) => {
      console.log('Mutation settled:', { data, error, variables, context });
    },
  });

  if (dataCto) {
    const { followed, following, followers, posts } = dataCto;

    return (
      <>
        <Website />
        <FlexContainer variant="row" newStyle={styles.container}>
          <Buttons
            loading={isLoading || isFetching}
            label={
              user?.userID === data?.userID
                ? i18next.t('Editar')
                : followed
                  ? i18next.t('Following')
                  : isLoading || isFetching
                    ? ''
                    : i18next.t('Follow')
            }
            variant={
              user?.userID === data?.userID
                ? 'disabled'
                : followed
                  ? 'disabled'
                  : 'primary'
            }
            onPress={
              user?.userID === data?.userID
                ? () => navigation.navigate('ProfileStack')
                : () => {
                    if (user) {
                      mutation.mutate(data.userID);
                      if (followed) {
                        console.log('Unfollowing');
                      } else {
                        console.log('Following');
                      }
                    } else {
                      setVisible(true);
                    }
                  }
            }
            containerButtons={{
              backgroundColor: backgroundMaingrey,
              flex: 1,
            }}
            labelStyle={styles.textLabel}
          />
          <MoreOptions data={data} />
        </FlexContainer>
      </>
    );
  }
};

const MoreOptions = ({ data }: { data: any }) => {
  const { Title, Description } = useTheme();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleNavigation = useCallback(() => {
    navigation.navigate('Business', { id: data.userID });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }, [navigation]);

  return (
    <FlexContainer variant="row" newStyle={styles.moreOptionsContainer}>
      <Icons
        appendIcons={
          <StoreLocation01Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={Title}
          />
        }
        onPress={handleNavigation}
      />
      <Icons
        appendIcons={
          <MoreHorizontalCircle01Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={Title}
          />
        }
        onPress={() => dispatch(openModalMoreOptionsProfile({ data }))}
      />
    </FlexContainer>
  );
};

const Website = () => {
  const { Title } = useTheme();
  return (
    <TouchableOpacity style={styles.containerWbe}>
      <EarthIcon
        width={SIZES.icons}
        height={SIZES.icons}
        color={COLORS.primary}
      />
      <Typography
        variant="SubDescription"
        newStyle={{
          color: Title,
        }}
      >
        Supporting: Be The Match
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SIZES.gapMedium,
    backgroundColor: 'transparent',
    marginVertical: SIZES.gapMedium,
    width: SIZES.width,
    paddingHorizontal: SIZES.gapLarge,
  },
  textLabel: {
    ...FONTS.semi14,
  },
  moreOptionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: SIZES.gapMedium,
  },
  img: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
  containerWbe: {
    flexDirection: 'row',
    gap: SIZES.gapMedium,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default memo(CtoUserProfile);
