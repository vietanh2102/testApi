import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartType, UpdateCartItemType } from "../types";

interface Cart {
  cart: CartType[];
}
const getCartItem = () => {
  const cartJson = localStorage.getItem("cart");
  if (cartJson !== null) {
    const cart = JSON.parse(cartJson) as CartType[];
    return cart;
  }
};

const cartInitial: Cart = {
  cart: getCartItem() || [],
};
export const CartSlice = createSlice({
  name: "carts",
  initialState: cartInitial,
  reducers: {
    addCart(state, action: PayloadAction<CartType>) {
      const { cart } = state;
      const existingCart = cart.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (existingCart) {
        existingCart.quantity = existingCart.quantity + action.payload.quantity;
      } else {
        cart.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    },
    removeItem(state, action: PayloadAction<UpdateCartItemType>) {
      const indexItem = state.cart.findIndex(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (indexItem !== -1) {
        state.cart.splice(indexItem, 1);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deIncreaseItem(state, action: PayloadAction<UpdateCartItemType>) {
      const { cart } = state;
      const existingCart = cart.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );
      if (!existingCart) {
        return;
      }
      if (existingCart.quantity < 2) {
        CartSlice.caseReducers.removeItem(state, action);
      }
      existingCart.quantity = existingCart?.quantity - 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    increaseItem(state, action: PayloadAction<UpdateCartItemType>) {
      const { cart } = state;
      const existingCart = cart.find(
        (item) =>
          item.id === action.payload.id && item.size === action.payload.size
      );

      if (!existingCart) {
        return;
      }
      existingCart.quantity = existingCart?.quantity + 1;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
  },
});
export const { addCart, increaseItem, deIncreaseItem, removeItem } =
  CartSlice.actions;
const cartReducer = CartSlice.reducer;
export default cartReducer;
