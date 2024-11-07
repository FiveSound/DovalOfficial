import { StyleSheet } from 'react-native';
import { FlexContainer, InfoCard } from '../../../../components/custom';
import {
  Pressable,
  Text,
  TouchableOpacity,
} from '../../../../components/native';
import { useTheme } from '../../../../hooks';
import { COLORS, SIZES } from '../../../../constants/theme';
import { useDispatch } from 'react-redux';
import { openModalPin } from '../../../../redux/slides/modalSlice';
import { ArrowUp, GridViewIcon, Location09Icon } from '../../../../constants/IconsPro';
import i18next from '../../../../Translate';

type Props = {
  data: {
    details: string;
    verification_code: number;
  };
};
const Footer = (props: Props) => {
  const { data } = props;

  const { BackgroundMain, Title } = useTheme();
  const dispatch = useDispatch();
  const openModal = () => {
    if (data) {
      dispatch(openModalPin({ data }));
    }
  };

  return (
    <Pressable
      onPress={openModal}
      style={[
        styles.container,
        {
          backgroundColor: BackgroundMain,
        },
      ]}
    >
     {
      data.verification_code !== null && (
        <InfoCard
        icon={
          <GridViewIcon
            color={Title}
            width={SIZES.icons * 1.2}
            height={SIZES.icons * 1.2}
          />
        }
        title={`Confirm order PIN: ${data.verification_code}`}
        description={i18next.t('Confirm your order to avoid fraud')}
        showArrow={true}
        showLineDivider={true}
      />
      )
     }
            
      <InfoCard
        icon={
          <Location09Icon
            width={SIZES.icons * 1.2}
            height={SIZES.icons * 1.2}
            color={Title}
          />
        }
        title={i18next.t('You receive it in')}
        description={data.details}
        orientation="LEGHT"
        showArrow={true}
        onPress={openModal}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.gapLarge,
    height: SIZES.height / 8,
    position: 'absolute',
    bottom: 0,
    width: SIZES.width,
    borderTopRightRadius: SIZES.gapLarge,
    borderTopLeftRadius: SIZES.gapLarge,
  },
});

export default Footer;
