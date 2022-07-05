import { useNavigate } from 'react-router-dom';
import Button from '../buttton/button.component';
import CartItem from '../cart-item/cart-item.component';
import {
	CartDropDownContainer,
	CartItems,
	EmptyMessage
} from './cart-dropdown.styles';

//reduxify
import { selectCartItems } from '../store/cart/cart.selector';
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const CartDropdown = () => {
	const cartItems = useSelector(selectCartItems);

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
