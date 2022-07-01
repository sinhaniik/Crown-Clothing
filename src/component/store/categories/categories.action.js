import { CATEGORIES_ACTION_TYPES } from './categories.types';
import { createAction } from '../../../utils/firebase/reducer/reducer.utils';

export const setCategoriesMap = (categories) => {
	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categories);
};
