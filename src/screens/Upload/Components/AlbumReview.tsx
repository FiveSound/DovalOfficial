import React from 'react'
import { TouchableOpacity , Image} from '../../../components/native';
import { SIZES } from '../../../constants/theme';
import { FlexContainer, Typography } from '../../../components/custom';

type Props = {
    albumName: string
    albumCount: string;
    onPress: () => void;
    uriAsset: string
}

const AlbumReview = (props: Props) => {
    const { albumName, albumCount, onPress , uriAsset} = props
    return (
            <>
            <TouchableOpacity
                onPress={onPress}
                style={{
                    width: SIZES.BtnWidth,
                    margin: SIZES.gapSmall,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                }}>
                <Image 
                  priority='high'
                  contentFit='cover'
                  placeholderSource={uriAsset}
                  style={{
                    width: SIZES.width / 6,
                    height: SIZES.height / 14,
                    marginHorizontal: SIZES.gapSmall
                  }}
                />
                <FlexContainer newStyle={{ backgroundColor: 'transparent' }}>
                    <Typography 
                    numberOfLines={1}
                    newStyle={{
                        maxWidth: SIZES.BtnWidth / 1.2
                    }}
                    variant='subtitle'>{albumName}</Typography>
                    <Typography variant='SubDescription'>{albumCount}</Typography>
                </FlexContainer>
            </TouchableOpacity>
            </>
    )
}

export default AlbumReview