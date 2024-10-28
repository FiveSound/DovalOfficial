export type OrderDashboardType = {
  id: number;
  postID: number;
  title: string;
  thumbnail: string;
  items_costs: string;
  orderID: number;
  status: string;
  qty: number;
};

export type StatusType =
  | 'PENDING'
  | 'IN_PROGRESS'
  | 'DELIVERED'
  | 'COMPLETED'
  | 'CANCELED';
