import { Routes, Route } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../../component/category/category.component';
import './shop.styles.scss';

const Shop = () => {
	return (
		<Routes>
			<Route index={true} element={<CategoriesPreview />}></Route>
			<Route path=':category' element={<Category />}></Route>
		</Routes>
	);
};

export default Shop;
