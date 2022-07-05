import './checkout-item.styles.scss';
//reduxify

import { selectCartItems } from '../store/cart/cart.selector';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';

import { addItemsToCart } from '../store/cart/cart.action';
import { clearItemFromCart } from '../store/cart/cart.action';
import { removeItemsFromCart } from '../store/cart/cart.action';

const CheckoutItem = ({ cartItem }) => {
	const { imageUrl, name, price, quantity } = cartItem;
	const cartItems = useSelector(selectCartItems);
	const dispatch = useDispatch();

	const clearItemHandler = () =>
		dispatch(clearItemFromCart(cartItems, cartItem));

	const incrementHandler = () => dispatch(addItemsToCart(cartItems, cartItem));

	const decrementHandler = () =>
		dispatch(removeItemsFromCart(cartItems, cartItem));

	return (
		<div className='checkout-item-container'>
			<div className='image-container'>
				<img src={imageUrl} alt='{`${name}`}' />
			</div>

			<span className='name'>{name}</span>

			<span className='quantity'>
				<div className='arrow' onClick={decrementHandler}>
					&#10094;
				</div>
				<span className='value'>{quantity}</span>

				<div className='arrow' onClick={incrementHandler}>
					&#10095;
				</div>
			</span>

			<span className='price'>{price}</span>

			<div className='remove-button' onClick={clearItemHandler}>
				&#10005;
			</div>
		</div>
	);
};

export default CheckoutItem;
