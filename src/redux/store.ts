
import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api/baseApi";
import tokenReducer from './slices/tokenSlices';
import userReducer from './slices/userSliece';

const store = configureStore ({
    reducer: {
        [api.reducerPath]: api.reducer,
        token: tokenReducer,
        user: userReducer,
    },
    middleware: GetDefaultMiddleware => 
        GetDefaultMiddleware().concat(api.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;