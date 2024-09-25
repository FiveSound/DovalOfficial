import React, { lazy, Suspense, useCallback, useState } from 'react'
import { FlatList, RefreshControl, ScrollView } from 'react-native'
import { useRefreshData, useTheme } from '../../../../../hooks'
import { CLOUDFRONT } from '../../../../../services'
import { Buttons, FlexContainer, IsLoading, ScreenEmpty, Search } from '../../../../../components/custom'
import { TypeProducts } from '../../../../../types/products/Product.types'
import { COLORS, FONTS, SIZES } from '../../../../../constants/theme'
import { Ilustrations } from '../../../../../constants'

type Props = {}

const Main = (props: any) => {
const [ select, setSelect ] = useState(false)
const [searchText, setSearchText] = useState('')
const { borderInput } = useTheme()
const { data, isLoading, refetch} = props;
const { isRefreshing, onRefresh } = useRefreshData([refetch]);

const filteredRecipies = data ? data.filter(recipe => 
        recipe.name.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

    const RenderItem = useCallback(({ item }: { item: TypeProducts }) => {
        const cover = `${CLOUDFRONT}${item.cover}`
     
        return (
            <Suspense fallback={<IsLoading />}>
                {/* <LazyCard
                    name={item.name || ''}
                    price={item.price || ''}
                    cover={cover}
                    description={item.description || ''}
                    recipeID={item.id}
                /> */}
            </Suspense>
        )
    },[filteredRecipies])
    
    if (isLoading) {
        return <IsLoading label='Loading...'/>
    }

    if (filteredRecipies.length === 0) {
        return (
       <ScrollView 
       refreshControl={
        <RefreshControl 
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        />
       }>
          <ScreenEmpty 
         labelPart1='You dont have nearby stocks available to you.!'
         labelStylePart1={{
            textAlign: 'center'
         }}
         subLabel='We are working to arrive in your area soon'
         source={Ilustrations.Hello}
         ImgWidth={SIZES.width}
         ImgHeigth={SIZES.height / 2}
         ShowButton={false}
         />
       </ScrollView>
        )
     }
     
    return (
        <FlexContainer newStyle={{height: SIZES.height, flex: 1}}>
            <Buttons 
            label='Explorar more recipies'
            labelStyle={{
                ...FONTS.h3
            }}
            // lineStyle={{
            //     marginBottom: SIZES.gapSmall
            // }}
            onPress={() => console.log('Explorar more recipies')}
            />
            <Search
            placeholder='Search Recipies'
            onFocus={() => setSelect(true)}
            onBlur={() => setSelect(false)}
            onChange={setSearchText}
            value={searchText}
            containerStyle={{
             borderColor: select ? COLORS.primary : borderInput,
             width: SIZES.width / 1.06,
             height: SIZES.InputsHeight / 1.06
            }}/>

            <FlatList
            data={filteredRecipies}
            keyExtractor={(item) => `${item.id}`}
            renderItem={RenderItem} 
            initialNumToRender={3}
            maxToRenderPerBatch={3}
            refreshing={isRefreshing} 
            onRefresh={onRefresh}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingBottom: SIZES.height / 6
            }}
            />
        </FlexContainer>
    )
}

export default Main