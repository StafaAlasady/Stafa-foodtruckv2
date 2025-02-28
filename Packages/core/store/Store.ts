import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../reducers/CartSlice';
import { foodtruckApi } from '../API/ProjectApi';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    [foodtruckApi.reducerPath]: foodtruckApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodtruckApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
