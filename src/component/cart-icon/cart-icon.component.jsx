import { ShoppingSvg, CartIconContainer, ItemCount } from './cart-icon.styles';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { selectIsCartOpen, selectCartCount } from '../store/cart/cart.selector';

import { setIsCartOpen } from '../store/cart/cart.action';

const CartIcon = () => {
	const dispatch = useDispatch();
	// const { isCartOpen, setIsCartOpen, cartCount } = useSelector();
	const cartCount = useSelector(selectCartCount);
	const isCartOpen = useSelector(selectIsCartOpen);

	const toogleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
	//also do this way
	// dispatch({
	// 	type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
	// 	payload: !isCartOpen
	// });

	return (
		<CartIconContainer onClick={toogleIsCartOpen}>
			<ShoppingSvg className='shopping-icon' />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
