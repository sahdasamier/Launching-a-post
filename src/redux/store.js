import { configureStore } from '@reduxjs/toolkit';
import topostReducer from './TodoSlice';
import userReducer from './UserSlice';

export default configureStore({
	reducer: {
		toposts: topostReducer,
		users: userReducer,
	},
});
