import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../buttton/button.component';
import CartItem from '../cart-item/cart-item.component';
import { CartContext } from '../../context/cart.context';
import {
	CartDropDownContainer,
	CartItems,
	EmptyMessage
} from './cart-dropdown.styles';

const CartDropdown = () => {
	const { cartItems } = useContext(CartContext);

	const navigation = useNavigate();

	const goToCheckOutHandler = () => {
		navigation('/checkout');
	};

	return (
		<CartDropDownContainer>
			<CartItems>
				{cartItems.length ? (
					cartItems.map((item) => <CartItem key={item.id} cartItem={item} />)
				) : (
					<EmptyMessage>your cart-items is empty</EmptyMessage>
				)}
			</CartItems>
			<Button onClick={goToCheckOutHandler}> GO TO CHECKOUT</Button>
		</CartDropDownContainer>
	);
};

export default CartDropdown;
