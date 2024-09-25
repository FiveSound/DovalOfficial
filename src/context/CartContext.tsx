import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useAuth } from "./AuthContext";
import { useDashboard } from "./DashboardContext";
import useCustomNavigation from "./useCustomNavigation";
import { TypeCart } from "../types/cart/Cart.types";
import {
  addToCartService,
  getCartService,
  removerCartService,
} from "../services/cart";
import { createOrderService } from "../services/orders";
import { Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";

type CartContextProps = {
  isLoading: boolean;
  isError: boolean;
  refetching: () => Promise<void>;
  cart: TypeCart;
  removeProduct: (recipeID: number, setLoad: (load: boolean) => void) => Promise<void>;
  addProduct: (recipeID: number, setLoad: (load: boolean) => void) => Promise<void>;
  submitting: boolean;
  createNewOrder: () => Promise<void>;
};

export const CartContext = createContext<CartContextProps>(
  {} as CartContextProps
);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider: FC<CartProviderProps> = ({ children }) => {
  const { user } = useAuth();
  const { socket } = useDashboard();
  const { navigation } = useCustomNavigation();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [submitting, setIsSubmitting] = useState(false);
  const [cart, setCart] = useState<TypeCart[][]>([]);
  let remove = true;

  const handleEditCart = (recipeID: number, remove?: boolean) => {
    const updateCart = cart.map((innerArray) => {
      return innerArray.map((row) => {
        if (row.recipeID === recipeID) {
          let newQty = remove ? row.qty - 1 : row.qty + 1;
          return { ...row, qty: newQty };
        }
        return row;
      });
    });

    setCart(updateCart);
  };

  const handleRemoveCart = (recipeID: number) => {
    const updatedCart = cart.map((innerArray) => {
      return innerArray.filter((row) => !(row.recipeID === recipeID));
    });

    const model = updatedCart.filter((row) => row.length > 0);

    setCart(model);
  };

  const addProduct = async (
    recipeID: number,
    setLoad: (load: boolean) => void
  ) => {
    console.log("Adding product", recipeID);
    setLoad(true);

    handleEditCart(recipeID);

    const response = await addToCartService(recipeID, [], 1);
    console.log("Response from add to cart service", response);

    if (!response.success) {
      handleEditCart(response.recipeID, true);
    }

    if (response.isNew) {
      refetching();
    }
    setLoad(false);
  };

  const removeProduct = async (
    recipeID: number,
    setLoad: (load: boolean) => void
  ) => {
    setLoad(true);

    handleEditCart(recipeID, remove);

    const response = await removerCartService(recipeID);

    if (!response.success) {
      handleEditCart(response.recipeID);
    }

    if (response.isLast) {
      handleRemoveCart(response.recipeID);
    }

    setLoad(false);
  };

  const createNewOrder = async () => {
    setIsSubmitting(true);
    try {
      const { insertId, success } = await createOrderService();

      if (success) {
        socket?.volatile.emit("event-notification-business");
        navigation.navigate("ConfirmOrder", {
          orderID: insertId[0],
        });
      }
    } catch (error) {
      Alert.alert("No se ha podido crear tu orden!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const refetching = async () => {
    try {
      setIsLoading(true);
      const result = await getCartService();

      setCart(result);
      setIsLoading(false);
    } catch (error) {
      setIsError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      setIsLoading(false);
      return () => {};
    }

    (async () => {
      try {
        const result = await getCartService();

        setCart(result);
        setIsLoading(false);
      } catch (error) {
        setIsError(true);
        setIsLoading(false);
      }
    })();
  }, [user]);

  return (
    <CartContext.Provider
      value={{
        isLoading,
        isError,
        refetching,
        cart,
        removeProduct,
        addProduct,
        submitting,
        createNewOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}