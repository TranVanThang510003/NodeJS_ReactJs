
import { configureStore } from "@reduxjs/toolkit";
import favoriteReducer from "../features/favoriteSlice.js";
import authReducer from "../features/authSlice";
import movieReducer from "../features/movieSlice.js";
export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
    auth: authReducer,
    movie: movieReducer,

  },
  devTools: process.env.NODE_ENV !== "production",
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
