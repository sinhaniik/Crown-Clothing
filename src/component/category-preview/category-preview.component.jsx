import './category-preview.styles.scss';
import ProductCard from '../product-cards/product-card.component';

const CategoryPreview = ({ title, products }) => {
	return (
		<div className='category-preview-container'>
			<span className='title'>{title.toUpperCase()}</span>

			<div className='preview'>
				{products
					.filter((_, index) => index < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</div>
		</div>
	);
};

export default CategoryPreview;
