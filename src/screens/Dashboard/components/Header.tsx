import { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CLOUDFRONT } from '../../../services';
import { Menu01Icon } from '../../../constants/IconsPro';
import {
  SafeAreaView,
  TouchableOpacity,
  View,
  Image,
  Text,
  Platform,
  Switch,
} from '../../../components/native';
import { COLORS, SIZES } from '../../../constants/theme';
import { useTheme } from '../../../hooks';
import { Avatars, FlexContainer, LineDivider, Typography } from '../../../components/custom';

type Props = {
  title: string;
  cover: string;
  openDrawer: () => void;
};

const HeaderDashboard = memo(
  (props: Props) => {
    const { Title } = useTheme();
    const BusinessCover =  `${CLOUDFRONT}${props.cover}`
    const [isSwitchOn, setIsSwitchOn] = useState(true);
const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.header}>
          <FlexContainer variant='row' newStyle={styles.icons}>
          <TouchableOpacity onPress={props.openDrawer}>
              <Menu01Icon
                width={SIZES.icons}
                height={SIZES.icons}
                color={Title}
              />
            </TouchableOpacity>
            {props.cover && (
              <Avatars size="small" source={`${CLOUDFRONT}${props.cover}`} />
            )}
          </FlexContainer>
            <FlexContainer variant='row' newStyle={styles.switch}>
              <Typography variant="subtitle">{isSwitchOn ? 'Abierto' : 'Cerrado'}</Typography>
              <Switch 
              value={isSwitchOn} 
              onValueChange={onToggleSwitch} 
              trackColor={{false: COLORS.error, true: COLORS.success}}
              ios_backgroundColor={isSwitchOn ? COLORS.success : COLORS.error}
              />
            </FlexContainer>
          </View>
          <LineDivider variant="secondary" lineStyle={styles.divider} />
        </SafeAreaView>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.title === nextProps.title && prevProps.cover === nextProps.cover,
);

export default HeaderDashboard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SIZES.gapLarge,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapLarge,
    paddingHorizontal: Platform.OS === 'android' ? 0 : SIZES.gapLarge,
    justifyContent: 'space-between',
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.gapLarge,
  },
  divider: {
    marginVertical: SIZES.gapLarge,
    width: Platform.OS === 'ios' ? '100%' : SIZES.width,
    alignSelf: 'center',
  },
  title: {
    width: SIZES.width / 2.4,
  },
});
