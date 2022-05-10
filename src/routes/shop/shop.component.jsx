import { useContext } from 'react';
import { ProductContext } from '../../context/products.context';
import ProductCard from '../../component/product-cards/product-card.component';
import './shop.styles.scss';

const Shop = () => {
	const { products } = useContext(ProductContext);

	return (
		<div className='products-container'>
			{products.map((products) => (
				<ProductCard key={products.id} product={products} />
			))}
		</div>
	);
};

export default Shop;
