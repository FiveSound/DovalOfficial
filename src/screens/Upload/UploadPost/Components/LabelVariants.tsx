import { StyleSheet } from 'react-native';
import {
  FlexContainer,
  IsLoading,
  Perks,
  Typography,
} from '../../../../components/custom';
import { TouchableOpacity } from '../../../../components/native';
import { COLORS, SIZES } from '../../../../constants/theme';

type props = {
  data: any;
  onPress: (id: number) => void;
  isLoading: boolean;
  AppendIcons?: React.ReactNode;
  subLabel?: string;
};
export const LabelVariants = (props: props) => {
  const { data, onPress, isLoading, AppendIcons, subLabel} = props;


  if (isLoading) return <IsLoading />;

  if (!data || !data.list) {
    return null;
  }

  if (data) {
    return data.list.map((row: any) => (
      <TouchableOpacity
        key={row.id}
        onPress={() => onPress(row.id)}
        style={styles.item}
      >
        {AppendIcons}
        <FlexContainer newStyle={styles.flexContainer}>
          <Typography variant="subtitle">{row.name}</Typography>
          <Typography variant="SubDescription">{row.description}</Typography>
        </FlexContainer>
        <Typography variant="SubDescription">{subLabel}</Typography>
        {row.selected && (
          <Perks status="success" label="Seleccionado" Reverse={false} />
        )}
      </TouchableOpacity>
    ));
  }
};

const styles = StyleSheet.create({
  item: {
    padding: SIZES.gapLarge,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flexContainer: {
    width: SIZES.width / 1.5,
  },
});
