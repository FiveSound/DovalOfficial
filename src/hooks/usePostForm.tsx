import { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { responsiveFontSize, SIZES } from '../constants/theme';
import useUploadMedia from './useUploadMedia';

export const usePostForm = Pickedmedia => {
  const { uploadMedia, isLoading, photos, videos, thumbnailURLs, mediaType } =
    useUploadMedia();
  const [inputHeight, setInputHeight] = useState(
    responsiveFontSize(SIZES.InputsHeight),
  );
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [FormStatus, setFormStatus] = useState({ hiddenTitle: true });

  const { setValue, handleSubmit, watch, control, reset, formState } = useForm({
    defaultValues: {
      songID: '',
      uploading: false,
      title: '',
      description: '',
      videos: videos,
      recipeID: null,
      showCategories: false,
      categories: [],
      thumbnail: '',
      recipeName: '',
      photos: photos,
      mediaType: mediaType,
      topics: selectedTopics,
      tags: '',
      hashtag: '',
    },
  });

  useEffect(() => {
    if (Pickedmedia && Pickedmedia.length > 0) {
      uploadMedia(Pickedmedia).catch(error => {
        console.error('Error uploading media:', error);
      });
    }
  }, [Pickedmedia, uploadMedia]);

  return {
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState,
    isLoading,
    inputHeight,
    setInputHeight,
    selectedTopics,
    setSelectedTopics,
    FormStatus,
    setFormStatus,
  };
};
