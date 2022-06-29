import { useReducer } from 'react';
import { createContext, useState, useEffect } from 'react';

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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemsToCart: [],
	removeItemsToCart: () => {},
	clearItemFromCart: () => {},
	cartCount: 0,
	cartTotal: 0
});

const USER_ACTION_TYPES = {
	SET_CART_ITEMS: 'SET_CART_ITEMS',
	SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
};

const INITIAL_STATE = {
	isCartOpen: false,
	cartItems: [],
	cartCount: 0,
	cartTotal: 0
};

const cartReducer = (state, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CART_ITEMS:
			return {
				...state,
				...payload
			};
		case USER_ACTION_TYPES.SET_IS_CART_OPEN:
			return {
				...state,
				isCartOpen: payload
			};

		default:
			throw new Error(`unhandeled error ${type} on cartReducer`);
	}
};

export const CartProvider = ({ children }) => {
	// const [isCartOpen, setIsCartOpen] = useState();
	// const [cartItems, setIsCartItems] = useState([]);
	// const [cartCount, setCartCount] = useState(0);
	// const [cartTotal, setcartTotal] = useState(0);

	const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
	const { isCartOpen, cartItems, cartCount, cartTotal } = state;

	//make one function that do update kinda work
	const updateCartItemReducer = (newCartItems) => {
		const newCartCount = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);

		const newCartTotal = newCartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);

		dispatch({
			type: USER_ACTION_TYPES.SET_CART_ITEMS,
			payload: {
				cartItems: newCartItems,
				cartCount: newCartCount,
				cartTotal: newCartTotal
			}
		});
	};

	//to change value from true to false
	const setIsCartOpen = (bool) => {
		dispatch({ type: USER_ACTION_TYPES.SET_IS_CART_OPEN, payload: bool });
	};

	//add cart item
	const addItemsToCart = (productToAdd) => {
		const newCartItems = itemsToCart(cartItems, productToAdd);
		updateCartItemReducer(newCartItems);
	};

	//remove decrement cart item
	const removeItemsToCart = (cartItemToRemove) => {
		const newCartItems = removeCartItem(cartItems, cartItemToRemove);
		updateCartItemReducer(newCartItems);
	};

	// clear cart item
	const clearItemFromCart = (cartItemToClear) => {
		const newCartItems = clearItemCart(cartItems, cartItemToClear);
		updateCartItemReducer(newCartItems);
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemsToCart,
		removeItemsToCart,
		clearItemFromCart,
		cartItems,
		cartCount,
		cartTotal
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
