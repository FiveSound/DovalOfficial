import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
  ImageStyle,
} from 'react-native';
import { COLORS } from '../../../constants/theme';

interface RateProps {
  rating: number;
  iconStyle?: ImageStyle;
  activeColor?: string;
  inactiveColor?: string;
  onChange: (rating: number) => void;
  containerStyle?: ViewStyle;
}

const Rate: React.FC<RateProps> = ({
  rating,
  iconStyle,
  activeColor = COLORS.primary,
  inactiveColor = COLORS.light20,
  onChange,
  containerStyle,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 200,
        ...containerStyle,
      }}
    >
      {[1, 2, 3, 4, 5].map(index => (
        <TouchableOpacity key={index} onPress={() => onChange(index)}>
          {/* <Image
                        source={icons.star}
                        style={{
                            tintColor: rating >= index ? activeColor : inactiveColor,
                            ...styles.rateIcon,
                            ...iconStyle,
                        }}
                    /> */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  rateIcon: {
    height: 30,
    width: 30,
  },
});

export default Rate;
