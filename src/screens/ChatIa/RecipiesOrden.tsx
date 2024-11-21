import React from 'react'
import { useAuth } from '../../context/AuthContext';
import useTheme from '../../hooks/useTheme';
import { TouchableOpacity } from 'react-native';
import { SIZES, responsiveFontSize } from '../../constants/theme';
import { scale } from 'react-native-size-matters';
// import CoverCart from '../CarritoItems/CoverCart';
// import Title from '../CarritoItems/Title';
// import AddTouggle from '../CarritoItems/AddTouggle';
import { useNavigation } from '@react-navigation/native';

type Props = {
    item: {
        cover: string
        name: string
        price: string
        qty: number
        id: string
        business_name: string
    }
}

const RecipiesOrden = ({item}: Props) => {
    const { borderInput, border, bgInput} = useTheme()
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            style={{
                height: responsiveFontSize(scale(38)),
                justifyContent: "space-between",
                alignItems: "center",
                flexDirection: "row",
                borderRadius: scale(10),
                padding: SIZES.gapMedium / 2,
                backgroundColor: bgInput,
                width: SIZES.BtnWidth,
                borderWidth: SIZES.borderWidth,
                borderColor: borderInput,
                marginVertical: SIZES.gapSmall
            }}
        >
            {/* <CoverCart
                source={item.cover} 
                StyleCover={{
                    width: responsiveFontSize(scale(28)),
                    height: responsiveFontSize(scale(28))
                }}
                />
            <Title
                name={item.name}
                price={item.price}
            />
            <AddTouggle
                qty={item.qty}
                onPressRemoved={() => {
                    removeProduct(item.id);
                }}
                onPressAdd={() => {
                    addProduct({
                        id: item.id,
                        name: item.name,
                        cover: item.cover,
                        business_name: item.business_name,
                        qty: 1,
                        price: 100,
                    });
                    navigation.navigate('Carrito');
                }}
            /> */}
        </TouchableOpacity>
    );
}

export default RecipiesOrden