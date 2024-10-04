import { Dispatch, SetStateAction } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Path, Svg } from "react-native-svg";
import { responsiveFontSize } from "../../../constants/theme";
import { useTheme } from "../../../hooks";

type PropsStart = {
  filled: boolean;
  color: string
};

const Star = ({ filled, color }: PropsStart) => (
  <Svg
    height={40}
    width={40}
    viewBox="0 0 24 24"
    fill={filled ? "#FF5500" : "none"}
    stroke={filled ? "#FF5500" : color}
    strokeWidth={1}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <Path d="M13.7276 3.44418L15.4874 6.99288C15.7274 7.48687 16.3673 7.9607 16.9073 8.05143L20.0969 8.58575C22.1367 8.92853 22.6167 10.4206 21.1468 11.8925L18.6671 14.3927C18.2471 14.8161 18.0172 15.6327 18.1471 16.2175L18.8571 19.3125C19.417 21.7623 18.1271 22.71 15.9774 21.4296L12.9877 19.6452C12.4478 19.3226 11.5579 19.3226 11.0079 19.6452L8.01827 21.4296C5.8785 22.71 4.57865 21.7522 5.13859 19.3125L5.84851 16.2175C5.97849 15.6327 5.74852 14.8161 5.32856 14.3927L2.84884 11.8925C1.389 10.4206 1.85895 8.92853 3.89872 8.58575L7.08837 8.05143C7.61831 7.9607 8.25824 7.48687 8.49821 6.99288L10.258 3.44418C11.2179 1.51861 12.7777 1.51861 13.7276 3.44418Z" />
  </Svg>
);

type Props = {
  rating: number;
  setRating: Dispatch<SetStateAction<number>>;
  disabled?: boolean;
};

const Rating = ({ rating, setRating, disabled }: Props) => {
const { Title } = useTheme()
  return (
    <View style={styles.appContainer}>
      <View style={styles.container}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setRating(star)}
            activeOpacity={disabled ? 1 : 0.7}
            disabled={disabled}
          >
            <Star filled={star <= rating} color={Title}/>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Rating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  appContainer: {
    marginTop: responsiveFontSize(10),
    marginBottom: responsiveFontSize(10),
  },
});