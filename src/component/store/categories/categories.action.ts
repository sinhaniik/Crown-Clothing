import { CATEGORIES_ACTION_TYPES, Category } from './categories.types';
import {
	createAction,
	Action,
	ActionWithPayload,
	withMatcher
} from '../../../utils/firebase/reducer/reducer.utils';

// FIRST WE HAVE TO MAKE RETURN-TYPE OF THESE ACTION TRIGGERS
// ACTION TYPES
export type FetchCategoryStart =
	Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>;

export type FetchCategorySuccess = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
	Category[]
>;

export type fetchCategoryFailed = ActionWithPayload<
	CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
	Error
>;

// MAKING UNION
export type CategoryAction =
	| FetchCategoryStart
	| FetchCategorySuccess
	| fetchCategoryFailed;

// ACTION CREATER
export const fetchCategoryStart = withMatcher(
	(): FetchCategoryStart =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)
);

export const fetchCategorySuccess = withMatcher(
	(categoriesArray: Category[]): FetchCategorySuccess =>
		createAction(
			CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
			categoriesArray
		)
);

export const fetchCategoryFailed = withMatcher(
	(error: Error): fetchCategoryFailed =>
		createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)
);
