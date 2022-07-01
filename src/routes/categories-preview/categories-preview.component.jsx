import { Fragment } from 'react';
import CategoryPreview from '../../component/category-preview/category-preview.component';
//for reducx

import { useSelector } from 'react-redux/es/hooks/useSelector';
import { selectCategoriesMap } from '../../component/store/categories/categories.selector';
const CategoriesPreview = () => {
	const categoriesMap = useSelector(selectCategoriesMap);
	return (
		<Fragment>
			{Object.keys(categoriesMap).map((title) => {
				const products = categoriesMap[title];
				return (
					<CategoryPreview key={title} title={title} products={products} />
				);
			})}
		</Fragment>
	);
};

export default CategoriesPreview;
