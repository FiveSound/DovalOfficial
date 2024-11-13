import React, { ReactNode } from 'react'
import {  StyleSheet, View } from 'react-native';
import FlexContainer from '../FlexContainer';
import { COLORS, responsiveFontSize } from '../../../constants/theme';

type Props = {
    children: ReactNode;
}

const CustomMarker = ({ children }: Props) => {

    return (
      <View style={styles.markerContainer}>
      <View style={styles.marker}>
     <FlexContainer newStyle={styles.innerMarkerIcons}>
        {children}
     </FlexContainer>
        </View>
        <View style={styles.pointer} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    markerContainer: {
      alignItems: 'center',
    },
    marker: {
      width: responsiveFontSize(48),
      height: responsiveFontSize(48),
      borderRadius: responsiveFontSize(24),
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(255, 85, 0, 0.4)',
      position: 'relative',
      zIndex: 1,
    },
    pointer: {
      width: 0,
      height: 0,
      borderLeftWidth: responsiveFontSize(8),
      borderRightWidth: responsiveFontSize(8),
      borderTopWidth: responsiveFontSize(12),
      borderLeftColor: 'transparent',
      borderRightColor: 'transparent',
      borderTopColor: 'rgba(255, 85, 0, 0.4)',
      marginTop: -1,
    },
    innerMarker: {
      width: responsiveFontSize(32),
      height: responsiveFontSize(32),
      borderRadius: responsiveFontSize(16),
      backgroundColor: COLORS.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconContainer: {
      position: 'absolute',
      bottom: -responsiveFontSize(4),
      right: -responsiveFontSize(4),
      backgroundColor: COLORS.primary,
      borderRadius: responsiveFontSize(8),
      padding: responsiveFontSize(2),
    },
    innerMarkerIcons: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.primary,
      borderRadius: responsiveFontSize(16),
      padding: responsiveFontSize(4),
    },
  });

export default CustomMarker