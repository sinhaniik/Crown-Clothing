import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../buttton/button.component';
import './cart-dropdown.styles.scss';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../context/cart.context';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	const navigation = useNavigate();

	const goToCheckOutHandler = () => {
		navigation('/checkout');
	};

	return (
		<div className='cart-dropdown-container'>
			<div className='cart-items'>
				{cartItems.map((item) => (
					<CartItem key={item.id} cartItem={item} />
				))}
			</div>
			<Button onClick={goToCheckOutHandler}> GO TO CHECKOUT</Button>
		</div>
	);
};

export default CartDropdown;
