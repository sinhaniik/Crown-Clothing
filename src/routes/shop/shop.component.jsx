import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../../component/category/category.component';
import './shop.styles.scss';

// reduxify
import { fetchCategoryStart } from '../../component/store/categories/categories.action';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCategoryStart());
	}, []);

	return (
		<Routes>
			<Route index={true} element={<CategoriesPreview />}></Route>
			<Route path=':category' element={<Category />}></Route>
		</Routes>
	);
};

export default Shop;
