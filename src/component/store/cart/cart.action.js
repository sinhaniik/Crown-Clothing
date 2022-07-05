import { CART_ACTION_TYPES } from './cart.types';
import { createAction } from '../../../utils/firebase/reducer/reducer.utils';

const itemsToCart = (cartItems, productToAdd) => {
	//checks if cartItems is already exists in the cart or not
	const existingCartItems = cartItems.find(
		(cartItem) => cartItem.id === productToAdd.id
	);

	//if cartItems contains then return a new arrays
	if (existingCartItems) {
		return cartItems.map((cartItem) =>
			cartItem.id === productToAdd.id
				? { ...cartItem, quantity: cartItem.quantity + 1 }
				: cartItem
		);
	}

	// creating add new product to out cart items
	return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
	//checks if cartItems is already exists in the cart or not
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	//if cartItems contains then return a new arrays
	if (existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	// creating add new product to out cart items
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearItemCart = (cartItems, cartItemToClear) => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

// helper function which helps us in updating the(action creaters)
// action types/ action creator function

//check if cart is open or close
export const setIsCartOpen = (bool) =>
	createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool);

// add cart item
export const addItemsToCart = (cartItems, productToAdd) => {
	const newCartItems = itemsToCart(cartItems, productToAdd);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// remove decrement cart item
export const removeItemsFromCart = (cartItems, cartItemToRemove) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

// clear cart item
export const clearItemFromCart = (cartItems, cartItemToClear) => {
	const newCartItems = clearItemCart(cartItems, cartItemToClear);
	return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
