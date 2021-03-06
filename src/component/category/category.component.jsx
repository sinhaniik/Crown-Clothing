import { CategoryContainer, CategoryTitle } from './category.styles';
import { useParams } from 'react-router-dom';

import { useEffect, useState, Fragment } from 'react';
import ProductCard from '../../component/product-cards/product-card.component';

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategoriesMap } from '../../component/store/categories/categories.selector';

//spinner
import { selectCategoriesIsLoading } from '../../component/store/categories/categories.selector';
import Spinner from '../spinner/spinner.component';

const Category = () => {
	const { category } = useParams();
	const categoriesMap = useSelector(selectCategoriesMap);
	const isLoading = useSelector(selectCategoriesIsLoading);
	const [products, setProducts] = useState(categoriesMap[category]);

	useEffect(() => {
		setProducts(categoriesMap[category]);
	}, [category, categoriesMap]);

	return (
		<Fragment>
			<CategoryTitle>{category.toLocaleUpperCase()}</CategoryTitle>

			{isLoading ? (
				<Spinner />
			) : (
				<CategoryContainer>
					{products &&
						products.map((product) => (
							<ProductCard key={product.id} product={product} />
						))}
				</CategoryContainer>
			)}
		</Fragment>
	);
};

export default Category;
