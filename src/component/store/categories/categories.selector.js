import { createSelector } from 'reselect';

const selectCategoryReducer = (state) => state.categories;

export const selectCategories = createSelector(
	//initial state
	[selectCategoryReducer],
	//changed state
	(categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
	[selectCategories],
	(categories) =>
		categories.reduce((acc, category) => {
			const { title, items } = category;
			// console.log(docSnapshot.data());
			acc[title.toLowerCase()] = items;
			return acc;
		}, {})
);
