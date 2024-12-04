// src/redux/cartActions.js

export const ADD_TO_CART = 'ADD_TO_CART';

// Action to add a product to the cart
export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
});
