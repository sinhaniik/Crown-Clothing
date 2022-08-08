import { CategoryItem } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';
import {
	createAction,
	withMatcher,
	ActionWithPayload
} from '../../../utils/firebase/reducer/reducer.utils';

// utility function
const itemsToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
): CartItem[] => {
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

const removeCartItem = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
): CartItem[] => {
	//checks if cartItems is already exists in the cart or not
	const existingCartItem = cartItems.find(
		(cartItem) => cartItem.id === cartItemToRemove.id
	);

	// if cartItems contains then return a new arrays
	// if cartItems exist then check
	if (existingCartItem && existingCartItem.quantity === 1) {
		return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
	}

	// creating add new product to out cart items
	return cartItems.map((cartItem) =>
		cartItem.id === cartItemToRemove.id
			? { ...cartItem, quantity: cartItem.quantity - 1 }
			: cartItem
	);
};

const clearItemCart = (
	cartItems: CartItem[],
	cartItemToClear: CartItem
): CartItem[] => {
	return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);
};

export type setIsCartOpen = ActionWithPayload<
	CART_ACTION_TYPES.SET_IS_CART_OPEN,
	boolean
>;
export type setIsCartItem = ActionWithPayload<
	CART_ACTION_TYPES.SET_CART_ITEMS,
	CartItem[]
>;

// helper function which helps us in updating the(action creaters)
// action types/ action creator function

//check if cart is open or close
export const setIsCartOpen = withMatcher(
	(bool: boolean): setIsCartOpen =>
		createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
);

// making type and returning it
export const setCartItems = withMatcher(
	(cartItems: CartItem[]): setIsCartItem =>
		createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

// add cart item
export const addItemsToCart = (
	cartItems: CartItem[],
	productToAdd: CategoryItem
) => {
	const newCartItems = itemsToCart(cartItems, productToAdd);
	return setCartItems(newCartItems);
};

// remove decrement cart item
export const removeItemsFromCart = (
	cartItems: CartItem[],
	cartItemToRemove: CartItem
) => {
	const newCartItems = removeCartItem(cartItems, cartItemToRemove);
	return setCartItems(newCartItems);
};

// clear cart item
export const clearItemFromCart = (
	cartItems: CartItem[],
	cartItemToClear: CartItem
) => {
	const newCartItems = clearItemCart(cartItems, cartItemToClear);
	return setCartItems(newCartItems);
};
