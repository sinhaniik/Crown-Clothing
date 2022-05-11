import { useContext } from 'react';
import './cart-icon.styles.scss';
import { CartContext } from '../../context/cart.context';
import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg';

const CartIcon = () => {
	const { isCartOpen, setIsCartOpen } = useContext(CartContext);
	const toogleIsCartOpen = () => setIsCartOpen(!isCartOpen);

	return (
		<div className='cart-icon-container' onClick={toogleIsCartOpen}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>10</span>
		</div>
	);
};

export default CartIcon;
