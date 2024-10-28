import React from 'react';
import { FlexContainer, Icons, Typography } from '../../../components/custom';
import styles from './styles';
import {
  CommentAdd02Icon,
  HelpSquareIcon,
  SecurityBlockIcon,
  VideoOffIcon,
} from '../../../constants/IconsPro';
import { COLORS, FONTS, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import {
  ScrollView,
  TouchableOpacity,
  useNavigation,
} from '../../../components/native';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { closeMoreOptions } from '../../../redux/slides/modalSlice';
import { RootState } from '../../../redux/store';
import { blockPostService } from '../../../services/shares';
import { Alert } from 'react-native';
import { useAuth } from '../../../context/AuthContext';

type Props = {};

const Options = (props: Props) => {
  const { isAuthenticated } = useAuth();

  const { backgroundMaingrey, Title, Description, borderInput } = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const postID = useSelector((state: RootState) => state.modal.data?.postID);
  console.log('Ahora si crack se llama post ID', postID);

  const handleReport = async () => {
    console.log('handleReport called');
    dispatch(closeMoreOptions());
    setTimeout(() => {
      if (postID) {
        navigation.navigate('Report', { postID: postID });
      }
      console.log('Navigated to Report');
    }, 500);
  };

  const handleBlock = () => {
    console.log('handleBlock called');
    const BlockUser = async () => {
      try {
        await blockPostService(postID);
        Alert.alert('Success', 'User has been blocked successfully.');
        console.log('User blocked successfully');
        dispatch(closeMoreOptions());
      } catch (error) {
        console.error('Error blocking user:', error);
        Alert.alert(
          'Error',
          'There was an error blocking the user. Please try again.',
        );
      }
    };

    Alert.alert(
      'Are you sure you want to block this user?',
      'Blocking will prevent this user from interacting with you or your content on Doval. They will not be able to follow you, message you, or see your posts. You will also not be able to see their content.',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed', postID);
          },
          style: 'cancel',
        },
        { text: 'Block', onPress: BlockUser },
      ],
      { cancelable: false },
    );
  };

  return (
    <FlexContainer style={styles.containerOptions}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.containerOptionsIcons}
        horizontal={true}
      >
        {isAuthenticated && (
          <IconsOptions
            onPress={handleReport}
            label="Report"
            icon={
              <VideoOffIcon
                color={COLORS.error}
                width={SIZES.icons * 1.2}
                height={SIZES.icons * 1.2}
              />
            }
            error={true}
            style={{
              backgroundColor: 'red',
            }}
          />
        )}
        {isAuthenticated && (
          <IconsOptions
            onPress={handleBlock}
            label="Block"
            icon={
              <SecurityBlockIcon
                color={Description}
                width={SIZES.icons * 1.2}
                height={SIZES.icons * 1.2}
              />
            }
          />
        )}
        <IconsOptions
          label="Feedback"
          icon={
            <CommentAdd02Icon
              color={Description}
              width={SIZES.icons * 1.2}
              height={SIZES.icons * 1.2}
            />
          }
        />
        <IconsOptions
          label="help"
          icon={
            <HelpSquareIcon
              color={Description}
              width={SIZES.icons * 1.2}
              height={SIZES.icons * 1.2}
            />
          }
        />
        <IconsOptions
          label="help"
          icon={
            <HelpSquareIcon
              color={Description}
              width={SIZES.icons * 1.2}
              height={SIZES.icons * 1.2}
            />
          }
        />
      </ScrollView>
    </FlexContainer>
  );
};

export default Options;

export const IconsOptions = (props: any) => {
  const { backgroundMaingrey, Title, Description, borderInput } = useTheme();
  const { label, icon, error, onPress, style } = props;
  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onPress && onPress();
  };

  return (
    <TouchableOpacity
      style={styles.containerOptionsIcons}
      onPress={handlePress}
    >
      <FlexContainer
        style={[
          style,
          styles.containerIcons,
          {
            backgroundColor: backgroundMaingrey,
          },
        ]}
      >
        {icon}
      </FlexContainer>
      <Typography
        variant="H4title"
        newStyle={{
          color: error ? COLORS.error : Description,
          ...FONTS.semi12,
        }}
      >
        {label}
      </Typography>
    </TouchableOpacity>
  );
};
