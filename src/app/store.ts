import { configureStore } from '@reduxjs/toolkit';
import todoSlice from '../features/todo/todoSlice';

export const store = configureStore({
  reducer: todoSlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
