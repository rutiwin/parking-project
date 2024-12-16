import { configureStore } from '@reduxjs/toolkit';
import parkingReducer from './slices/parkingSlice';

export const store = configureStore({
    reducer: {
        parkingSlice: parkingReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;