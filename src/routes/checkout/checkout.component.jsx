import CheckoutItem from '../../component/checkout-item/checkout-item.component';

import {
	CheckoutContainer,
	CheckoutHeader,
	HeaderBlock,
	Total
} from './checkout.styles';

//reduxify
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import {
	selectCartItems,
	selectCartTotal
} from '../../component/store/cart/cart.selector';

const Checkout = () => {
	const cartItems = useSelector(selectCartItems);
	const cartTotal = useSelector(selectCartTotal);

	return (
		<CheckoutContainer>
			<CheckoutHeader>
				<HeaderBlock>
					<span>Product</span>
				</HeaderBlock>

				<HeaderBlock>
					<span>Discription</span>
				</HeaderBlock>

				<HeaderBlock>
					<span>Quantity</span>
				</HeaderBlock>

				<HeaderBlock>
					<span>Price</span>
				</HeaderBlock>

				<HeaderBlock>
					<span>Remove</span>
				</HeaderBlock>
			</CheckoutHeader>

			{cartItems.map((cartItem) => {
				return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
			})}
			<Total>Total :${cartTotal}</Total>
		</CheckoutContainer>
	);
};

export default Checkout;
