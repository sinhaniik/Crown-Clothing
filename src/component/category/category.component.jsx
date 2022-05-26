import { CategoryContainer, CategoryTitle } from './category.styles';
import { useParams } from 'react-router-dom';
import { useContext, useEffect, useState, Fragment } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import ProductCard from '../../component/product-cards/product-card.component';

const Category = () => {
	const { category } = useParams();
	const { categoriesMap } = useContext(CategoriesContext);

	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Fragment>
			<CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>

			<CategoryContainer>
				{products &&
					products.map((product) => (
						<ProductCard key={product.id} product={product} />
					))}
			</CategoryContainer>
		</Fragment>
	);
};

export default Category;
