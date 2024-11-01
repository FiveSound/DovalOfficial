import { memo } from 'react';
import { useTheme } from '../../../../hooks';
import FlexContainer from '../../FlexContainer';
import { COLORS, FONTS, SIZES } from '../../../../constants/theme';
import Typography from '../../Typography';
import { ShoppingBasketAdd03Icon } from '../../../../constants/IconsPro';
import LineDivider from '../../LineDivider';
import Cover from '../../Avatars/Cover';
import { CLOUDFRONT } from '../../../../services';
import styles from './styles';
import { TouchableOpacity, useNavigation, View, Text } from '../../../native';
import i18next from '../../../../Translate';
import { useAppDispatch } from '../../../../redux';
import { setRecipeID } from '../../../../redux/slides/navigations';
import { Chip } from '../../Chips';

interface Row {
  name: string;
  description: string;
  thumbnail: string;
  price: string;
  id: number;
  businessID: number;
  cover: string;
  ordenable: boolean;
}

type RowBusiness = {
  onDelete: (id: number, name: string) => void;
  complete: boolean;
  discount: number;
}

type props = {
  row: Row;
  rowBusiness?: RowBusiness;
  isBusiness?: boolean;
};

const CardMenu = (props: props) => {
  const { row, rowBusiness, isBusiness = false } = props;
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { color } = useTheme();
  const handleProduct = () => {
    if (row.id) {
      dispatch(setRecipeID(row.id));
      navigation.navigate('AddProducts');
    }
  };

  if (row) {
    const { price, name, description, thumbnail, ordenable } = row;
    const covers = `${CLOUDFRONT}${thumbnail}`;

    return (
      <>
        <FlexContainer newStyle={styles.flexContainer}>
          <FlexContainer newStyle={styles.touchableOpacity}>
            <Cover source={covers} size="medium" />
            <View style={styles.textContainer}>
              <Typography
                variant="subtitle"
                numberOfLines={3}
                newStyle={styles.typographyName}
              >
                {name}
              </Typography>
              <Typography
                numberOfLines={3}
                variant="SubDescription"
                newStyle={styles.typographyDescription}
              >
                {description}
              </Typography>
              <FlexContainer newStyle={styles.priceContainer}>
                <Typography
                  variant="subtitle"
                  newStyle={{ color: color, ...FONTS.heading18 }}
                >
                  {price}
                </Typography>
                {ordenable && (
                  <TouchableOpacity
                    style={styles.addButton}
                    onPress={handleProduct}
                  >
                    <Typography variant="H4title" newStyle={styles.typographyAdd}>
                      {' '}
                      {i18next.t('Add to cart')}{' '}
                    </Typography>
                    <ShoppingBasketAdd03Icon
                      width={SIZES.icons}
                      height={SIZES.icons}
                      color={COLORS.primary}
                    />
                  </TouchableOpacity>
                )}
              </FlexContainer>
            </View>
          </FlexContainer>
          <LineDivider variant='primary' lineStyle={styles.lineDivider} />
        </FlexContainer>
        {
          isBusiness && (
            <>
              <FlexContainer variant='row' newStyle={styles.containerDescount}>
              {/* <Typography variant='H4title'>
                  Discount: {rowBusiness?.discount}%
                </Typography> */}
              <View style={styles.chipContainer}>
                  {rowBusiness?.complete && <Chip title="Live" color={COLORS.success} size='medium' />}
                  {!rowBusiness?.complete && <Chip title="Draft" color={COLORS.error} size="small" />}
                </View>
              <FlexContainer variant='row' newStyle={styles.buttonsContainer}>
              <TouchableOpacity 
                style={styles.buttonsDelete}
                onPress={() => rowBusiness?.onDelete(row.id, row.name)}>
                  <Typography variant='H4title'>
                    Eliminar
                  </Typography>
                </TouchableOpacity>
                <TouchableOpacity style={styles.editButton} disabled>
                  <Typography variant='H4title'>
                    Editar
                  </Typography>
                </TouchableOpacity>
              </FlexContainer>
              </FlexContainer>
            </>
          )}
        <LineDivider variant="secondary" lineStyle={styles.lineDivider} />
      </>
    );
  }
};

export default memo(CardMenu);
