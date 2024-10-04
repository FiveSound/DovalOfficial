import React, { useState } from 'react'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { GalleryControlsReview, VideosPreviews, BarPreview } from './Components';
import { GalleryLayout } from '../../Components';

type Props = {}

interface MediaItem {
  uri: string;
  songID?: string;
}
interface RouteParams {
  pickedMedia: MediaItem[];
}

const UploadReview = (props: Props) => {
  const { params } = useRoute<RouteProp<{ params: RouteParams }>>();
  let Pickedmedia = params.pickedMedia;
  const [isPlaying, setIsPlaying] = useState(false);
  const [music, setMusic] = useState('')
  const [selectedSongId, setSelectedSongId] = useState<string | null>(null);

  Pickedmedia = Pickedmedia.map(mediaItem => ({
    ...mediaItem,
    songID: selectedSongId
  }));

  const baseTimeInSeconds = 40;
  const additionalTimePerItem = 5;
  const totalTimeInSeconds = baseTimeInSeconds + (Pickedmedia.length * additionalTimePerItem);

  const durationPerItem = Pickedmedia.length > 0 ? totalTimeInSeconds / Pickedmedia.length : 0;

  const formatDuration = (seconds: any) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formattedTotalTime = formatDuration(totalTimeInSeconds);
  const formattedDurationPerItem = formatDuration(durationPerItem);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSelectedSongId = (id: string, sourceSong: string) => {
    setSelectedSongId(id);
    setMusic(sourceSong)
    Pickedmedia = Pickedmedia.map(mediaItem => ({
      ...mediaItem,
      songID: selectedSongId
    }));
  };


  return (
    <GalleryLayout>
      <GalleryControlsReview
        label='Ir a subir'
        pickedMedia={Pickedmedia}
      />
      <VideosPreviews
        pickedMedia={Pickedmedia}
        ShowDot={false}
        duration={formattedTotalTime}
        time='0'
        onPressPlay={handlePlayPause}
        isPlay={isPlaying}
      />
      <BarPreview
        IDSong={handleSelectedSongId}
        sourceSong={music}
        pickedMedia={Pickedmedia}
        totalTime={formattedTotalTime}
        isPlaying={isPlaying}
        handlePlayPause={handlePlayPause}
      />
    </GalleryLayout>
  )
}

export default UploadReview