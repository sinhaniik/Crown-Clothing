import { useContext } from 'react';
import './product-card.style.scss';
import Button from '../buttton/button.component';
import { CartContext } from '../../context/cart.context';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';

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
			<Button buttonTypes='inverted' onClick={addProductToCart}>
				Add to Cart
			</Button>
		</div>
	);
};
export default ProductCard;
