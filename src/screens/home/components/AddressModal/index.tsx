import React from 'react'
import { StyleSheet } from 'react-native'
import { ButtonIcons, FlexContainer, Icons, Typography } from '../../../../components/custom'
import { PlusSignIcon } from '../../../../constants/IconsPro'
import { responsiveFontSize, SIZES } from '../../../../constants/theme'
import { useAPI } from '../../../../hooks'
import { getMyLocations } from '../../../../services/orders'
import Main from './Main'

type Props = {}

const AddressModal = (props: Props) => {
    const { data, isLoading: Loading , isFetching, isRefetching } = useAPI({
        queryKey: ["get-My-Locations"],
        queryFn: getMyLocations,
      });
    
    return (
        <Main 
        data={data}
        Loading={Loading}
        isFetching={isFetching}
        isRefetching={isRefetching}
        />
    )
}

export default AddressModal