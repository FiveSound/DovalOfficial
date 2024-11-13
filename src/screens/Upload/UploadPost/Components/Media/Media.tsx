import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useFormContext } from 'react-hook-form';
import {
  Buttons,
  Container,
  FlexContainer,
  IsLoading,
  LineDivider,
} from '../../../../../components/custom';
import useUploadMedia from '../../../../../hooks/useUploadMedia';
import {
  COLORS,
  responsiveFontSize,
  SIZES,
} from '../../../../../constants/theme';
import { Covers } from '../Utils';
import { useNavigation } from '../../../../../components/native';
import { useDispatch } from 'react-redux';
import { resetProgress } from '../../../../../redux/slides/uploadSlice';
import i18next from '../../../../../Translate';
import { saveDraftService } from '../../../../../services/posts';

const Media = () => {
  const dispatch = useDispatch();
  const { setValue, watch } = useFormContext();
  const [isSubmittingLocal, setIsSubmittingLocal] = useState(false);
  const navigation = useNavigation();

  const { uploadMedia, isLoading: Loading, mediaURLs } = useUploadMedia();

  const keys = watch('key') || [];

  const pickImage = async () => {
    setIsSubmittingLocal(true);
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: false,
      });

      if (!result.canceled && result.assets.length > 0) {
        const files = result.assets;

        const media = files.map(file => {
          if (!file.fileName) {
            const uriParts = file.uri.split('/');
            file.fileName = uriParts[uriParts.length - 1];
          }
          const type = file.type === 'video' ? 'video' : 'photo';

          return {
            uri: file.uri,
            type: type,
          };
        });

        uploadMedia(media);
      }
    } catch (error) {
      console.error('Upload failed', error);
    } finally {
      setIsSubmittingLocal(false);
    }
  };

  useEffect(() => {
    if (mediaURLs.length > 0) {
      const updatedKeys = [...keys, ...mediaURLs];
      saveDraftService(updatedKeys)
        .then(response => {
          if (response.success) {
            setValue('id', response.id, { shouldDirty: true, shouldValidate: true });
          }
          dispatch(resetProgress());
        })
        .catch(error => {
          console.error('Add Draft Failed', error);
          // Reset progress even if adding draft fails
          dispatch(resetProgress());
        });
    }
  }, [mediaURLs]);

  

  return (
    <Container
      showBack={true}
      showHeader={true}
      label={i18next.t('Upload Media')}
      style={styles.container}
    >
      <LineDivider variant="primary" lineStyle={styles.lineStyle} />
      <FlexContainer newStyle={styles.actions}>
        <Buttons
          label={i18next.t('Continue')}
          onPress={() => navigation.navigate('PostDetails')}
          disabled={mediaURLs.length === 0}
          variant={mediaURLs.length === 0 ? 'disabled' : 'primary'}
          variantLabel={mediaURLs.length === 0 ? 'disabled' : 'secondary'}
          containerButtons={styles.containerButtonss}
        />
      </FlexContainer>
      <FlexContainer>
        <Covers data={mediaURLs || []} ShowDivider={false} />
        <FlexContainer newStyle={styles.progressContainer}>
          {Loading && <IsLoading />}
          {mediaURLs.length === 0 && (
            <Buttons
              label={i18next.t('Upload Media')}
              onPress={pickImage}
              disabled={isSubmittingLocal || Loading}
              variant={isSubmittingLocal || Loading ? 'disabled' : 'primary'}
              labelStyle={styles.labelStyle}
              color={isSubmittingLocal || Loading ? 'primary' : 'dark'}
            />
          )}

          <Buttons
            label={i18next.t('Drafts')}
            onPress={() => navigation.navigate('PostDrafts')}
            containerButtons={styles.containerButtonss}
            variant="transparent"
          />
        </FlexContainer>
      </FlexContainer>
    </Container>
  );
};

export default Media;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  close: {
    position: 'absolute',
    top: 10,
    left: 10,
  },
  closeText: {
    color: '#FFF',
  },
  actions: {
    flexDirection: 'row',
    gap: responsiveFontSize(20),
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: SIZES.gapLarge,
    marginBottom: SIZES.gapLarge,
  },
  containerButtons: {
    width: SIZES.width / 3,
    backgroundColor: 'transparent',
  },
  labelStyle: {
    color: COLORS.primary,
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: SIZES.gapLarge,
  },
  lineStyle: {
    marginBottom: SIZES.gapLarge,
  },
  containerButtonss: {
    width: '30%',
  },
  icon: {
    width: SIZES.icons,
    height: SIZES.icons,
  },
  stylesMedia: {
    width: responsiveFontSize(140),
    height: responsiveFontSize(160),
  },
  stylesMain: {
    width: SIZES.width / 3,
    height: SIZES.height / 6,
    backgroundColor: 'transparent',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  persContainer: {
    flexDirection: 'row',
    gap: SIZES.gapLarge,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: SIZES.gapLarge,
    paddingHorizontal: SIZES.gapLarge,
  },
});
