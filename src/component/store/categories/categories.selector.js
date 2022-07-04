export const selectCategoriesMap = (state) =>
	state.categories.categories.reduce((acc, category) => {
		const { title, items } = category;
		// console.log(docSnapshot.data());
		acc[title.toLowerCase()] = items;
		return acc;
	}, {});
