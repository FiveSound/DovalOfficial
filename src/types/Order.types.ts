export interface TypeOrder {
  id: number;
  orderID: string;
  customerID: string;
  businessID: string;
  hour: string;
  hour_end: string;
}

export interface OrderList {
  restaurantName: string;
  orderId: number;
  totalTime: string;
  price: string;
  imageUrl: string;
  status: string;
  rating: number;
  BgStatus: string;
  textColorStatus: string;
}
