import { createSelector } from 'reselect';
import { CartState } from './cart.reducer';

//gets the whole cart
const selectCartReducer = (state): CartState => state.cart;

//extract cartItems
export const selectCartItems = createSelector(
	[selectCartReducer],
	(cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
	[selectCartReducer],
	(cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
	cartItems.reduce(
		(total, cartItem) => total + cartItem.quantity * cartItem.price,
		0
	)
);
