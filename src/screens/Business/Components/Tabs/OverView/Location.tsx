import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useTheme } from '../../../../../hooks';
import { Box, Buttons, FlexContainer, IsLoading, LabelContainer, Typography } from '../../../../../components/custom';
import { responsiveFontSize, SIZES } from '../../../../../constants/theme';
import { Location09Icon } from '../../../../../constants/IconsPro';


type Props = {
  address: string;
  latitude: number;
  longitude: number;
}

const Location = ({ address, latitude, longitude }: Props) => {
  const { Description } = useTheme();
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      }, 1000); 
    }
  }, [latitude, longitude]);

  useEffect(() => {
    const checkMapLoaded = () => {
      if (!mapLoaded) {
        setMapLoaded(true);
      }
    };

    const timer = setTimeout(checkMapLoaded, 2000);

    return () => clearTimeout(timer); 
  }, [mapLoaded]);


  return (
    <Box title='Location'>
      <FlexContainer newStyle={{ alignItems: 'center' }}>
        {!mapLoaded && <IsLoading  />}
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.003,
            longitudeDelta: 0.003,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          onRegionChangeComplete={() => setMapLoaded(true)}
        >
          <Marker coordinate={{ latitude, longitude }} />
        </MapView>
        {mapLoaded && (
          <Buttons 
            label='See on the Map'
            onPress={() => {
              const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
              Linking.canOpenURL(url).then(supported => {
                if (supported) {
                  Linking.openURL(url);
                } else {
                  console.log("Don't know how to open URI: " + url);
                }
              });
            }}
          />
        )}
      </FlexContainer>
    </Box>
  );
};

const styles = StyleSheet.create({
  map: {
    height: responsiveFontSize(140),
    marginBottom: responsiveFontSize(20),
    borderRadius: SIZES.margin,
    width: SIZES.BtnWidth
  }
});

export default Location;