import { Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../../component/category/category.component';
import './shop.styles.scss';

import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
// for redux
import { CATEGORIES_ACTION_TYPES } from '../../component/store/categories/categories.types';
import { setCategories } from '../../component/store/categories/categories.action';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';

const Shop = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const getCategoriesMap = async () => {
			const categoriesArray = await getCategoriesAndDocuments();
			// console.log(categoriesArray);
			dispatch({
				type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
				payload: categoriesArray
			});
		};

		getCategoriesMap();
	}, []);

	return (
		<Routes>
			<Route index={true} element={<CategoriesPreview />}></Route>
			<Route path=':category' element={<Category />}></Route>
		</Routes>
	);
};

export default Shop;
