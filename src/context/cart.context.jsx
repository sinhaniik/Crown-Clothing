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

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState();
	const [cartItems, setIsCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);
	const [clearItem, setClearItem] = useState();
	const [cartTotal, setcartTotal] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	useEffect(() => {
		const newCartTotal = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity * cartItem.price,
			0
		);
		setcartTotal(newCartTotal);
	}, [cartItems]);

	//add cart item
	const addItemsToCart = (productToAdd) => {
		setIsCartItems(itemsToCart(cartItems, productToAdd));
	};

	//remove decrement cart item
	const removeItemsToCart = (cartItemToRemove) => {
		setIsCartItems(removeCartItem(cartItems, cartItemToRemove));
	};

	// clear cart item
	const clearItemFromCart = (cartItemToClear) => {
		setIsCartItems(clearItemCart(cartItems, cartItemToClear));
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
