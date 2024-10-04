import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { uploadMedia } from '../redux/slides/uploadSlice';

const useUploadMedia = () => {
  const dispatch = useDispatch();
  const {
    isLoading,
    progress,
    mediaURLs,
    thumbnailURLs,
    photos,
    videos,
    mediaType,
    error,
  } = useSelector((state: RootState) => state.upload);

  const handleUploadMedia = (pickedMedia: Media[]) => {
    dispatch(uploadMedia(pickedMedia));
  };

  return {
    uploadMedia: handleUploadMedia,
    isLoading,
    progress,
    mediaURLs,
    thumbnailURLs,
    photos,
    videos,
    mediaType,
    error,
  };
};

export default useUploadMedia;