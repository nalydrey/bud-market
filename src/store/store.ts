import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "../api/createApi";
import modalReducer from '../store/slices/modal.slice'

export const store = configureStore({
  reducer: {
    modalReducer,
    [mainApi.reducerPath]: mainApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch