import React, { memo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { CLOUDFRONT } from '../../../../services';
import { FONTS, SIZES } from '../../../../constants/theme';
import FlexContainer from '../../FlexContainer';
import { useTheme } from '../../../../hooks';
import Typography from '../../Typography';
import { AddRemove } from './ToggleAdd';
import Cover from '../../Avatars/Cover';
import {
  addCartQtyService,
  addToCartService,
  getCartService,
  removerCartService,
} from '../../../../services/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
const QUERY_KEY = ["cart-screen"];

interface row {
  recipeID: number;
  name: string;
  description: string;
  formatprice: string;
  qty: number;
  thumbnail: string;
  variants: number[];
}

type Props = {
  row: row;
  refetch: () => void;
};

const CartItem: React.FC<Props> = ({ row, refetch }) => {
  const { backgroundMaingrey } = useTheme();
  const { recipeID, name, description, formatprice, qty, thumbnail, variants } = row;
  const queryClient = useQueryClient();
  const [cartID, setCartID] = useState<null | number>(null);

    const mutation = useMutation({
      mutationKey: QUERY_KEY,
      mutationFn: getCartService,
      onSuccess: (data) => {
        queryClient.setQueryData(QUERY_KEY, data);
        queryClient.invalidateQueries({ queryKey: ["cart-resume-component", cartID] });
      },
    });
  
    const removeMutation = useMutation({
      mutationKey: QUERY_KEY,
      mutationFn: async (params: { cartItemID: number; recipeID: number }) => {
        return await removerCartService(params.cartItemID, params.recipeID);
      },
      onSuccess: () => mutation.mutate(),
    });
  
    const addMutation = useMutation({
      mutationKey: QUERY_KEY,
      mutationFn: addCartQtyService,
      onSuccess: () => mutation.mutate(),
    });

  return (
    <FlexContainer
      newStyle={[
        styles.container,
        {
          backgroundColor: backgroundMaingrey,
        },
      ]}
    >
      <FlexContainer
        variant="row"
        newStyle={[
          styles.containerExtra,
          {
            backgroundColor: backgroundMaingrey,
          },
        ]}
      >
        <Cover source={`${CLOUDFRONT}${thumbnail}`} size="medium" />
        <FlexContainer newStyle={styles.containerText}>
          <Typography
            newStyle={styles.maxText}
            variant="subtitle"
            numberOfLines={2}
          >
            {name}
          </Typography>
          <Typography
            variant="SubDescription"
            numberOfLines={3}
            newStyle={styles.maxText}
          >
            {description}
          </Typography>
          <FlexContainer variant="row" newStyle={styles.containerprice}>
            <Typography variant="subtitle" newStyle={styles.price}>
              {formatprice}
            </Typography>
            <AddRemove
              add={() => addMutation.mutate({ recipeID, variants, qty: 1 })}
              remove={() => removeMutation.mutate({ cartItemID: recipeID, recipeID })}
              qty={qty}
            />
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  );
};

export default memo(CartItem);

const styles = StyleSheet.create({
  container: {
    marginBottom: SIZES.gapMedium,
    width: '100%',
    padding: SIZES.gapLarge,
    borderRadius: SIZES.radius,
  },
  containerExtra: {
    gap: SIZES.gapLarge,
  },
  maxText: {
    width: SIZES.width / 1.4,
  },
  price: {
    ...FONTS.semi18,
  },
  containerText: {
    gap: SIZES.gapSmall,
  },
  containerprice: {
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: SIZES.gapLarge,
  },
});
