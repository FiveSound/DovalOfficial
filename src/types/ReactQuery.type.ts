import { TypeCart } from "./cart/Cart.types";

export interface QueryType {
  data: any;
  isLoading: Boolean;
  isFetching: Boolean;
  isRefetching: Boolean;
  refetch: () => void;

}

export interface QueryKeyType {
  queryKey: Array<string | number | TypeCart[] | undefined | null | object | boolean >;
}
