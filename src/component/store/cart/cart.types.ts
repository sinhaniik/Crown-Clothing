import { CategoryItem } from '../categories/categories.types';

export enum CART_ACTION_TYPES {
	SET_CART_ITEMS = 'cart/SET_CART_ITEMS',
	SET_IS_CART_OPEN = 'cart/SET_IS_CART_OPEN',
	SET_CART_COUNT = 'cart/SET_CART_COUNT',
	SET_CART_TOTAL = 'cart/SET_CART_TOTAL'
}

// THIS CART ITEM IS NOTHING BUT CATEGORYITEMS WITH AN ADDTIONAL VALUE OF QUANTITY IN IT
// CategoryItem is the main item and cartItem is the one which increses and decreses with pressing the button
export type CartItem = CategoryItem & {
	quantity: number;
};
