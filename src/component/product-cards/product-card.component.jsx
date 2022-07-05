import Button, { BUTTON_TYPE_CLASS } from '../buttton/button.component';
import { useDispatch } from 'react-redux/es/exports';
import { useSelector } from 'react-redux/es/exports';
import { selectCartItems } from '../store/cart/cart.selector';
import { addItemsToCart } from '../store/cart/cart.action';

import {
	ProductCartContainer,
	Footer,
	Name,
	Price
} from './product-card.styles';

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const dispatch = useDispatch();

	const cartItems = useSelector(selectCartItems);
	const addProductToCart = () => dispatch(addItemsToCart(cartItems, product));

	// const addProductToCart = () => addItemsToCart(product);
	return (
		<ProductCartContainer>
			<img src={imageUrl} alt={`${name}`} />
			<Footer>
				<Name>{name}</Name>
				<Price>{price}</Price>
			</Footer>
			<Button
				buttonType={BUTTON_TYPE_CLASS.inverted}
				onClick={addProductToCart}
			>
				Add to Cart
			</Button>
		</ProductCartContainer>
	);
};
export default ProductCard;
