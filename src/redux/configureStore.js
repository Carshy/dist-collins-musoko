import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/usersSlice';


const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer
  },
});

export default store;