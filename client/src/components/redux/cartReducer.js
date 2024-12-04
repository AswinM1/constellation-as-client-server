// src/redux/cartReducer.js
import { ADD_TO_CART } from './cartActions';

const initialState = {
  cartItems: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.cartItems.findIndex(item => item.id === action.payload.id);

      if (existingProductIndex === -1) {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      } else {
        const updatedCart = [...state.cartItems];
        updatedCart[existingProductIndex].quantity += 1;
        return { ...state, cartItems: updatedCart };
      }
    default:
      return state;
  }
};

export default cartReducer;
