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

export const CartContext = createContext({
	isCartOpen: false,
	setIsCartOpen: () => {},
	cartItems: [],
	addItemsToCart: [],
	cartCount: 0
});

export const CartProvider = ({ children }) => {
	const [isCartOpen, setIsCartOpen] = useState();
	const [cartItems, setIsCartItems] = useState([]);
	const [cartCount, setCartCount] = useState(0);

	useEffect(() => {
		const newCartCount = cartItems.reduce(
			(total, cartItem) => total + cartItem.quantity,
			0
		);
		setCartCount(newCartCount);
	}, [cartItems]);

	const addItemsToCart = (productToAdd) => {
		setIsCartItems(itemsToCart(cartItems, productToAdd));
	};

	const value = {
		isCartOpen,
		setIsCartOpen,
		addItemsToCart,
		cartItems,
		cartCount
	};
	return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
