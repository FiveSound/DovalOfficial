export type TypeVariant = {
  id: number;
  recipeID: number;
  title: string;
  limit_qty: number;
  required: boolean;
};

export type TypeSubVariant = {
  id: number;
  variantID: number;
  name: string;
  price: string;
};
