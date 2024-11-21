export type OrderStatusType =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELED';

export type RestauranteOrderType = {
  orderID: number;
  items: string;
  recipesID: string;
  recipesName: string;
  recipesCover: string;
  country_code: string;
  estimated_time: string;
  creation_time: string;
  userID: string;
  businessID: string;
  riderID: string | null;
  status: OrderStatusType;
  verified: boolean;
  canceled: boolean;
  total: string;
};

export type RestauranteSearchOrderType = {
  orderID: number;
  client: string;
  email: string;
  phone: string;
  status: OrderStatusType;
  creation_time: string;
  estimated_time: string;
};
