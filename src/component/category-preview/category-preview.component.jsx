import {
	CategoryPreviewContainer,
	Title,
	Preview
} from './category-preview.styles';
import ProductCard from '../product-cards/product-card.component';

const CategoryPreview = ({ title, products }) => {
	return (
		<CategoryPreviewContainer>
			<Title to={title}>{title.toUpperCase()}</Title>

			<Preview>
				{products
					.filter((_, index) => index < 4)
					.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</Preview>
		</CategoryPreviewContainer>
	);
};

export default CategoryPreview;
