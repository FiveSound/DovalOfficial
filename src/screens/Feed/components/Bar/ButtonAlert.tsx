import {
  Notification03IconStroke,
  Search01Icon,
} from '../../../../constants/IconsPro';
import { COLORS, SIZES } from '../../../../constants/theme';
import {
  TouchableOpacity,
  useNavigation,
} from '../../../../components/native';
import { useTheme } from '../../../../hooks';

type Props = {};

const ButtonAlert = (props: Props) => {
  const navigation = useNavigation();
  const { Title } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Discover');
      }}
    >
      <Notification03IconStroke
        width={SIZES.icons * 1.1}
        height={SIZES.icons * 1.1}
        color={Title}
      />
    </TouchableOpacity>
  );
};

export default ButtonAlert;
