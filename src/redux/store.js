import { configureStore } from '@reduxjs/toolkit';
import topostReducer from './TodoSlice';

export default configureStore({
	reducer: {
		toposts: topostReducer,
	},
});
