export type TypeCover = {
  id: string;
  key: string;
};

export type TypeCartItem = {
  id: number;
  userID: string;
  businessID: string;
  postID: number;
  recipeID: number;
  business_name: string;
  cover: string;
  thumbnail: string;
  name: string;
  description: string;
  qty: number;
  price: number;
  discount: number;
};

export type TypeCart = {
  list: TypeCartItem[];
  total: string;
};