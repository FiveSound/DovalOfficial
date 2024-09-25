import React from 'react'
import { ScrollView, View } from 'react-native'
import { FlexContainer } from '../../../../../components/custom'
import Bio from './Bio'
import OpeningHours from './OpeningHours'
import Location from './Location'
import Reviews from './Reviews'
import { SIZES } from '../../../../../constants/theme'

type Props = {}

const Overview = (props: any) => {
const { data } = props;
const reviews = [];

  return (
    <ScrollView 
    contentContainerStyle={{
      paddingBottom: SIZES.height 
    }}> 
        <Bio bio={data?.bio}/>
        <View style={{marginBottom: SIZES.gapLarge}}/>
        <OpeningHours  openingDays={data?.opening_days || []} />
        <View style={{marginBottom: SIZES.gapLarge}}/>
        <Location address={data?.details} latitude={data?.latitude} longitude={data?.longitude} />
        <View style={{marginBottom: SIZES.gapLarge}}/>
        {/* <Reviews reviews={reviews} /> */}
    </ScrollView>
  )
}

export default Overview