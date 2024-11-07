import React, { useCallback } from 'react'
import { FlatList, TouchableOpacity } from 'react-native'
import { ArrowRight02Icon } from '../../constants/IconsPro'
import useTheme from '../../hooks/useTheme'
import { COLORS, responsiveFontSize, SIZES } from '../../constants/theme'
import { FlexContainer, Typography } from '../../components/custom'

type Props = {
  RecentsChats: { label: string, id: number, description: string | null }[];
  titleLabels: string;
  onPress: (item: { label: string, id: number, description: string }) => void;
}

interface items {
  id: number,
  label: string;
  description: string | null;
}

const SectionsPrompt = (props: Props) => {
  const { color, Bg, bgInput, borderInput } = useTheme()
  const { RecentsChats, titleLabels, onPress } = props

  const renderItem = useCallback(({ item }: { item: items }) => {
    return (
      <TouchableOpacity
        onPress={() => onPress(item)}
        key={item.id}
        style={{
          marginHorizontal: SIZES.gapSmall,
        }}>
        <FlexContainer
          newStyle={{
            padding: SIZES.margin / 2,
            backgroundColor: 'transparent',
            borderWidth: responsiveFontSize(1),
            borderColor: item.id === 0 ? COLORS.primary : borderInput,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: SIZES.margin,
            height: 'auto'
          }}>
          <Typography variant='H4title'
            newStyle={{
              maxWidth: SIZES.width / 2,
            }}>{item.label}</Typography>
          {item.description !== null &&
            <Typography variant='SubDescription'
              newStyle={{
                maxWidth: SIZES.width / 2,
                height: 'auto'
              }}>{item.description}</Typography>}
        </FlexContainer>

      </TouchableOpacity>
    )
  }, [RecentsChats])

  return (
    <FlexContainer
      newStyle={{
        backgroundColor: 'transparent',
        gap: SIZES.gapMedium
      }}>
      <FlexContainer
        variant='row'
        newStyle={{
          alignItems: 'center',
          justifyContent: 'space-between',
          width: SIZES.BtnWidth,
          backgroundColor: 'transparent'
        }}>
        <Typography
          variant='subtitle'
          newStyle={{
            maxWidth: SIZES.width / 1.2,
          }}>
          {titleLabels}
        </Typography>
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.primary,
            padding: SIZES.radius2 / 2,
            borderRadius: SIZES.margin
          }}>
          <ArrowRight02Icon
            width={SIZES.icons}
            height={SIZES.icons}
            color={Bg}
          />
        </TouchableOpacity>
      </FlexContainer>
      <FlatList
        data={RecentsChats}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        snapToInterval={SIZES.width / 2}
        decelerationRate='fast'
        horizontal={true}
        renderItem={renderItem}
        initialNumToRender={2}
        maxToRenderPerBatch={2}
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
      />
    </FlexContainer>
  )
}

export default SectionsPrompt