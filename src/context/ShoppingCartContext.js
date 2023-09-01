import { createContext, useContext, useEffect, useState } from "react";
import ShopingCart from "../components/ShopingCart";
import axios from "axios";

const shoppingCart = createContext({});

const initialCartItems = localStorage.getItem("shopping-cart")
  ? JSON.parse(localStorage.getItem("shopping-cart"))
  : [];

const ShoppingCartContext = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [catrItems, setCartItems] = useState(initialCartItems);
  const [products, setProducts] = useState([]);

  const openCart = () => {
    setIsOpen(true);
  };
  const closeCart = () => {
    setIsOpen(false);
  };
  const cartQuantity = catrItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );
  function fetch() {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data));
  }
  useEffect(() => {
    fetch();
    localStorage.setItem("shopping-cart", JSON.stringify(catrItems));
  }, [catrItems]);
  const getItemsQuantity = (id) => {
    return catrItems.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id) => {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return [...currItem, { id, quantity: 1 }];
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity + 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const decreaseCartQuantity = (id) => {
    setCartItems((currItem) => {
      if (currItem.find((item) => item.id === id) == null) {
        return currItem.filter((item) => item.id !== id);
      } else {
        return currItem.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else {
            return item;
          }
        });
      }
    });
  };
  const removeItemFromCart = (id) => {
    setCartItems((currItem) => currItem.filter((item) => item.id !== id));
  };
  return (
    <shoppingCart.Provider
      value={{
        openCart,
        closeCart,
        products,
        catrItems,
        increaseCartQuantity,
        getItemsQuantity,
        decreaseCartQuantity,
        removeItemFromCart,
        cartQuantity,
      }}
    >
      {children}
      <ShopingCart isOpen={isOpen} />
    </shoppingCart.Provider>
  );
};

export default ShoppingCartContext;

export const useShoppingCart = () => {
  return useContext(shoppingCart);
};
