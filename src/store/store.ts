import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../api/createApi";
import basketReducer from './slices/basket.slice'
import modalReducer from '../store/slices/modal.slice'
import userReducer from '../store/slices/user.slice'

export const store = configureStore({
  reducer: {
    basketReducer,
    modalReducer,
    userReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch