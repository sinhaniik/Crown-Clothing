import { useContext } from 'react';
import Button, { BUTTON_TYPE_CLASS } from '../buttton/button.component';
import { CartContext } from '../../context/cart.context';

import {
	ProductCartContainer,
	Footer,
	Name,
	Price
} from './product-card.styles';

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemsToCart } = useContext(CartContext);

	const addProductToCart = () => addItemsToCart(product);
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
