import { memo, useState } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  View,
  FlatList,
  Image,
  Text,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { getAnalitycsService } from '../../../services/business';
import FormBanner from '../components/FormBanner';
import { useAuth } from '../../../context/AuthContext';
import { Container, LoadingScreen, PaginationHeader, Typography } from '../../../components/custom';
import { iconsNative } from '../../../constants';
import { Picker } from '@react-native-picker/picker';
import { useTheme } from '../../../hooks';
import { COLORS, responsiveFontSize, SIZES } from '../../../constants/theme';

type Props = {
  selected?: boolean;
  icon: any;
  title: string;
  amount: string;
  color: string;
};

const Box = memo(({ selected, icon, title, amount, color }: Props) => {
const { backgroundMaingrey , Title} = useTheme();
  return (
    <View style={[styles.item, {backgroundColor: backgroundMaingrey}]}>
    <View style={[styles.icon, { backgroundColor: color }]}>
      <Image source={icon} style={{ width: SIZES.icons, height: SIZES.icons }} resizeMode='contain' />
    </View>
    <Typography
      variant='title'
      newStyle={[styles.subtitle, { color: selected ? COLORS.primary : Title }]}
    >
      {title}
      </Typography>
    <Typography variant='title'>{amount}</Typography>
  </View>
  );
});

const Analitycs = () => {
  const { user } = useAuth();
  const [selectedLanguage, setSelectedLanguage] = useState('');

  const { data, isLoading, isFetching, isError, refetch } = useQuery({
    queryKey: ['analitycs-screen', user?.userID],
    queryFn: getAnalitycsService,
  });

  if (isLoading || isFetching) return <LoadingScreen label='Loading analitycs...' />;

  if (isError)
    return <Text style={styles.errorText}>Error al cargar los datos.</Text>;

  const dataBoxes = [
    {
      icon: iconsNative.restaurants,
      title: 'Balance',
      amount: data.total_sales,
      color: '#FDEFD9',
      selected: false,
    },
    {
      icon: iconsNative.restaurants,
      title: 'En progreso',
      amount: data.total_sales_pending,
      color: '#FCE4DF',
      selected: true,
    },
    {
      icon: iconsNative.restaurants,
      title: 'Clientes totales',
      amount: data.total_clients,
      color: '#DBECFD',
      selected: false,
    },
    {
      icon: iconsNative.restaurants,
      title: 'Ordenes totales',
      amount: data.total_orders,
      color: '#CEFBE7',
      selected: false,
    },
  ];

  return (
    <Container style={styles.container}>
      {/* <FormBanner /> */}
      {/* <PaginationHeader 
      refetch={refetch}
      placeholder='Search analitycs...'
       /> */}

      <FlatList
        data={dataBoxes}
        renderItem={({ item }) => <Box {...item} />}
        keyExtractor={item => item.title}
        numColumns={2}
        // ListHeaderComponent={
        //   <>
        //     <Text style={styles.mainTitle}>Visión general</Text>
        //     {/* <Text style={styles.mainSubtitle}>07 de Octubre / 12 de Octubre</Text> */}
        //     <Picker
        //       selectedValue={selectedLanguage}
        //       onValueChange={(itemValue, itemIndex) => setSelectedLanguage(itemValue)}
        //       style={{
        //         marginLeft: 10,
        //         marginBottom: 10,
        //         width: 200,
        //         backgroundColor: "#444",
        //         color: "#FFF",
        //       }}
        //       dropdownIconColor="#FFF"
        //     >
        //       <Picker.Item label="20 Oct  /  27 Oct" value="java" />
        //     </Picker>
        //   </>
        // }
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {

    paddingHorizontal: 0,
  },
  mainTitle: {
    marginBottom: 5,
    marginHorizontal: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FAFAFA',
  },
  mainSubtitle: {
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#FFF',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    marginLeft: SIZES.gapSmall,
    marginBottom: SIZES.gapSmall,
    width: '50%',
    paddingVertical: SIZES.gapLarge,
    paddingHorizontal: SIZES.gapLarge,
  },
  selected: {
    backgroundColor: '#432007',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  icon: {
    marginBottom: SIZES.gapSmall,
    width: responsiveFontSize(60),
    height: responsiveFontSize(60),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: responsiveFontSize(10),
  },
});

export default Analitycs;
