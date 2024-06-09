import { createSlice } from '@reduxjs/toolkit';
import cartItems from '../contants/cartItems';

const initialState = {
  cartItems: cartItems,
  totalAmount: 0,
  totalQuantity: 0,
};

export const musicSlice = createSlice({
  name: 'musicfunction',
  initialState,
  reducers: {
    increase: (state, action) => {
      const updatedCartItems = state.cartItems.map(item =>
        item.id === action.payload.id ? { ...item, amount: item.amount + 1 } : item
      );
      const totalAmount = calculateTotalAmount(updatedCartItems);
      const totalQuantity = calculateTotalQuantity(updatedCartItems);
      return { ...state, cartItems: updatedCartItems, totalAmount, totalQuantity };
    },
    decrease: (state, action) => {
      const updatedCartItems = state.cartItems
        .map(item =>
          item.id === action.payload.id
            ? { ...item, amount: item.amount > 0 ? item.amount - 1 : 0 }
            : item
        )
        .filter(item => item.amount > 0);
      const totalAmount = calculateTotalAmount(updatedCartItems);
      const totalQuantity = calculateTotalQuantity(updatedCartItems);
      return { ...state, cartItems: updatedCartItems, totalAmount, totalQuantity };
    },
    remove: (state, action) => {
      const updatedCartItems = state.cartItems.filter(item => item.id !== action.payload.id);
      const totalAmount = calculateTotalAmount(updatedCartItems);
      const totalQuantity = calculateTotalQuantity(updatedCartItems);
      return { ...state, cartItems: updatedCartItems, totalAmount, totalQuantity };
    },
    clearmusic: (state) => {
      return { ...state, cartItems: [], totalAmount: 0, totalQuantity: 0 };
    },
  },
});

const calculateTotalAmount = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.price * item.amount, 0);
};

const calculateTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, item) => total + item.amount, 0);
};

export const { increase, decrease, remove, clearmusic } = musicSlice.actions;
export default musicSlice.reducer;