import { StyleSheet, View } from 'react-native';
import { RestauranteSearchOrderType } from '../../../types/Restaurant.type';
import OrderStatus from './OrderStatus';
import { ArrowRight, FlexContainer, LineDivider, Typography } from '../../../components/custom';
import { TouchableOpacity, useNavigation } from '../../../components/native';
import { ArrowRight01Icon } from '../../../constants/IconsPro';
import { useTheme } from '../../../hooks';

const ResumeOrder = (props: RestauranteSearchOrderType) => {
  const navigation = useNavigation();

  return (
    <>
     <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Dashboard/Business/OrderID', { orderID: props.orderID })}>
       <FlexContainer>
       <FlexContainer>
         <Typography variant='title'>
           ID: #{props.orderID}
         </Typography>
         <Typography variant='H4title'>
           {props.creation_time}
         </Typography>
         <Typography variant='H4title'>
           Client: {props.client}
         </Typography>
       </FlexContainer>
       <OrderStatus status={props.status} />
       </FlexContainer>
       <ArrowRight onPress={() => navigation.navigate('Dashboard/Business/OrderID', { orderID: props.orderID })} />
     </TouchableOpacity>
     <LineDivider variant='secondary' />
   </>
   );
}

export default ResumeOrder;

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cover: {
    width: 40,
    height: 40,
    objectFit: 'cover',
    borderRadius: 10,
  },
  text: {
    color: '#FFF',
  },
});
