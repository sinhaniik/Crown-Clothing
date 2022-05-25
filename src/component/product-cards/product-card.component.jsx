import { useContext } from 'react';
import './product-card.style.scss';
import Button, { BUTTON_TYPE_CLASS } from '../buttton/button.component';
import { CartContext } from '../../context/cart.context';

const ProductCard = ({ product }) => {
	const { name, price, imageUrl } = product;
	const { addItemsToCart } = useContext(CartContext);

	const addProductToCart = () => addItemsToCart(product);
	return (
		<div className='product-card-container'>
			<img src={imageUrl} alt={`${name}`} />
			<div className='footer'>
				<span className='name'>{name}</span>
				<span className='price'>{price}</span>
			</div>
			<Button
				buttonType={BUTTON_TYPE_CLASS.inverted}
				onClick={addProductToCart}
			>
				Add to Cart
			</Button>
		</div>
	);
};
export default ProductCard;
