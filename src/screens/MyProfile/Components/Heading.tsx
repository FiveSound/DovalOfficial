import React, { memo } from 'react';
import { StyleSheet } from 'react-native';
import {
  AddCircleHalfDotIcon,
  Menu01Icon,
  UploadCircle01Icon,
  VerifyIcons,
} from '../../../constants/IconsPro';
import { useTheme } from '../../../hooks';
import {
  ArrowBack,
  FlexContainer,
  Typography,
} from '../../../components/custom';
import { FONTS, SIZES } from '../../../constants/theme';
import { useDispatch } from 'react-redux';
import { openUploadModal } from '../../../redux/slides/modalSlice';
import { TouchableOpacity } from '../../../components/native';
import { useAppSelector } from '../../../redux';
import { RootState } from '../../../redux/store';

interface PropsHeader {
  username: string | null | undefined;
  onPressMenu?: () => void;
  onPressUpload?: () => void;
  verify?: boolean | undefined;
  action: boolean;
  Arrowback: boolean;
  ArrowbackNavigation: boolean;
}

const Heading = ({
  username,
  onPressMenu,
  verify,
  action,
  Arrowback,
  ArrowbackNavigation,
}: PropsHeader) => {
  const { color, Description } = useTheme();
  const dispatch = useDispatch();
  const { businessVerified } = useAppSelector((state: RootState) => state.auth)

  return (
    <>
      <FlexContainer variant="row" newStyle={styles.flexContainer}>
        <FlexContainer variant="row" newStyle={styles.innerFlexContainer}>
          {ArrowbackNavigation && <ArrowBack />}
          <Typography
            variant="title"
            numberOfLines={1}
            newStyle={styles.username}
          >
            @{username}
          </Typography>
          {verify && (
            <VerifyIcons width={SIZES.icons / 1.2} height={SIZES.icons / 1.2} />
          )}
        </FlexContainer>
        {action && (
          <FlexContainer variant="row" newStyle={styles.actionContainer}>
            {businessVerified && (
              <TouchableOpacity onPress={() => dispatch(openUploadModal())}>
                <AddCircleHalfDotIcon
                  width={SIZES.icons}
                  height={SIZES.icons}
                  color={color}
                />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={onPressMenu}>
              <Menu01Icon
                width={SIZES.icons}
                height={SIZES.icons}
                color={color}
              />
            </TouchableOpacity>
          </FlexContainer>
        )}
        {/* {Arrowback && (
          <FlexContainer variant="row" newStyle={styles.arrowBackContainer}>
            <TouchableOpacity>
              <Notification03IconStroke
                width={SIZES.icons}
                height={SIZES.icons}
                color={color}
              />
            </TouchableOpacity>
          </FlexContainer>
        )} */}
      </FlexContainer>
    </>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    width: SIZES.BtnWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: SIZES.BtnHeight,
    marginHorizontal: SIZES.margin / 2,
    backgroundColor: 'transparent',
  },
  innerFlexContainer: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  arrowBackNavigation: {
    width: SIZES.width / 10,
  },
  username: {
    maxWidth: SIZES.BtnWidth / 1.2,
    ...FONTS.heading18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionContainer: {
    gap: SIZES.gapMedium,
    backgroundColor: 'transparent',
  },
  arrowBackContainer: {
    gap: SIZES.gapMedium,
    alignItems: 'center',
  },
  SizeIcons: {
    width: SIZES.icons,
  },
});

export default memo(Heading);
