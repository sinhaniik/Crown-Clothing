import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

import { ShoppingSvg, CartIconContainer, ItemCount } from './cart-icon.styles';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
	const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<CartIconContainer onClick={toogleIsCartOpen}>
			<ShoppingSvg className='shopping-icon' />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
