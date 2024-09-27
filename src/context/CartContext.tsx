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
    console.log('handleEditCart called with recipeID:', recipeID, 'remove:', remove);
    const updatedCart = cart.list.map((item) => {
      if (item.recipeID === recipeID) {
        const newQty = remove ? item.qty - 1 : item.qty + 1;
        console.log('Updating qty for recipeID:', recipeID, 'newQty:', newQty);
        return { ...item, qty: newQty };
      }
      return item;
    });
    console.log('Updated cart:', updatedCart);
    setCart(updatedCart);
  };

  const handleRemoveCart = (recipeID: number) => {
    console.log('handleRemoveCart called with recipeID:', recipeID);
    const updatedCart = cart.filter((item) => item.recipeID !== recipeID);
    console.log('Updated cart after removal:', updatedCart);
    setCart(updatedCart);
  };

  const addProduct = async (
    recipeID: number,
    setLoad: (load: boolean) => void
  ) => {
    try {
      console.log("Adding product", recipeID);
      setLoad(true);

      handleEditCart(recipeID);

      const response = await addToCartService(recipeID, [], 1);
      console.log("Response from add to cart service", response);

      if (!response.success) {
        handleEditCart(recipeID, true);
        Alert.alert("Error al agregar el producto al carrito");
      }

      if (response.isNew) {
        await refetching();
      }
    } catch (error) {
      console.error("Error en addProduct:", error);
      Alert.alert("Error al agregar el producto al carrito");
    } finally {
      setLoad(false);
    }
  };

  const removeProduct = async (
    recipeID: number,
    setLoad: (load: boolean) => void
  ) => {
    try {
      console.log("Removing product", recipeID);
      setLoad(true);

      handleEditCart(recipeID, true);

      const response = await removerCartService(recipeID);
      console.log("Response from remove cart service", response);

      if (!response?.success) {
        handleEditCart(recipeID);
        Alert.alert("Error al eliminar el producto del carrito");
      }

      if (response?.isLast) {
        handleRemoveCart(recipeID);
      }
    } catch (error) {
      console.error("Error en removeProduct:", error);
      Alert.alert("Error al eliminar el producto del carrito");
    } finally {
      setLoad(false);
    }
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