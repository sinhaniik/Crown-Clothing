import { createSelector } from 'reselect';
import { CategoriesState } from './categories.reducer';
import { CategoryMap } from './categories.types';
import { StoreType } from '../store';

const selectCategoryReducer = (state: StoreType): CategoriesState =>
	state.categories;

export const selectCategories = createSelector(
	//initial state
	[selectCategoryReducer],
	//changed state
	(categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories): CategoryMap =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			// console.log(docSnapshot.data());
			acc[title.toLowerCase()] = items;
			return acc;
		}, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
	[selectCategoryReducer],
	(categoriesSlice) => categoriesSlice.isLoading
);
